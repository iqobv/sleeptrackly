import { PAGES } from '@/config';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const cookiesString = cookieStore.toString();
	const loginUrl = new URL(PAGES.LOGIN, request.url).toString();

	revalidatePath('/', 'layout');

	try {
		await fetch(`${process.env.API_URL}/v1/auth/logout`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Cookie: cookiesString },
			cache: 'no-store',
		});
	} catch (e) {
		console.error('Backend logout error', e);
	}

	const response = NextResponse.redirect(loginUrl, { status: 303 });

	response.cookies.set('session', '', {
		domain: '.sleeptrackly.com',
		path: '/',
		maxAge: 0,
		secure: true,
		sameSite: 'none',
	});

	response.headers.set('Clear-Site-Data', '"cache", "cookies", "storage"');

	response.headers.set(
		'Cache-Control',
		'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
	);

	return response;
}
