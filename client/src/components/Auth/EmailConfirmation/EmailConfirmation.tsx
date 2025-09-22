'use client';

import { validateVerificationToken } from '@/api';
import { PAGES } from '@/config';
import { useAuth } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './EmailConfirmation.module.scss';

const EmailConfirmation = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const router = useRouter();
	const { user } = useAuth();

	const { mutate, isSuccess } = useMutation({
		mutationFn: ({ token }: { token: string }) =>
			validateVerificationToken(token),
		mutationKey: ['validate-verification-token'],
		onSuccess: () => {
			router.push(PAGES.HOME);
			toast.success('Email confirmed');
		},
		onError: (error) => {
			router.push(PAGES.HOME);
			if (user && user.emailVerified) {
				toast.info('Email already confirmed');
			} else {
				toast.error(error.message);
			}
		},
	});

	useEffect(() => {
		if (token) mutate({ token });
	}, [token, mutate]);

	return (
		<div className={styles['email-confirmation']}>
			{isSuccess && 'Email confirmed'}
		</div>
	);
};

export default EmailConfirmation;
