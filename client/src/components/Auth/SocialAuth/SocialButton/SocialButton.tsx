'use client';

import { Button } from '@shared/ui';
import { PropsWithChildren } from 'react';

interface SocialButtonProps {
	onClick?: () => void;
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
