'use client';

import { FcGoogle } from 'react-icons/fc';
import { SocialButton } from '../SocialButton/SocialButton';
import { useLoginWindow } from '../useLoginWindow';

export const Google = () => {
	const { handleOpen } = useLoginWindow(`/v1/oauth/google`);

	return (
		<SocialButton onClick={handleOpen}>
			<FcGoogle /> Google
		</SocialButton>
	);
};
