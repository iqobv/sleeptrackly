import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PAGES } from './config';

export async function middleware(request: NextRequest) {
	const cookiesStore = await cookies();
	const hasSession = cookiesStore.has('session');
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

		response.cookies.set('previousPage', path + request.nextUrl.search, {
			httpOnly: true,
			path: '/',
			maxAge: 300,
			sameSite: 'lax',
		});

		return response;
	}

	if (hasSession && isAuthRoute) {
		const redirectTo = request.cookies.get('previousPage')?.value || PAGES.HOME;
		const response = NextResponse.redirect(new URL(redirectTo, request.url));
		response.cookies.delete('previousPage');
		return response;
	}

	const isIgnoredPath =
		path.startsWith('/api') ||
		path.startsWith('/_next') ||
		path.startsWith('/favicon.ico') ||
		path.includes('.') ||
		isAuthRoute;

	if (!isIgnoredPath) {
		const response = NextResponse.next({
			request: { headers: requestHeaders },
		});

		response.cookies.set('previousPage', path + request.nextUrl.search, {
			httpOnly: true,
			path: '/',
			maxAge: 300,
			sameSite: 'lax',
		});

		return response;
	}

	return NextResponse.next({
		request: { headers: requestHeaders },
	});
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
