import { NavLogo } from '@/components/UI';
import Header from '../Header';
import { NavContainer, ShopBalance } from '../HeaderInner';
import AuthButtons from '../HeaderInner/AuthButtons/AuthButtons';
import NavLinks from '../HeaderInner/NavLinks/NavLinks';
import styles from './ShopHeader.module.scss';

const ShopHeader = () => {
	return (
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
					<AuthButtons />
				</div>
			</NavContainer>
		</Header>
	);
};

export default ShopHeader;
