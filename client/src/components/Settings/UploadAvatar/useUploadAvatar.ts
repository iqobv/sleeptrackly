'use client';

import { uploadUserAvatar } from '@/api/user/userAvatar.api';
import { useAuth } from '@/hooks/useAuth.hook';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const useUploadAvatar = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [avatar, setAvatar] = useState<File | null>(null);

	const router = useRouter();
	const { user } = useAuth();

	const { mutate: upload, isPending } = useMutation({
		mutationFn: (file: File) => uploadUserAvatar(file),
		onSuccess() {
			toast.success('Avatar updated');
			router.refresh();
			setAvatar(null);
			if (inputRef.current) inputRef.current.value = '';
		},
		onError: (error) => toast.error(error.message),
	});

	const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
			toast.error('Invalid file format. Please upload a .jpg, .png or .webp');
			if (inputRef.current) inputRef.current.value = '';
			return;
		}

		setAvatar(file);
	};

	const handleUpdate = () => {
		if (avatar) upload(avatar);
	};

	const handleClear = () => {
		setAvatar(null);
		if (inputRef.current) inputRef.current.value = '';
	};

	return {
		inputRef,
		user,
		isPending,
		avatar,
		handleUpload,
		handleUpdate,
		handleClear,
	};
};
