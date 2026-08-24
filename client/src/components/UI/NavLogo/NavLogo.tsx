import { Logo, LogoProps } from '@/components/Icons/Logo';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import clsx from 'clsx';
import styles from './NavLogo.module.scss';

interface NavLogoProps {
	className?: string;
	onClick?: () => void;
	logoProps?: LogoProps;
}

export const NavLogo = ({ className, onClick, logoProps }: NavLogoProps) => {
	return (
		<a
			href={CROSS_DOMAIN_ROUTES.HOME}
			className={clsx(styles.logoLink, className)}
			onClick={onClick}
		>
			<Logo {...logoProps} />
			<span>Sleeptrackly</span>
		</a>
	);
};
