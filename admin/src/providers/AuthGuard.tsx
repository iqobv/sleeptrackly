'use client';

import { getUser } from '@/api/auth/auth.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { env } from '@/env';
import { PageLoader } from '@shared/ui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';

export const AuthGuard = ({ children }: PropsWithChildren<unknown>) => {
	const queryClient = useQueryClient();

	const { data, isError, isLoading } = useQuery({
		queryKey: QUERY_KEYS.user.me(),
		queryFn: getUser,
		retry: false,
		staleTime: 1000 * 60 * 5,
	});

	useEffect(() => {
		const triggerLogoutRedirect = () => {
			queryClient.clear();

			const siteUrl = new URL(env.NEXT_PUBLIC_SITE_URL, window.location.origin);

			window.location.href = siteUrl.toString();
		};

		if (isError) triggerLogoutRedirect();

		window.addEventListener('auth:unauthorized', triggerLogoutRedirect);

		return () => {
			window.removeEventListener('auth:unauthorized', triggerLogoutRedirect);
		};
	}, [isError, queryClient]);

	if (isLoading) return <PageLoader />;

	if (data && !isError) return <>{children}</>;

	return null;
};
