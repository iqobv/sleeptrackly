'use client';

import { sendRestoreEmail } from '@/api';
import { Button } from '@/components/UI';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface AuthFormRestoreProps {
	email: string;
}

const AuthFormRestore = ({ email }: AuthFormRestoreProps) => {
	const [isClicked, setIsClicked] = useState(false);

	const { mutate, isPending } = useMutation({
		mutationFn: () => sendRestoreEmail(email),
		onSuccess: (data) => {
			toast.info(data.message);
		},
		onError: (e) => {
			toast.error(
				e.message ||
					'An error occurred while sending the restore email. Please try again later.',
			);
		},
	});

	const handleClick = () => {
		if (!isClicked && !isPending) {
			mutate();
			setIsClicked(true);
		}
	};

	return (
		<Button
			fullWidth
			variant="outlined"
			disabled={isPending || isClicked}
			onClick={handleClick}
			loading={isPending}
		>
			Restore Account
		</Button>
	);
};

export default AuthFormRestore;
