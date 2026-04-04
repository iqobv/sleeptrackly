import { PAGES } from '@/config';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const hasSession = cookieStore.has('session');
	const cookiesString = cookieStore.toString();

	revalidatePath('/', 'layout');

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

			const response = NextResponse.redirect(new URL(PAGES.LOGIN, request.url));

			const setCookieHeader = backendRes.headers.get('set-cookie');

			if (setCookieHeader) {
				response.headers.set('Set-Cookie', setCookieHeader);
			}

			response.cookies.set('session', '', {
				domain: '.sleeptrackly.com',
				path: '/',
				maxAge: 0,
			});

			return response;
		} catch (error) {
			console.error('Error occurred while logging out', error);

			const response = NextResponse.redirect(new URL(PAGES.LOGIN, request.url));

			response.cookies.set('session', '', {
				domain: '.sleeptrackly.com',
				path: '/',
				maxAge: 0,
			});

			return response;
		}
	}
}
