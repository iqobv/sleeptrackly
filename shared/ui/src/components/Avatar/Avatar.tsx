'use client';

import { useState } from 'react';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import styles from './Avatar.module.scss';
import { AvatarProps } from './Avatar.types';

export const Avatar = ({
	src,
	size = 40,
	avatarClassName,
	containerClassName,
	priority = false,
	isVideo = false,
	alt = 'Avatar',
}: AvatarProps) => {
	const [loaded, setLoaded] = useState<boolean>(false);

	return (
		<div className={`${styles.avatar} ${containerClassName || ''}`.trim()}>
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
					src={src}
					loop
					autoPlay
					muted
					playsInline
					width={size}
					height={size}
					className={`${styles.image} ${avatarClassName || ''}`.trim()}
					onLoadedData={() => setLoaded(true)}
					style={{ opacity: loaded ? 1 : 0 }}
				/>
			) : (
				<img
					src={src}
					alt={alt}
					width={size}
					height={size}
					loading={priority ? 'eager' : 'lazy'}
					fetchPriority={priority ? 'high' : 'auto'}
					className={`${styles.image} ${avatarClassName || ''}`.trim()}
					onLoad={() => setLoaded(true)}
					style={{ opacity: loaded ? 1 : 0 }}
				/>
			)}
		</div>
	);
};
