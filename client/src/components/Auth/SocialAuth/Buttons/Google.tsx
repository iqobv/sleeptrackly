'use client';

import { useLoginWindow } from '@/hooks';
import { FaGoogle } from 'react-icons/fa6';
import SocialButton from '../SocialButton/SocialButton';

const Google = () => {
	const { handleOpen } = useLoginWindow(`/api/v1/auth/google`);

	return (
		<SocialButton onClick={handleOpen}>
			<FaGoogle /> Google
		</SocialButton>
	);
};

export default Google;
