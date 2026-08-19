'use client';

import { env } from '@/env';
import { useNavMenuStore } from '@/store/navMenu.store';
import { useMounted } from '@shared/hooks';
import { Button } from '@shared/ui';
import Link from 'next/link';
import { IconBaseProps } from 'react-icons';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import styles from './Header.module.scss';

const iconsProps: IconBaseProps = {
	size: 24,
};

export const Header = () => {
	const mounted = useMounted();

	const isExpended = useNavMenuStore((state) => state.isExpanded);
	const setIsExpanded = useNavMenuStore((state) => state.setIsExpanded);

	const handleClick = () => setIsExpanded(!isExpended);

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Button variant="text" isIcon onClick={handleClick}>
					{mounted && isExpended ? (
						<MdMenuOpen {...iconsProps} />
					) : (
						<MdMenu {...iconsProps} />
					)}
				</Button>
				<Button variant="outlined" asChild>
					<Link href={env.NEXT_PUBLIC_SITE_URL} prefetch={false}>
						Open Site
					</Link>
				</Button>
			</div>
		</header>
	);
};
