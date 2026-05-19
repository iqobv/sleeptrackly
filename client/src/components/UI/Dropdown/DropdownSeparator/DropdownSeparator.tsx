'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './DropdownSeparator.module.scss';

const DropdownSeparator = () => {
	return <DropdownMenu.Separator className={styles.separator} />;
};

export default DropdownSeparator;
