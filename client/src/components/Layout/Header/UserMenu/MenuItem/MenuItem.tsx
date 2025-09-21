'use client';

import { Button } from '@/components/UI';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
	onClick: () => void;
	label: string;
	icon: React.ReactNode;
	path?: string;
}

const MenuItem = ({ label, icon, path = '', onClick }: MenuItemProps) => {
	return (
		<div className={styles['menu-item']}>
			<Button
				variant="text"
				onClick={onClick}
				className={styles['menu-item__link']}
				fullWidth
				{...(path && { href: path })}
			>
				{icon}
				{label}
			</Button>
		</div>
	);
};

export default MenuItem;
