import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PAGES } from './config';
import { IUser } from './types';

export async function middleware(request: NextRequest) {
	const cookiesStore = await cookies();
	const hasSession = cookiesStore.has('session');
	const allCookies = cookiesStore.toString();

	const ip =
		request.headers.get('x-forwarded-for') ??
		request.headers.get('x-real-ip') ??
		'unknown';
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-forwarded-for', ip);

	let isAuthenticated = false;
	let user: IUser | null = null;

	if (hasSession) {
		const res = await fetch(`${process.env.API_URL}/v1/auth/me`, {
			headers: {
				'Content-Type': 'application/json',
				cookie: allCookies,
			},
		});
		const data = (await res.json()) as IUser;

		if (res.ok && data?.id) {
			user = data;
			isAuthenticated = true;
		} else {
			cookiesStore.delete('session');
			isAuthenticated = false;
		}
	}

	const path = request.nextUrl.pathname;

	if (
		!isAuthenticated &&
		(path.startsWith(PAGES.DASHBOARD) ||
			path.startsWith(PAGES.TIMER) ||
			path.startsWith(PAGES.CHALLENGES) ||
			path.startsWith(PAGES.SETTINGS) ||
			path.startsWith(PAGES.FRIENDS) ||
			path.startsWith(PAGES.FRIENDS_REQUESTS))
	) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
	}

	const redirectBack = () => {
		const redirectTo = request.cookies.get('previousPage')?.value || PAGES.HOME;
		const response = NextResponse.redirect(new URL(redirectTo, request.url));
		response.cookies.delete('previousPage');
		return response;
	};

	if (
		isAuthenticated &&
		(path.startsWith(PAGES.LOGIN) ||
			path.startsWith(PAGES.REGISTER) ||
			path.startsWith(PAGES.RESET_PASSWORD))
	) {
		return redirectBack();
	}

	if (
		isAuthenticated &&
		user?.emailVerified &&
		path.startsWith(PAGES.EMAIL_CONFIRMATION)
	) {
		return redirectBack();
	}

	if (
		!path.startsWith(PAGES.LOGIN) &&
		!path.startsWith(PAGES.REGISTER) &&
		!path.startsWith(PAGES.EMAIL_CONFIRMATION) &&
		!path.startsWith(PAGES.RESET_PASSWORD) &&
		!path.startsWith('/api') &&
		!path.startsWith('/_next') &&
		!path.startsWith('/favicon.ico') &&
		!path.startsWith('/.well-known')
	) {
		const fullUrl = path + request.nextUrl.search;
		const response = NextResponse.next();
		response.cookies.set('previousPage', fullUrl, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 5,
		});
		return response;
	}

	return NextResponse.next({
		request: { headers: requestHeaders },
	});
}

export const config = {
	matcher: ['/((?!_next/|favicon.ico|.well-known/).*)'],
};
