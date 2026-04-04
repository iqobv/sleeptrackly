import { PAGES } from '@/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const hasSession = cookieStore.has('session');
	const cookiesString = cookieStore.toString();

	const response = NextResponse.redirect(new URL(PAGES.LOGIN, request.url));

	if (hasSession) {
		try {
			const backendRes = await fetch(`${process.env.API_URL}/v1/auth/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookiesString,
				},
				cache: 'no-store',
			});

			const setCookieHeader = backendRes.headers.get('set-cookie');

			if (setCookieHeader) {
				response.headers.append('Set-Cookie', setCookieHeader);
			}
		} catch (error) {
			console.error('Error occurred while logging out', error);
		}
	}

	response.headers.set('Refresh', `0; url=${PAGES.LOGIN}`);

	response.cookies.set('session', '', {
		domain: '.sleeptrackly.com',
		path: '/',
		maxAge: 0,
	});

	return response;
}
