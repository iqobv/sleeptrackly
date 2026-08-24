import { NavLogo } from '@/components/UI';
import { Header } from '../Header';
import { NavContainer } from '../HeaderInner/NavContainer/NavContainer';
import { NavLinks } from '../HeaderInner/NavLinks/NavLinks';
import { ShopBalance } from '../HeaderInner/ShopBalance/ShopBalance';
import { UserMenu } from '../HeaderInner/UserMenu/UserMenu';
import styles from './ShopHeader.module.scss';

export const ShopHeader = () => (
	<Header>
		<NavContainer
			withMenu
			mobileWidth="lg"
			menuButtonClassName={styles.menuButton}
			className={styles.navContainer}
		>
			<div className={styles.logo}>
				<NavLogo />
			</div>
			<nav className={styles.nav}>
				<NavLinks rowDirectionOnLg />
			</nav>
			<div className={styles.auth}>
				<ShopBalance />
				<UserMenu />
			</div>
		</NavContainer>
	</Header>
);
