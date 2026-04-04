'use client';

import { FcGoogle } from 'react-icons/fc';
import SocialButton from '../SocialButton/SocialButton';
import { useLoginWindow } from '../useLoginWindow';

const Google = () => {
	const { handleOpen } = useLoginWindow(`/v1/auth/google`);

	return (
		<SocialButton onClick={handleOpen}>
			<FcGoogle /> Google
		</SocialButton>
	);
};

export default Google;
