import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PAGES } from './config';
import { USER_ROLES } from './constants';
import { IUser } from './types';

export async function middleware(request: NextRequest) {
	const cookiesStore = await cookies();
	const hasSession = cookiesStore.has('session');
	const allCookies = cookiesStore.toString();

	let isAuthenticated = false;
	let user: IUser | null = null;
	let haveAccess: boolean = false;

	if (hasSession) {
		try {
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
				haveAccess = user.role.includes(USER_ROLES.ADMIN);
			} else {
				cookiesStore.delete('session');
				isAuthenticated = false;
				haveAccess = false;
			}
		} catch (error) {
			console.error(error);
		}
	}

	if (!isAuthenticated || !haveAccess) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
	}

	if (
		isAuthenticated &&
		haveAccess &&
		request.nextUrl.pathname.startsWith(PAGES.LOGIN)
	) {
		return NextResponse.redirect(new URL(PAGES.HOME, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
