import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PAGES } from './config/authPages.config';
import { PRIVATE_PAGES } from './config/privatePages.config';
import { env } from './env';

export async function proxy(request: NextRequest) {
	const ip =
		request.headers.get('cf-connecting-ip') ??
		request.headers.get('x-forwarded-for') ??
		'';

	const userAgent = request.headers.get('user-agent') ?? '';

	const accessToken = request.cookies.get('accessToken')?.value;
	const refreshToken = request.cookies.get('refreshToken')?.value;

	let isAuthenticated = !!accessToken;
	let refreshedCookies: string[] = [];

	if (!accessToken && refreshToken) {
		try {
			const res = await fetch(`${env.API_URL}/v1/auth/refresh`, {
				method: 'POST',
				headers: {
					Cookie: `refreshToken=${refreshToken}`,
					'X-Forwarded-For': ip,
					'User-Agent': userAgent,
					'Content-Type': 'application/json',
				},
				cache: 'no-store',
			});

			if (res.ok) {
				isAuthenticated = true;
				refreshedCookies = res.headers.getSetCookie();

				refreshedCookies.forEach((cookie) => {
					const [cookiePair] = cookie.split(';');
					const [name, ...rest] = cookiePair.split('=');
					const value = rest.join('=');
					if (name && value) {
						request.cookies.set(name.trim(), value.trim());
					}
				});
			} else {
				isAuthenticated = false;
			}
		} catch {
			isAuthenticated = false;
		}
	}

	const requestHeaders = new Headers(request.headers);
	const cookieHeader = request.cookies
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join('; ');

	requestHeaders.set('cookie', cookieHeader);

	const url = request.nextUrl.clone();
	const path = url.pathname;

	const isPrefetch =
		request.headers.get('next-router-prefetch') === '1' ||
		request.headers.get('purpose') === 'prefetch';

	const protectedRoutes = Object.values(PRIVATE_PAGES).filter(
		(route) => typeof route === 'string',
	);

	const authRoutes = Object.values(AUTH_PAGES).filter(
		(route) => typeof route === 'string',
	);

	const isProtectedRoute = protectedRoutes.some((route) =>
		path.startsWith(route),
	);
	const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

	let response: NextResponse;

	if (!isAuthenticated && isProtectedRoute) {
		url.pathname = AUTH_PAGES.LOGIN;
		response = NextResponse.redirect(url);
		response.headers.set('x-middleware-cache', 'no-cache');

		if (!isPrefetch) {
			response.cookies.set('previousPage', path + request.nextUrl.search, {
				httpOnly: true,
				path: '/',
				maxAge: 300,
				sameSite: 'lax',
			});
		}
	} else if (isAuthenticated && isAuthRoute) {
		const previousPage = request.cookies.get('previousPage')?.value;
		const isPreviousPageAuth = authRoutes.some((route) =>
			previousPage?.startsWith(route),
		);

		const redirectTo =
			previousPage && !isPreviousPageAuth
				? previousPage
				: PRIVATE_PAGES.DASHBOARD;

		response = NextResponse.redirect(new URL(redirectTo, request.url));
		response.headers.set('x-middleware-cache', 'no-cache');
		response.cookies.delete('previousPage');
	} else {
		response = NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});

		response.headers.set('Vary', 'Cookie');

		const isIgnoredPath =
			path.startsWith('/api') ||
			path.startsWith('/_next') ||
			path.startsWith('/favicon.ico') ||
			path.includes('.') ||
			isAuthRoute ||
			path.startsWith(AUTH_PAGES.LOGOUT);

		if (!isIgnoredPath && !isPrefetch) {
			response.cookies.set('previousPage', path + request.nextUrl.search, {
				httpOnly: true,
				path: '/',
				maxAge: 300,
				sameSite: 'lax',
			});
		}
	}

	if (refreshedCookies.length > 0) {
		refreshedCookies.forEach((cookie) => {
			response.headers.append('Set-Cookie', cookie);
		});
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
