import { Logo } from '@/components/Icons';
import { PAGES } from '@/config';
import Link from 'next/link';
import styles from './NavLogo.module.scss';

interface NavLogoProps {
	className?: string;
	onClick?: () => void;
}

const NavLogo = ({ className, onClick }: NavLogoProps) => {
	return (
		<Link
			href={PAGES.HOME}
			className={`${styles['logo-link']} ${className || ''}`}
			onClick={onClick}
		>
			<Logo />
			<span>Sleeptrackly</span>
		</Link>
	);
};

export default NavLogo;
