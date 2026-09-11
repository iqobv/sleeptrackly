'use client';

import { UserAvatar } from '@/components/UI';
import { Input, SectionHeader } from '@shared/ui';
import styles from './UploadAvatar.module.scss';
import { UploadAvatarLoader } from './UploadAvatarLoader';
import { UploadModal } from './UploadModal/UploadModal';
import { ACCEPTED_IMAGE_TYPES, useUploadAvatar } from './useUploadAvatar';

export const UploadAvatar = () => {
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
		<div>
			{isPending || !user ? (
				<UploadAvatarLoader />
			) : (
				<div className={styles.container}>
					<SectionHeader
						title="Avatar"
						description="To change your avatar, click on avatar and select a new one."
						titleProps={{
							variant: 'h3',
						}}
					/>
					<button
						onClick={() => inputRef.current?.click()}
						className={styles.wrapper}
					>
						<UserAvatar avatarPath={user.avatar?.url} size={250} />
					</button>
					<div className={styles.inputContainer}>
						<Input
							ref={inputRef}
							type="file"
							id="avatar"
							hidden
							accept={ACCEPTED_IMAGE_TYPES.join(', ')}
							className={styles.input}
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
