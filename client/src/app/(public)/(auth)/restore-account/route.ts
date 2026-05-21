import { restoreAccountServer } from '@/api';
import { AUTH_PAGES } from '@/config';
import { redirect, RedirectType } from 'next/navigation';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get('token');

	if (!token) {
		redirect(
			`${AUTH_PAGES.LOGIN}?error=${encodeURIComponent('Invalid or missing token.')}`,
			RedirectType.replace,
		);
	}

	let isSuccess = false;
	let errorMessage = '';

	try {
		await restoreAccountServer(token);
		isSuccess = true;
	} catch (error) {
		isSuccess = false;
		errorMessage = error instanceof Error ? error.message : 'Unknown Error';
	}

	if (isSuccess) {
		redirect(
			`${AUTH_PAGES.LOGIN}?success=${encodeURIComponent('Account restored successfully. Please log in.')}`,
			RedirectType.replace,
		);
	} else {
		redirect(
			`${AUTH_PAGES.LOGIN}?error=${encodeURIComponent(`${errorMessage}`)}`,
			RedirectType.replace,
		);
	}
}
