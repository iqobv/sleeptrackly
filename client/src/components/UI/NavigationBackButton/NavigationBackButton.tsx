'use client';

import { BackButton, type BackButtonProps } from '@shared/ui';
import { useRouter } from 'next/navigation';

type NavigationBackButtonProps = Omit<BackButtonProps, 'onClick'> & {
	fallbackUrl?: string;
};

export const NavigationBackButton = ({
	fallbackUrl,
	...props
}: NavigationBackButtonProps) => {
	const router = useRouter();

	const handleNavigation = () => {
		if (window.history.length > 1) {
			router.back();
		} else if (fallbackUrl) {
			router.push(fallbackUrl);
		} else {
			router.push('/');
		}
	};

	return <BackButton onClick={handleNavigation} {...props} />;
};
