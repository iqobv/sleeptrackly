'use client';

import Link from 'next/link';
import type { Link as LinkType } from '../userManuLinks';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
	item: LinkType;
	onClick: () => void;
}

const MenuItem = ({ item, onClick }: MenuItemProps) => {
	return (
		<div className={styles['menu-item']}>
			<Link
				onClick={onClick}
				className={styles['menu-item__link']}
				href={item.path}
			>
				{item.label}
			</Link>
		</div>
	);
};

export default MenuItem;
