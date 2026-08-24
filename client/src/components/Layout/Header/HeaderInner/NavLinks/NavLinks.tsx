'use client';

import { useAuth } from '@/hooks/useAuth.hook';
import { List } from '@shared/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LINKS } from './links';
import styles from './NavLinks.module.scss';
import { NavLinksLoader } from './NavLinksLoader';

interface NavLinksProps {
	closeMenu?: () => void;
	className?: string;
	rowDirectionOnLg?: boolean;
}

export const NavLinks = ({
	closeMenu = () => {},
	className,
	rowDirectionOnLg = false,
}: NavLinksProps) => {
	const { user, isLoading } = useAuth();
	const pathname = usePathname();

	if (isLoading)
		return (
			<NavLinksLoader
				rowDirectionOnLg={rowDirectionOnLg}
				className={className}
			/>
		);

	return (
		<List
			items={LINKS}
			className={clsx(styles.list, rowDirectionOnLg && styles.lg, className)}
			listComponent="ul"
			gap={20}
			renderItem={(link) => {
				if (user?.role !== 'ADMIN' && link.isAdmin) return null;

				return (
					<li key={link.name} className={styles.item}>
						<Link
							href={link.path}
							className={clsx(
								styles.link,
								pathname.startsWith(link.path) && styles.active,
							)}
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
