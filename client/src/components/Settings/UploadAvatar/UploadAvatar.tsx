'use client';

import { uploadUserAvatar } from '@/api';
import { Loader, PageHeader, TextField } from '@/components/UI';
import { useAuth } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
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
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { mutate: upload, isPending } = useMutation({
		mutationFn: (file: File) => uploadUserAvatar(file),
		mutationKey: ['avatar'],
		onSuccess(data) {
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
				<div className={styles['avatar__container']}>
					<PageHeader
						title="Avatar"
						description="To change your avatar, click on avatar and select a new one."
						titleComponent="h3"
					/>
					<button
						onClick={() => inputRef.current?.click()}
						className={styles['avatar__wrapper']}
					>
						<Image
							src={`/api/images/${user?.avatar.url || 'default-avatar.png'}`}
							width={250}
							height={250}
							alt="avatar"
							className={styles['avatar__image']}
							priority
						/>
					</button>
					<div>
						<TextField
							ref={inputRef}
							type="file"
							id="avatar"
							hidden
							accept="image/*"
							className={styles['avatar__input']}
							onChange={handleUpload}
						/>
					</div>
					{avatar && (
						<UploadModal
							file={avatar}
							handleClear={handleClear}
							handleUpdate={handleUpdate}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default UploadAvatar;
