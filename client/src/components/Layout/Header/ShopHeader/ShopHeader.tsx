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
				menuButtonClassName={styles['shop-header__menu-button']}
				className={styles['shop-header__nav-container']}
			>
				<div className={styles['shop-header__logo']}>
					<NavLogo />
				</div>
				<nav className={styles['shop-header__nav']}>
					<NavLinks />
				</nav>
				<div className={styles['shop-header__auth']}>
					<ShopBalance />
					<AuthButtons />
				</div>
			</NavContainer>
		</Header>
	);
};

export default ShopHeader;
