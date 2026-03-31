import { Logo } from '@/components/Icons';
import { LogoProps } from '@/components/Icons/Logo';
import { PAGES } from '@/config';
import Link from 'next/link';
import styles from './NavLogo.module.scss';

interface NavLogoProps {
	className?: string;
	onClick?: () => void;
	logoProps?: LogoProps;
}

const NavLogo = ({ className, onClick, logoProps }: NavLogoProps) => {
	return (
		<Link
			href={PAGES.HOME}
			className={`${styles['logo-link']} ${className || ''}`}
			onClick={onClick}
		>
			<Logo {...logoProps} />
			<span>Sleeptrackly</span>
		</Link>
	);
};

export default NavLogo;
