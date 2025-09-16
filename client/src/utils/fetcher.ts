'use client';

export const fetcher = async <T>(
	url: string,
	init?: RequestInit
): Promise<T> => {
	const res = await fetch(url, {
		...init,
		credentials: 'include',
		headers: {
			...init?.headers,
			'Content-Type': 'application/json',
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
