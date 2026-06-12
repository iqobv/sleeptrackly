'use client';

import { Button } from '@shared/ui';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import styles from './Header.module.scss';
import { useNavMenuStore } from '@/store/navMenu.store';

const iconsProps: IconBaseProps = {
	size: 24,
};

export const Header = () => {
	const [isMounted, setMounted] = useState(false);

	const isExpended = useNavMenuStore((state) => state.isExpanded);
	const setIsExpanded = useNavMenuStore((state) => state.setIsExpanded);

	useEffect(() => setMounted(true), []);

	const handleClick = () => setIsExpanded(!isExpended);

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Button variant="text" isIcon onClick={handleClick}>
					{isMounted && isExpended ? (
						<MdMenuOpen {...iconsProps} />
					) : (
						<MdMenu {...iconsProps} />
					)}
				</Button>
				<Button variant="outlined" asChild>
					<Link href={process.env.NEXT_PUBLIC_SITE_URL!} prefetch={false}>
						Open Site
					</Link>
				</Button>
			</div>
		</header>
	);
};
