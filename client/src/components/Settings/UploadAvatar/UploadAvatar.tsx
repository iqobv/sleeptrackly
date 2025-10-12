'use client';

import { Loader, SectionHeader, TextField } from '@/components/UI';
import Image from 'next/image';
import styles from './UploadAvatar.module.scss';
import UploadModal from './UploadModal/UploadModal';
import { useUploadAvatar } from './useUploadAvatar';

const UploadAvatar = () => {
	const {
		inputRef,
		user,
		isPending,
		avatar,
		handleUpload,
		handleUpdate,
		handleClear,
	} = useUploadAvatar();

	return (
		<div className={styles['avatar']}>
			{isPending ? (
				<Loader />
			) : (
				<div className={styles['avatar__container']}>
					<SectionHeader
						title="Avatar"
						description="To change your avatar, click on avatar and select a new one."
						titleComponent="h3"
					/>
					<button
						onClick={() => inputRef.current?.click()}
						className={styles['avatar__wrapper']}
					>
						<Image
							src={`/api/images/${user?.avatar?.url || 'default-avatar.png'}`}
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
