'use client';

import { useAuth } from '@/hooks';
import { usePathname } from 'next/navigation';

import { List } from '@/components/UI';
import Link from 'next/link';
import { LINKS } from './links';
import styles from './NavLinks.module.scss';

interface NavLinksProps {
	closeMenu?: () => void;
}

const NavLinks = ({ closeMenu = () => {} }: NavLinksProps) => {
	const { user } = useAuth();
	const pathname = usePathname();

	return (
		<List
			items={LINKS}
			className={styles['nav-list']}
			gap={20}
			renderItem={(link) => {
				if (user?.role !== 'ADMIN' && link.isAdmin) return null;
				return (
					<li key={link.name} className={styles['nav-item']}>
						<Link
							href={link.path}
							className={`${styles['nav-link']} ${
								pathname === link.path ? styles.active : ''
							}`}
							onClick={closeMenu}
						>
							{link.label}
						</Link>
					</li>
				);
			}}
		/>
	);
};

export default NavLinks;
