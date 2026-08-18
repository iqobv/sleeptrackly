'use client';

import clsx from 'clsx';
import { FaRegSnowflake } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import styles from './ChallengeTag.module.scss';

interface ChallengeTagProps {
	children: React.ReactNode;
	isFrozen?: boolean;
	isDuration?: boolean;
}

export const ChallengeTag = ({
	children,
	isFrozen = false,
	isDuration = false,
}: ChallengeTagProps) => {
	if (isDuration)
		return (
			<div className={clsx(styles.tag, styles.duration)}>
				<span>{children}</span>
			</div>
		);

	return (
		<div className={clsx(styles.tag, isFrozen && styles.frozen)}>
			{isFrozen ? <FaRegSnowflake /> : <GoDotFill />}
			<span>{children}</span>
		</div>
	);
};
