'use client';

import { Button, Dropdown } from '@/components/UI';
import Link from 'next/link';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
	label: string;
	icon: React.ReactNode;
	path?: string;
	onClick?: () => void;
}

const MenuItem = ({ label, icon, path = '', onClick }: MenuItemProps) => {
	return (
		<Dropdown.Item asChild>
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
		</Dropdown.Item>
	);
};

export default MenuItem;
