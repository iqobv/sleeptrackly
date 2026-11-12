'use client';

import { resendVerificationEmail } from '@/api/auth/email.api';
import { AUTH_PAGES } from '@/config/authPages.config';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys.constants';
import { getEmailProvider } from '@/utils/getEmailProvider.util';
import { Button, SectionHeader, Typography } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { EmailConfirmationWrapper } from '../EmailConfirmationWrapper/EmailConfirmationWrapper';
import styles from './EmailConfirmationDefault.module.scss';

const localStorageEmailKey = LOCAL_STORAGE_KEYS.auth.registrationEmail;

export const EmailConfirmationDefault = () => {
	const [timer, setTimer] = useState(0);

	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		setEmail(localStorage.getItem(localStorageEmailKey));
	}, []);

	const { mutate } = useMutation({
		mutationFn: (emailToVerify: string) =>
			resendVerificationEmail(emailToVerify),
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

	const emailProvider = getEmailProvider(email || '');

	return (
		<EmailConfirmationWrapper>
			<div className={styles.default}>
				<SectionHeader
					title="Your Email is not Verified!"
					descriptionProps={{
						as: 'div',
					}}
					description={
						<div className={styles.description}>
							<Typography>
								Your email is not verified. Please check your inbox for a
								verification email. If you did not receive the email, you can
								resend the verification email or change your email address.
							</Typography>
							{emailProvider && (
								<Button asChild variant="outlined">
									<Link
										href={emailProvider.inboxUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										<emailProvider.Icon />
										{`Open ${emailProvider.name}`}
									</Link>
								</Button>
							)}
						</div>
					}
					textAlign="center"
				/>
				<Button onClick={handleResendEmail} disabled={timer > 0 || !email}>
					{timer > 0
						? `Resend Verification Email (${timer})`
						: 'Resend Verification Email'}
				</Button>
				<Button onClick={handleChangeEmail} asChild>
					<Link href={AUTH_PAGES.REGISTER}>Change Email</Link>
				</Button>
			</div>
		</EmailConfirmationWrapper>
	);
};
