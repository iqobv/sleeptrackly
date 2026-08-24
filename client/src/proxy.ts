import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PAGES } from './config/authPages.config';
import { PRIVATE_PAGES } from './config/privatePages.config';
import { SUBDOMAINS } from './config/subdomains.config';

export function proxy(request: NextRequest) {
	const url = request.nextUrl.clone();
	const hostname = request.headers.get('host') || '';
	const path = url.pathname;

	const isAppSubdomain = hostname.startsWith(`${SUBDOMAINS.APP}.`);

	if (path.startsWith(`/${SUBDOMAINS.APP}`)) {
		if (!isAppSubdomain) {
			url.pathname = '/404';
			return NextResponse.rewrite(url);
		}
		return NextResponse.next();
	}

	if (!isAppSubdomain) return NextResponse.next();

	const accessToken = request.cookies.get('accessToken')?.value;
	const refreshToken = request.cookies.get('refreshToken')?.value;
	const isAuthenticated = !!accessToken || !!refreshToken;

	if (path === '/') {
		url.pathname = isAuthenticated ? PRIVATE_PAGES.DASHBOARD : AUTH_PAGES.LOGIN;
		const response = NextResponse.redirect(url);
		response.headers.set('x-middleware-cache', 'no-cache');
		return response;
	}

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

	if (!isAuthenticated && isProtectedRoute) {
		const loginUrl = new URL(AUTH_PAGES.LOGIN, request.url);
		loginUrl.searchParams.set('callbackUrl', path + request.nextUrl.search);

		const response = NextResponse.redirect(loginUrl);
		response.headers.set('x-middleware-cache', 'no-cache');
		return response;
	}

	if (isAuthenticated && isAuthRoute) {
		const callbackUrl =
			request.nextUrl.searchParams.get('callbackUrl') ||
			PRIVATE_PAGES.DASHBOARD;

		const response = NextResponse.redirect(new URL(callbackUrl, request.url));
		response.headers.set('x-middleware-cache', 'no-cache');
		return response;
	}

	const rewriteUrl = request.nextUrl.clone();
	rewriteUrl.pathname = `/${SUBDOMAINS.APP}${path}`;
	return NextResponse.rewrite(rewriteUrl);
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
