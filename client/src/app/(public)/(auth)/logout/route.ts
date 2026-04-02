import { PAGES } from '@/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const hasSession = cookieStore.has('session');
	const cookiesString = cookieStore.toString();

	if (hasSession) {
		try {
			await fetch(`${process.env.API_URL}/v1/auth/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookiesString,
				},
			});
		} catch (error) {
			console.error('Error occurred while logging out', error);
		}
	}

	cookieStore.delete('session');

	return NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
}
