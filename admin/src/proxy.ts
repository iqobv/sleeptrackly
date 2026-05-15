import { NextRequest, NextResponse } from 'next/server';
import { USER_ROLES } from './constants';
import { User } from './types';

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get('accessToken')?.value;
	const refreshToken = request.cookies.get('refreshToken')?.value;

	let isAuthenticated = !!accessToken;
	let refreshedCookies: string[] = [];

	if (!accessToken && refreshToken) {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
				{
					method: 'POST',
					headers: {
						Cookie: `refreshToken=${refreshToken}`,
						'Content-Type': 'application/json',
					},
				},
			);

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

	let haveAccess = false;

	if (isAuthenticated) {
		try {
			const allCookies = request.cookies
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join('; ');

			const res = await fetch(`${process.env.API_URL}/v1/auth/me`, {
				headers: {
					'Content-Type': 'application/json',
					Cookie: allCookies,
				},
			});

			if (res.ok) {
				const data = (await res.json()) as User;
				if (data?.id && data.role.includes(USER_ROLES.ADMIN)) {
					haveAccess = true;
				}
			} else {
				isAuthenticated = false;
			}
		} catch {
			isAuthenticated = false;
		}
	}

	let response: NextResponse;

	if (!isAuthenticated || !haveAccess) {
		const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
		response = NextResponse.redirect(new URL(siteUrl));

		if (!isAuthenticated) {
			response.cookies.delete('accessToken');
			response.cookies.delete('refreshToken');
		}
	} else {
		response = NextResponse.next();
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
