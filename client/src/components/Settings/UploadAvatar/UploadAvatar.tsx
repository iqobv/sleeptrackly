'use client';

import { Avatar, SectionHeader, TextField } from '@/components/UI';
import styles from './UploadAvatar.module.scss';
import UploadAvatarLoader from './UploadAvatarLoader';
import UploadModal from './UploadModal/UploadModal';
import { ACCEPTED_IMAGE_TYPES, useUploadAvatar } from './useUploadAvatar';

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
			{isPending || !user ? (
				<UploadAvatarLoader />
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
						<Avatar avatar={user.avatar?.url} size={250} />
					</button>
					<div className={styles['avatar__input-container']}>
						<TextField
							ref={inputRef}
							type="file"
							id="avatar"
							hidden
							accept={ACCEPTED_IMAGE_TYPES.join(', ')}
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
