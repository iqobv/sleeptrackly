import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import useAuth from '../hooks/useAuth';

import Header from '../components/Header/Header';

import styles from './Layout.module.scss';

const Layout = () => {
	const { checkAuth, user } = useAuth();
	const { theme } = useSelector((state) => state.theme);

	useEffect(() => {
		checkAuth();
	}, [user]);

	useEffect(() => {
		document.body.classList.toggle('dark', theme === 'dark');
	}, [theme]);

	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<ToastContainer
				theme={theme}
				autoClose={2000}
				closeButton
				limit={1}
				newestOnTop
				position="bottom-left"
				hideProgressBar
			/>
		</>
	);
};

export default Layout;
