'use client';

import { uploadUserAvatar } from '@/api';
import { Loader, TextField } from '@/components/UI';
import { useAuth } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './UploadAvatar.module.scss';
import UploadModal from './UploadModal/UploadModal';

const UploadAvatar = () => {
	const { user } = useAuth();
	const router = useRouter();
	const [avatar, setAvatar] = useState<File | null>(null);
	const queryClient = useQueryClient();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { mutate: upload, isPending } = useMutation({
		mutationFn: (file: File) => uploadUserAvatar(file),
		mutationKey: ['avatar'],
		onSuccess(data) {
			queryClient.setQueryData(['user'], data);
			queryClient.invalidateQueries({ queryKey: ['user'] });
			toast.success('Avatar updated');
			router.refresh();
			setAvatar(null);
			if (inputRef.current) inputRef.current.value = '';
		},
	});

	const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) setAvatar(file);
	};

	const handleUpdate = () => {
		if (avatar) upload(avatar);
	};

	const handleClear = () => {
		setAvatar(null);
		if (inputRef.current) inputRef.current.value = '';
	};

	return (
		<div className={styles['avatar']}>
			{isPending ? (
				<Loader />
			) : (
				<>
					<div className={styles['avatar__wrapper']}>
						<Image
							src={`/api/images/${user?.avatar.url || 'default-avatar.png'}`}
							width={100}
							height={100}
							alt="avatar"
							className={styles['avatar__image']}
							priority
						/>
					</div>
					<div>
						<TextField
							ref={inputRef}
							type="file"
							id="avatar"
							accept="image/*"
							className={styles['avatar__input']}
							onChange={handleUpload}
						/>
						<label htmlFor="avatar" className={styles['avatar__label']}>
							Upload
						</label>
					</div>
					{avatar && (
						<UploadModal
							file={avatar}
							handleClear={handleClear}
							handleUpdate={handleUpdate}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default UploadAvatar;
