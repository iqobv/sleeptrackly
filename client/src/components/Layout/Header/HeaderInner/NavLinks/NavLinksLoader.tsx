import { List, SkeletonLoader } from '@shared/ui';
import clsx from 'clsx';
import { LINKS } from './links';
import styles from './NavLinks.module.scss';

interface NavLinksProps {
	className?: string;
	rowDirectionOnLg?: boolean;
}

export const NavLinksLoader = ({
	className,
	rowDirectionOnLg = false,
}: NavLinksProps) => {
	return (
		<List
			items={LINKS}
			className={clsx(styles.list, rowDirectionOnLg && styles.lg, className)}
			listComponent="ul"
			gap={20}
			renderItem={(link) => {
				return (
					<li key={link.name} className={styles.item}>
						<SkeletonLoader className={styles.link} height={17} width={60} />
					</li>
				);
			}}
		/>
	);
};
