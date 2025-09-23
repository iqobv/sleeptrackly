/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

export const fetcher = async <T>(
	url: string,
	init?: RequestInit,
	withCredentials = true,
): Promise<T> => {
	const isFormData = init?.body instanceof FormData;

	const res = await fetch(url, {
		...init,
		credentials: withCredentials ? 'include' : 'same-origin',
		headers: {
			...(isFormData ? {} : { 'Content-Type': 'application/json' }),
			...init?.headers,
		},
	});

	let data: any = null;
	const text = await res.text();

	if (text) {
		try {
			data = JSON.parse(text);
		} catch {
			data = text;
		}
	}

	if (!res.ok) {
		throw new Error(data?.message || res.statusText || 'Something went wrong');
	}

	return data as T;
};
