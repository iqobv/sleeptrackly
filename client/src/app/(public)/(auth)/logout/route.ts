import { PAGES } from '@/config';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const cookiesString = cookieStore.toString();
	const loginUrl = new URL(PAGES.LOGIN, request.url).toString();

	revalidatePath('/', 'layout');

	try {
		await fetch(`${process.env.API_URL}/v1/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookiesString,
			},
			cache: 'no-store',
		});
	} catch (error) {
		console.error(error);
	}

	const response = new NextResponse(null, {
		status: 303,
		headers: {
			Location: loginUrl,
			'Set-Cookie':
				'session=; Domain=.sleeptrackly.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None',
			'Cache-Control':
				'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
		},
	});

	return response;
}
