import styles from './Loader.module.scss';

const Loader = ({ size = 'medium' }) => {
	return (
		<div className={styles['loader-container']}>
			<div className={`${styles['loader']} ${styles[size]}`}></div>
		</div>
	);
};

export default Loader;
