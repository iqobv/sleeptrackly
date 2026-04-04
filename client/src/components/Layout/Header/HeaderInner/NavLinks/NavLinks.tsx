'use client';

import { List } from '@/components/UI';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LINKS } from './links';
import styles from './NavLinks.module.scss';

interface NavLinksProps {
	closeMenu?: () => void;
	className?: string;
	rowDirectionOnLg?: boolean;
}

const NavLinks = ({
	closeMenu = () => {},
	className,
	rowDirectionOnLg = false,
}: NavLinksProps) => {
	const { user } = useAuth();
	const pathname = usePathname();

	if (!user && LINKS.some((link) => link.isAuth)) {
		return null;
	}

	const listClassNames = [
		styles['nav-list'],
		rowDirectionOnLg ? styles['nav-list--lg'] : '',
		className,
	]
		.filter(Boolean)
		.join(' ')
		.trim();

	return (
		<List
			items={LINKS}
			className={listClassNames}
			listComponent="ul"
			gap={20}
			renderItem={(link) => {
				if (user?.role !== 'ADMIN' && link.isAdmin) return null;

				return (
					<li key={link.name} className={styles['nav-item']}>
						<Link
							href={link.path}
							className={`${styles['nav-link']} ${
								pathname.startsWith(link.path) ? styles.active : ''
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
