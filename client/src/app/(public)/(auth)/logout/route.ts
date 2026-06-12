import { AUTH_PAGES } from '@/config/authPages.config';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const cookiesString = cookieStore.toString();
	const loginUrl = new URL(AUTH_PAGES.LOGIN, request.url);

	revalidatePath('/', 'layout');

	let backendSetCookies: string[] = [];

	try {
		const apiResponse = await fetch(`${process.env.API_URL}/v1/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookiesString,
			},
			cache: 'no-store',
		});

		backendSetCookies = apiResponse.headers.getSetCookie();
	} catch (error) {
		console.error(error);
	}

	const response = NextResponse.redirect(loginUrl, {
		status: 303,
	});

	response.headers.set(
		'Cache-Control',
		'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
	);

	if (backendSetCookies.length > 0) {
		backendSetCookies.forEach((cookie) => {
			response.headers.append('Set-Cookie', cookie);
		});
	} else {
		response.cookies.set('session', '', {
			domain: '.sleeptrackly.com',
			path: '/',
			maxAge: 0,
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});
	}

	return response;
}
