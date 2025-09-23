'use client';

import { useLoginWindow } from '@/hooks';
import { FcGoogle } from 'react-icons/fc';
import SocialButton from '../SocialButton/SocialButton';

const Google = () => {
	const { handleOpen } = useLoginWindow(`/api/v1/auth/google`);

	return (
		<SocialButton onClick={handleOpen}>
			<FcGoogle /> Google
		</SocialButton>
	);
};

export default Google;
