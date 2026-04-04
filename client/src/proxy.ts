import { NextRequest, NextResponse } from 'next/server';
import { PAGES } from './config';

export async function proxy(request: NextRequest) {
	const session = request.cookies.get('session');
	const hasSession = !!session;
	const path = request.nextUrl.pathname;

	const ip =
		request.headers.get('x-forwarded-for') ??
		request.headers.get('x-real-ip') ??
		'unknown';
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-forwarded-for', ip);

	const protectedRoutes = [
		PAGES.DASHBOARD,
		PAGES.TIMER,
		PAGES.CHALLENGES,
		PAGES.SETTINGS,
		PAGES.FRIENDS,
		PAGES.FRIENDS_REQUESTS,
		PAGES.SHOP,
		PAGES.SHOP_CATALOG,
		PAGES.SETTINGS_SESSIONS,
		PAGES.INVENTORY,
		PAGES.CHALLENGE(''),
		PAGES.EDIT_CHALLENGE(''),
		PAGES.PROMO,
	];

	const authRoutes = [
		PAGES.LOGIN,
		PAGES.REGISTER,
		PAGES.RESET_PASSWORD,
		PAGES.EMAIL_CONFIRMATION,
	];

	const isProtectedRoute = protectedRoutes.some((route) =>
		path.startsWith(route),
	);
	const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

	if (!hasSession && isProtectedRoute) {
		const loginUrl = new URL(PAGES.LOGIN, request.url);
		const response = NextResponse.redirect(loginUrl);

		response.headers.set('x-middleware-cache', 'no-cache');
		response.headers.set('Vary', 'Cookie');

		response.cookies.set('previousPage', path + request.nextUrl.search, {
			httpOnly: true,
			path: '/',
			maxAge: 300,
			sameSite: 'lax',
		});

		return response;
	}

	if (hasSession && isAuthRoute) {
		const previousPage = request.cookies.get('previousPage')?.value;
		const redirectTo =
			previousPage &&
			!previousPage.startsWith(PAGES.LOGOUT) &&
			!previousPage.startsWith(PAGES.LOGIN)
				? previousPage
				: PAGES.HOME;

		const response = NextResponse.redirect(new URL(redirectTo, request.url));

		response.headers.set('x-middleware-cache', 'no-cache');
		response.headers.set('Vary', 'Cookie');

		response.cookies.delete('previousPage');
		return response;
	}

	const isIgnoredPath =
		path.startsWith('/api') ||
		path.startsWith('/_next') ||
		path.startsWith('/favicon.ico') ||
		path.includes('.') ||
		isAuthRoute ||
		path.startsWith(PAGES.LOGOUT);

	if (!isIgnoredPath) {
		const response = NextResponse.next({
			request: { headers: requestHeaders },
		});

		response.headers.set('Vary', 'Cookie');

		response.cookies.set('previousPage', path + request.nextUrl.search, {
			httpOnly: true,
			path: '/',
			maxAge: 300,
			sameSite: 'lax',
		});

		return response;
	}

	const finalResponse = NextResponse.next({
		request: { headers: requestHeaders },
	});

	finalResponse.headers.set('Vary', 'Cookie');

	return finalResponse;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
