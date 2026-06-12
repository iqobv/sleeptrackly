import { Logo, LogoProps } from '@/components/Icons/Logo';
import { PAGES } from '@/config/pages.config';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './NavLogo.module.scss';

interface NavLogoProps {
	className?: string;
	onClick?: () => void;
	logoProps?: LogoProps;
}

export const NavLogo = ({ className, onClick, logoProps }: NavLogoProps) => {
	return (
		<Link
			href={PAGES.HOME}
			className={clsx(styles.logoLink, className)}
			onClick={onClick}
		>
			<Logo {...logoProps} />
			<span>Sleeptrackly</span>
		</Link>
	);
};
