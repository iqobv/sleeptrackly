import { Avatar } from '@shared/ui';

interface UserAvatarProps {
	avatarPath?: string | null;
	size?: number;
	isAnimated?: boolean;
}

export const UserAvatar = ({
	avatarPath,
	size = 40,
	isAnimated,
}: UserAvatarProps) => {
	const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL as string;
	const path = avatarPath || 'defaults/default-avatar.png';
	const fullSrc = `${cdnUrl}/${path}`;

	const isVideo = isAnimated || path.endsWith('.mp4') || path.endsWith('.webm');

	return (
		<Avatar src={fullSrc} size={size} isVideo={isVideo} alt="User Avatar" />
	);
};
