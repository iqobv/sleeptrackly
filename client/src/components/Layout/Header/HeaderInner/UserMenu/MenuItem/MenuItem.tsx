'use client';

import { Button } from '@/components/UI';
import Link from 'next/link';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
	onClick: () => void;
	label: string;
	icon: React.ReactNode;
	path?: string;
}

const MenuItem = ({ label, icon, path = '', onClick }: MenuItemProps) => {
	return (
		<Button
			variant="text"
			onClick={onClick}
			className={styles.link}
			fullWidth
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
	);
};

export default MenuItem;
