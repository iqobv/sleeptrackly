'use client';

import { validateVerificationToken } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const EmailConfirmation = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const router = useRouter();
	const { user } = useAuth();

	const { mutate, isSuccess } = useMutation({
		mutationFn: ({ token }: { token: string }) =>
			validateVerificationToken(token),
		mutationKey: QUERY_KEYS.auth.validateVerificationToken(
			user?.id || '',
			token,
		),
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

	return <div>{isSuccess && 'Email confirmed'}</div>;
};

export default EmailConfirmation;
