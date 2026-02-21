'use client';

import { resendVerificationEmail } from '@/api';
import { Button, SectionHeader } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import EmailConfirmationWrapper from '../EmailConfirmationWrapper/EmailConfirmationWrapper';
import styles from './EmailConfirmationDefault.module.scss';

const EmailConfirmationDefault = () => {
	const [timer, setTimer] = useState(0);
	const [email, setEmail] = useState<string | null>(null);

	const localStorageEmailKey = LOCAL_STORAGE_KEYS.auth.registrationEmail;

	useEffect(() => {
		const storedEmail = localStorage.getItem(localStorageEmailKey);
		setEmail(storedEmail);
	}, [localStorageEmailKey]);

	const { mutate } = useMutation({
		mutationFn: (emailToVerify: string) =>
			resendVerificationEmail(emailToVerify),
		mutationKey: QUERY_KEYS.auth.resendVerificationEmail(email ?? ''),
		onSuccess: () => {
			toast.info('Verification email resent successfully!');
		},
	});

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (timer > 0) {
			interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
		}

		return () => clearInterval(interval);
	}, [timer]);

	const handleChangeEmail = () => {
		localStorage.removeItem(localStorageEmailKey);
	};

	const handleResendEmail = () => {
		if (email) {
			mutate(email);
			setTimer(30);
		}
	};

	return (
		<EmailConfirmationWrapper>
			<div className={styles['email-confirmation-default']}>
				<SectionHeader
					title="Your Email is not Verified!"
					description="Your email is not verified. Please check your inbox for a verification email. If you did not receive the email, you can resend the verification email or change your email address."
				/>
				<Button
					href="https://mail.google.com"
					target="_blank"
					variant="outlined"
				>
					Gmail <FaExternalLinkAlt size={15} />
				</Button>
				<Button onClick={handleResendEmail} disabled={timer > 0 || !email}>
					{timer > 0
						? `Resend Verification Email (${timer})`
						: 'Resend Verification Email'}
				</Button>
				<Button onClick={handleChangeEmail} href={PAGES.REGISTER}>
					Change Email
				</Button>
			</div>
		</EmailConfirmationWrapper>
	);
};

export default EmailConfirmationDefault;
