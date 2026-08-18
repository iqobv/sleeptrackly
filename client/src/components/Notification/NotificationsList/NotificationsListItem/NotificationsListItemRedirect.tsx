'use client';

import { Button, DropdownItem } from '@shared/ui';
import Link from 'next/link';

interface NotificationsListItemRedirectProps {
	children: React.ReactNode;
	href: string;
	onClose?: () => void;
}

export const NotificationsListItemRedirect = ({
	children,
	href,
	onClose,
}: NotificationsListItemRedirectProps) => {
	return (
		<DropdownItem asChild>
			<Button
				fullWidth
				size="sm"
				variant="outlined"
				onClick={() => onClose && onClose()}
				asChild
			>
				<Link href={href}>{children}</Link>
			</Button>
		</DropdownItem>
	);
};
