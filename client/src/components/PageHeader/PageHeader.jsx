import styles from './PageHeader.module.scss';

const PageHeader = ({ title, description = '' }) => {
	return (
		<div className={styles['page-header']}>
			<h1 className={styles['page-header-title']}>{title}</h1>
			{!!description && (
				<p className={styles['page-header-description']}>{description}</p>
			)}
		</div>
	);
};

export default PageHeader;
