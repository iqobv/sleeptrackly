import { PAGES } from '@/config';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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
		console.error('Backend logout failed', error);
	}

	return new NextResponse(
		`<!DOCTYPE html>
    <html>
      <head>
        <title>Redirecting...</title>
        <meta http-equiv="refresh" content="0;url=${loginUrl}">
        <style>
          body { background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        </style>
      </head>
      <body>
        <script>
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "${loginUrl}";
        </script>
      </body>
    </html>`,
		{
			status: 200,
			headers: {
				'Content-Type': 'text/html',
				'Set-Cookie':
					'session=; Domain=.sleeptrackly.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None',
				'Cache-Control':
					'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
			},
		},
	);
}
