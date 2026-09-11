'use client';

import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { env } from '@/env';
import { useRouter } from 'next/navigation';

export const useLoginWindow = (url: string) => {
	const apiUrl = env.NEXT_PUBLIC_API_URL;
	const apiOrigin = apiUrl ? new URL(apiUrl).origin : null;

	const router = useRouter();

	const handleOpen = () => {
		if (!apiUrl || !apiOrigin) return;

		const width = 600;
		const height = 800;

		const left = (screen.width - width) / 2;
		const top = (screen.height - height) / 2 - 50;

		const loginWindow = window.open(
			`${apiUrl}${url}`,
			'_blank',
			`width=${width},height=${height},top=${top},left=${left}`,
		);

		const messageListener = (event: MessageEvent) => {
			if (
				event.origin !== apiOrigin &&
				event.origin !== window.location.origin
			) {
				return;
			}

			if (event.data?.success) {
				window.removeEventListener('message', messageListener);

				const searchParams = new URLSearchParams(window.location.search);
				const redirectUrl =
					searchParams.get('redirect') || CROSS_DOMAIN_ROUTES.APP_DASHBOARD;

				setTimeout(() => {
					window.location.href = redirectUrl;
				}, 150);
			}
		};

		window.addEventListener('message', messageListener);
		loginWindow?.focus();
	};

	return { handleOpen };
};
