'use client';

import { validateVerificationToken } from '@/api/auth/token.api';
import { AUTH_PAGES } from '@/config/authPages.config';
import { PAGES } from '@/config/pages.config';
import { useAuth } from '@/hooks/useAuth.hook';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { EmailConfirmationDefault } from '../EmailConfirmationDefault/EmailConfirmationDefault';
import { EmailConfirmationProccesing } from './EmailConfirmationStates/EmailConfirmationProccesing';
import { EmailConfirmationSuccess } from './EmailConfirmationStates/EmailConfirmationSuccess';

export const EmailConfirmation = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const router = useRouter();
	const { user } = useAuth();

	const { mutate, isSuccess, isPending } = useMutation({
		mutationFn: ({ token }: { token: string }) =>
			validateVerificationToken(token),
		onSuccess: () => {
			router.refresh();
			toast.success('Email confirmed');
		},
		onError: (error) => {
			router.refresh();
			if (user && user.emailVerified) {
				toast.info('Email already confirmed');
			} else {
				toast.error(error.message);
				router.push(AUTH_PAGES.EMAIL_CONFIRMATION);
			}
		},
	});

	useEffect(() => {
		if (token && !user?.emailVerified) mutate({ token });
	}, [token, user, mutate]);

	useEffect(() => {
		if (user && user.emailVerified) {
			router.push(PAGES.HOME);
		}
	}, [user, router]);

	if (!user && !token) return <EmailConfirmationDefault />;

	return (
		<div>
			{isPending && <EmailConfirmationProccesing />}
			{isSuccess && <EmailConfirmationSuccess />}
		</div>
	);
};
