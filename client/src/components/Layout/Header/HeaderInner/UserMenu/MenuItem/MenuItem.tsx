'use client';

import { Button, DropdownItem } from '@shared/ui';
import Link from 'next/link';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
	label: string;
	icon: React.ReactNode;
	path?: string;
	onClick?: () => void;
}

export const MenuItem = ({
	label,
	icon,
	path = '',
	onClick,
}: MenuItemProps) => {
	return (
		<DropdownItem asChild>
			<Button
				variant="text"
				className={styles.link}
				fullWidth
				onClick={onClick}
				{...(path && { asChild: true })}
			>
				{path ? (
					<Link href={path}>
						{icon}
						{label}
					</Link>
				) : (
					<>
						{icon}
						{label}
					</>
				)}
			</Button>
		</DropdownItem>
	);
};
