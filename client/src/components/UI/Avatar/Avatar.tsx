'use client';

import Image from 'next/image';
import { useState } from 'react';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import styles from './Avatar.module.scss';
import { AvatarProps } from './Avatar.types';

export default function Avatar({
	avatar = 'default-avatar.png',
	size = 40,
	avatarClassName,
	containerClassName,
	priority = false,
}: AvatarProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={`${styles['avatar']} ${containerClassName}`}>
			{!loaded && (
				<SkeletonLoader
					containerClassName={styles['avatar__skeleton']}
					circle
					width={size}
					height={size}
				/>
			)}
			<Image
				src={`/api/images/${avatar}`}
				alt="avatar"
				className={`${styles['avatar__image']} ${avatarClassName}`}
				width={size}
				height={size}
				onLoad={() => setLoaded(true)}
				priority={priority}
				style={{ opacity: loaded ? 1 : 0 }}
			/>
		</div>
	);
}
