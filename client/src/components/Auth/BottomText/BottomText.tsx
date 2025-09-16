import Link from 'next/link';
import { PropsWithChildren } from 'react';
import styles from './BottomText.module.scss';

interface BottomTextProps {
	redirectUrl: string;
	redirectText: string;
}

const BottomText = ({
	children,
	redirectText,
	redirectUrl,
}: PropsWithChildren<BottomTextProps>) => {
	return (
		<div className={styles['bottom-text']}>
			{children}
			<Link className={styles['bottom-text__link']} href={redirectUrl}>
				{redirectText}
			</Link>
		</div>
	);
};

export default BottomText;
