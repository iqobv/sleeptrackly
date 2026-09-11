import { UserRole } from '@shared/types';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { env } from './env';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
	const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

	const mainSiteUrl = new URL(env.NEXT_PUBLIC_SITE_URL);

	if (!accessToken && !refreshToken) return NextResponse.redirect(mainSiteUrl);

	const secret = new TextEncoder().encode(env.JWT_SECRET);

	if (accessToken) {
		const payload = await jwtVerify(accessToken, secret)
			.then((res) => res.payload)
			.catch(() => null);

		if (payload) {
			if (payload.role === UserRole.ADMIN) return NextResponse.next();

			return NextResponse.redirect(mainSiteUrl);
		}
	}

	if (refreshToken) {
		try {
			const refreshResponse = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
				{
					method: 'POST',
					headers: {
						Cookie: `${REFRESH_TOKEN_KEY}=${refreshToken}`,
					},
				},
			);

			if (!refreshResponse.ok) return NextResponse.redirect(mainSiteUrl);

			const responseCookies = refreshResponse.headers.getSetCookie();

			let newAccessToken: string | null = null;

			for (const cookieStr of responseCookies) {
				const match = cookieStr.match(
					new RegExp(`(?:^|;\\s*)${ACCESS_TOKEN_KEY}=([^;]*)`),
				);
				if (match) {
					newAccessToken = decodeURIComponent(match[1]);
					break;
				}
			}

			if (!newAccessToken) return NextResponse.redirect(mainSiteUrl);

			const { payload: newPayload } = await jwtVerify(newAccessToken, secret);

			if (newPayload.role === UserRole.ADMIN) {
				const response = NextResponse.next();
				const setCookieHeaders = refreshResponse.headers.getSetCookie();

				setCookieHeaders.forEach((cookie) => {
					response.headers.append('Set-Cookie', cookie);
				});

				return response;
			} else {
				return NextResponse.redirect(mainSiteUrl);
			}
		} catch {
			return NextResponse.redirect(mainSiteUrl);
		}
	}

	return NextResponse.redirect(mainSiteUrl);
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
