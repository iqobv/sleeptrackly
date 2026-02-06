'use client';

import { ShopFilterDto } from '@/dto';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export const useSyncUrlWithForm = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const syncUrlWithForm = (values: ShopFilterDto & { sort?: string }) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		const { sort, ...rest } = values;

		timeoutRef.current = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());

			Object.entries(rest).forEach(([key, val]) => {
				if (!val || (Array.isArray(val) && val.length === 0)) {
					params.delete(key);
					return;
				}

				const value = Array.isArray(val) ? val.join(',') : val;
				params.set(key, String(value));
			});

			params.set('page', '1');

			router.replace(`${pathname}?${params.toString()}`, {
				scroll: false,
			});
		}, 150);
	};

	return { syncUrlWithForm };
};
