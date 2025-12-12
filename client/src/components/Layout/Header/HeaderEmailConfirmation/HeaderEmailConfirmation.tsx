'use client';

import { Button } from '@/components/UI';
import { useAuth, useEmailConfirm } from '@/hooks';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styles from './HeaderEmailConfirmation.module.scss';

const HeaderEmailConfirmation = () => {
	const [show, setShow] = useState(false);

	const { user, isloading } = useAuth();
	const { sendConfirmation } = useEmailConfirm();

	const handleClose = () => setShow(false);

	useEffect(() => {
		if (!isloading && user && !user.emailVerified) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [user, isloading]);

	if (!show) return null;

	return (
		<div className={styles['header-email-confirmation']}>
			<div
				className={`container ${styles['header-email-confirmation__container']}`}
			>
				<p>
					Your email is not confirmed. Please confirm your email to continue.
				</p>
				<div className={styles['header-email-confirmation__buttons']}>
					<Button
						size="sm"
						variant="contained"
						fullWidth
						onClick={() => sendConfirmation}
					>
						Confirm
					</Button>
					<Button
						size="sm"
						variant="text"
						isIcon
						isRounded
						onClick={handleClose}
					>
						<IoMdClose />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default HeaderEmailConfirmation;
