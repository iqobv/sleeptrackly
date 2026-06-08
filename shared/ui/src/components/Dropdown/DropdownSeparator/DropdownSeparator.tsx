'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './DropdownSeparator.module.scss';

export const DropdownSeparator = () => {
	return <DropdownMenu.Separator className={styles.separator} />;
};
