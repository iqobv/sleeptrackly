'use client';

import Loader from '../Loader/Loader';
import styles from './PageLoader.module.scss';

export default function PageLoader() {
	return (
		<Loader
			containerClassName={styles['page-loader']}
			loaderClassName={styles['page-loader__loader']}
			size={80}
			thickness={12}
		/>
	);
}
