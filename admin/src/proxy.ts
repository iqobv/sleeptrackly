import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { USER_ROLES } from './constants';
import { IUser } from './types';

export async function proxy() {
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
		const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
		return NextResponse.redirect(new URL(siteUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
