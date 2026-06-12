'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';
import styles from './BottomText.module.scss';

interface BottomTextProps {
	redirectUrl: string;
	redirectText: string;
}

export const BottomText = ({
	children,
	redirectText,
	redirectUrl,
}: PropsWithChildren<BottomTextProps>) => {
	return (
		<div className={styles.bottomText}>
			{children}
			<Link className={styles.link} href={redirectUrl}>
				{redirectText}
			</Link>
		</div>
	);
};
