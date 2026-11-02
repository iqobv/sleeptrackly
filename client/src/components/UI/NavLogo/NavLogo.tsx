import { LogoIcon } from '@/assets/icons';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import clsx from 'clsx';
import styles from './NavLogo.module.scss';

interface NavLogoProps {
	className?: string;
	onClick?: () => void;
	logoProps?: React.SVGProps<SVGSVGElement>;
	hideTextOnMobile?: boolean;
}

export const NavLogo = ({
	className,
	onClick,
	logoProps,
	hideTextOnMobile = false,
}: NavLogoProps) => {
	const {
		fill = 'currentColor',
		width = '28px',
		height = '28px',
		...restLogoProps
	} = logoProps || {};

	return (
		<a
			href={CROSS_DOMAIN_ROUTES.HOME}
			className={clsx(styles.logoLink, className)}
			onClick={onClick}
		>
			<LogoIcon fill={fill} width={width} height={height} {...restLogoProps} />
			<span className={clsx(styles.text, hideTextOnMobile && styles.hidden)}>
				Sleeptrackly
			</span>
		</a>
	);
};
