import { UserRole } from '@shared/types';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { env } from './env';

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);

interface JwtPayload {
	id: string;
	email: string;
	role: UserRole;
	sessionId: string;
	createdAt: string;
}

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get('accessToken')?.value;
	const refreshToken = request.cookies.get('refreshToken')?.value;

	const isDataRequest =
		request.headers.get('rsc') === '1' ||
		request.headers.get('next-router-prefetch') === '1' ||
		request.headers.get('purpose') === 'prefetch' ||
		request.nextUrl.searchParams.has('_rsc');

	let isAuthenticated = false;
	let haveAccess = false;
	let refreshedCookies: string[] = [];

	if (accessToken) {
		try {
			const { payload } = await jwtVerify(accessToken, JWT_SECRET);
			const data = payload as unknown as JwtPayload;

			isAuthenticated = true;
			if (data.role && data.role.includes(UserRole.ADMIN)) {
				haveAccess = true;
			}
		} catch {
			isAuthenticated = false;
		}
	}

	if (!isAuthenticated && refreshToken) {
		try {
			const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`, {
				method: 'POST',
				headers: {
					Cookie: `refreshToken=${refreshToken}`,
					'Content-Type': 'application/json',
				},
				cache: 'no-store',
			});

			if (res.ok) {
				isAuthenticated = true;
				refreshedCookies = res.headers.getSetCookie();

				const newAccessToken = refreshedCookies
					.find((c) => c.startsWith('accessToken='))
					?.split(';')[0]
					?.split('=')[1];

				if (newAccessToken) {
					const { payload } = await jwtVerify(newAccessToken, JWT_SECRET);
					const data = payload as unknown as JwtPayload;

					if (data.role && data.role.includes(UserRole.ADMIN)) {
						haveAccess = true;
					}
				}

				refreshedCookies.forEach((cookie) => {
					const [cookiePair] = cookie.split(';');
					const [name, ...rest] = cookiePair.split('=');
					const value = rest.join('=');
					if (name && value) {
						request.cookies.set(name.trim(), value.trim());
					}
				});
			}
		} catch {
			isAuthenticated = false;
		}
	}

	if (!isAuthenticated || !haveAccess) {
		if (isDataRequest) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
		const response = NextResponse.redirect(new URL(siteUrl));

		if (!isAuthenticated) {
			response.cookies.delete('accessToken');
			response.cookies.delete('refreshToken');
		}

		return response;
	}

	const response = NextResponse.next();

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
