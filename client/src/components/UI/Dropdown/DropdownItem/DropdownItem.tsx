'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './DropdownItem.module.scss';

const DropdownItem = ({
	children,
	...props
}: DropdownMenu.DropdownMenuItemProps) => {
	return (
		<DropdownMenu.Item className={styles.item} {...props}>
			{children}
		</DropdownMenu.Item>
	);
};

export default DropdownItem;
