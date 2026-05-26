'use client';

import { Loader } from '../Loader/Loader';
import styles from './PageLoader.module.scss';

export const PageLoader = () => {
	return (
		<Loader
			containerClassName={styles.pageLoaderContainer}
			loaderClassName={styles.pageLoader}
			size={80}
			thickness={12}
		/>
	);
};
