import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PAGES } from './config/authPages.config';
import { PRIVATE_PAGES } from './config/privatePages.config';
import { SUBDOMAINS } from './config/subdomains.config';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export async function proxy(request: NextRequest) {
	const url = request.nextUrl.clone();
	const hostname = request.headers.get('host') || '';
	const path = url.pathname;
	const requestHeaders = new Headers(request.headers);

	const isAppSubdomain = hostname.startsWith(`${SUBDOMAINS.APP}.`);

	if (path.startsWith(`/${SUBDOMAINS.APP}`)) {
		if (!isAppSubdomain) {
			url.pathname = '/404';
			return NextResponse.rewrite(url);
		}

		return NextResponse.next();
	}

	if (!isAppSubdomain) return NextResponse.next();

	const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
	const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

	const isAuthenticated = !!accessToken || !!refreshToken;

	let response: NextResponse;

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

	if (path === '/') {
		url.pathname = isAuthenticated ? PRIVATE_PAGES.DASHBOARD : AUTH_PAGES.LOGIN;
		response = NextResponse.redirect(url);
	} else if (!isAuthenticated && isProtectedRoute) {
		const loginUrl = new URL(AUTH_PAGES.LOGIN, request.url);
		loginUrl.searchParams.set('redirect', path + request.nextUrl.search);
		response = NextResponse.redirect(loginUrl);
	} else if (isAuthenticated && isAuthRoute) {
		const redirectUrl =
			request.nextUrl.searchParams.get('redirect') || PRIVATE_PAGES.DASHBOARD;
		response = NextResponse.redirect(new URL(redirectUrl, request.url));
	} else {
		const rewriteUrl = request.nextUrl.clone();
		rewriteUrl.pathname = `/${SUBDOMAINS.APP}${path}`;
		response = NextResponse.rewrite(rewriteUrl, {
			request: { headers: requestHeaders },
		});
	}

	response.headers.set('x-middleware-cache', 'no-cache');
	response.headers.set('Cache-Control', 'no-store, max-age=0');

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
