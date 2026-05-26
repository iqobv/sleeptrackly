'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import styles from './Avatar.module.scss';
import { AvatarProps } from './Avatar.types';

export const Avatar = ({
	avatar = 'defaults/default-avatar.png',
	size = 40,
	avatarClassName,
	containerClassName,
	priority = false,
	isVideo = false,
}: AvatarProps) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={clsx(styles.avatar, containerClassName)}>
			{!loaded && (
				<SkeletonLoader
					containerClassName={styles.skeleton}
					circle
					width={size}
					height={size}
				/>
			)}
			{isVideo ? (
				<video
					src={`${process.env.NEXT_PUBLIC_CDN_URL}/${avatar}`}
					loop
					autoPlay
					muted
					width={size}
					height={size}
					className={clsx(styles.image, avatarClassName)}
					onLoadedData={() => setLoaded(true)}
				/>
			) : (
				<Image
					src={`${process.env.NEXT_PUBLIC_CDN_URL}/${avatar}`}
					alt="avatar"
					className={clsx(styles.image, avatarClassName)}
					width={size}
					height={size}
					onLoad={() => setLoaded(true)}
					priority={priority}
					style={{ opacity: loaded ? 1 : 0 }}
				/>
			)}
		</div>
	);
};
