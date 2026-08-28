'use client';

import { getUser } from '@/api/auth/auth.api';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { PageLoader } from '@shared/ui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export const AuthGuard = ({ children }: PropsWithChildren<unknown>) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const queryClient = useQueryClient();

	const { data, isError, isLoading } = useQuery({
		queryKey: QUERY_KEYS.user.me(),
		queryFn: getUser,
		retry: false,
		staleTime: 1000 * 60 * 5,
	});

	useEffect(() => {}, []);

	useEffect(() => {
		const triggerLogoutRedirect = () => {
			queryClient.clear();

			const currentSearchParams = searchParams.toString();
			const redirectUrl = currentSearchParams
				? `${pathname}?${currentSearchParams}`
				: pathname;

			const loginUrl = new URL(
				CROSS_DOMAIN_ROUTES.APP_LOGIN,
				window.location.origin,
			);
			loginUrl.searchParams.set('redirect', redirectUrl);

			window.location.href = loginUrl.toString();
		};

		if (isError) triggerLogoutRedirect();

		window.addEventListener('auth:unauthorized', triggerLogoutRedirect);

		return () => {
			window.removeEventListener('auth:unauthorized', triggerLogoutRedirect);
		};
	}, [isError, pathname, queryClient, searchParams]);

	if (isLoading) return <PageLoader />;

	if (data && !isError) return <>{children}</>;

	return null;
};
