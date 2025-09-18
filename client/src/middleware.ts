import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PAGES } from './config';

export async function middleware(request: NextRequest) {
	const cookiesStore = await cookies();
	const isAuthenticated = cookiesStore.has('session');

	const path = request.nextUrl.pathname;

	if (
		(!isAuthenticated &&
			(path.startsWith(PAGES.DASHBOARD) || path.startsWith(PAGES.TIMER))) ||
		path.startsWith(PAGES.CHALLENGES)
	) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
	}

	if (
		isAuthenticated &&
		(path.startsWith(PAGES.LOGIN) || path.startsWith(PAGES.REGISTER))
	) {
		const redirectTo = request.cookies.get('previousPage')?.value || PAGES.HOME;
		const response = NextResponse.redirect(new URL(redirectTo, request.url));
		response.cookies.delete('previousPage');
		return response;
	}

	if (
		!path.startsWith(PAGES.LOGIN) &&
		!path.startsWith(PAGES.REGISTER) &&
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

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/|favicon.ico|.well-known/).*)'],
};
