'use client';

import Loader from '../../Loader/Loader';
import styles from './ButtonContent.module.scss';

interface ButtonContentProps {
	children: React.ReactNode;
	loading: boolean;
}

const ButtonContent = ({ children, loading }: ButtonContentProps) => {
	return (
		<div
			className={`${styles['button__inner']} ${
				loading ? styles['button__inner--loading'] : ''
			}`}
		>
			<div className={styles['button__content']}>{children}</div>
			{loading && (
				<Loader
					containerClassName={styles['button__loader']}
					disablePadding
					thickness={4}
					size={22}
				/>
			)}
		</div>
	);
};

export default ButtonContent;
