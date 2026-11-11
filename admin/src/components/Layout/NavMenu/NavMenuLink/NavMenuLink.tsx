'use client';

import { Button } from '@shared/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NavMenuLinksProps } from '../navMenuLinks';
import { ButtonContent } from './ButtonContent';
import styles from './NavMenuLink.module.scss';

interface NavMenuLinkProps {
	link: NavMenuLinksProps;
	isOpen: boolean;
}

export const NavMenuLink = ({ link, isOpen }: NavMenuLinkProps) => {
	const [isExpanded, setExpanded] = useState(false);
	const pathname = usePathname();

	const handleExpand = (e: React.MouseEvent) => {
		if (link.expanded && link.innerLinks) {
			e.stopPropagation();
			e.preventDefault();
			setExpanded((prev) => !prev);
		}
	};

	const isActive = link.href === pathname;

	return (
		<div>
			<Button
				key={link.id}
				variant="text"
				className={clsx(
					styles.link,
					isOpen && styles.open,
					isActive && styles.active,
				)}
				asChild
				onClick={(e) => {
					if (!link.href) handleExpand(e);
				}}
			>
				{link.href ? (
					<Link
						href={link.href}
						className={styles.buttonContent}
						prefetch={false}
					>
						<ButtonContent
							isExpanded={isExpanded}
							isOpen={isOpen}
							link={link}
						/>
					</Link>
				) : (
					<div className={styles.buttonContent}>
						<ButtonContent
							isExpanded={isExpanded}
							isOpen={isOpen}
							link={link}
						/>
					</div>
				)}
			</Button>

			{isOpen &&
				isExpanded &&
				link.innerLinks &&
				link.innerLinks.length > 0 && (
					<div className={styles.innerLinks}>
						{link.innerLinks.map((innerLink) => {
							if (!innerLink.href) return null;

							const isActive = innerLink.href === pathname;

							return (
								<Button
									key={innerLink.href}
									variant="text"
									className={clsx(
										styles.link,
										isOpen && styles.open,
										isActive && styles.active,
									)}
									asChild
								>
									<Link
										href={innerLink.href}
										className={styles.buttonContent}
										prefetch={false}
									>
										<innerLink.Icon size={25} className={styles.icon} />
										<p className={styles.text}>{innerLink.label}</p>
									</Link>
								</Button>
							);
						})}
					</div>
				)}
		</div>
	);
};
