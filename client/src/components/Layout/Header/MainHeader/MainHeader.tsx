import Header from '../Header';
import { MainHeaderNav, NavContainer } from '../HeaderInner';

const MainHeader = () => {
	return (
		<Header>
			<NavContainer withMenu>
				<MainHeaderNav />
			</NavContainer>
		</Header>
	);
};

export default MainHeader;
