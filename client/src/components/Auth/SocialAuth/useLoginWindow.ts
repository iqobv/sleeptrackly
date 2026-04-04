'use client';

import { useRouter } from 'next/navigation';

export const useLoginWindow = (url: string) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	const router = useRouter();

	const handleOpen = () => {
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
			if (event.origin !== apiUrl && event.origin !== window.location.origin) {
				return;
			}
			if (event.data?.success) {
				router.refresh();
				window.removeEventListener('message', messageListener);
			}
		};

		window.addEventListener('message', messageListener);
		loginWindow?.focus();
	};

	return { handleOpen };
};
