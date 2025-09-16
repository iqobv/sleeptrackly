'use client';

import { Button } from '@/components/UI';
import { PropsWithChildren } from 'react';

interface SocialButtonProps {
	onClick: () => void;
}

const SocialButton = ({
	children,
	onClick,
}: PropsWithChildren<SocialButtonProps>) => {
	return (
		<Button variant="outlined" onClick={onClick} fullWidth>
			{children}
		</Button>
	);
};

export default SocialButton;
