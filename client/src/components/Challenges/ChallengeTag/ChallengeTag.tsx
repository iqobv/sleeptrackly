'use client';

import clsx from 'clsx';
import { FaRegSnowflake } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import styles from './ChallengeTag.module.scss';

interface ChallengeTagProps {
	children: React.ReactNode;
	isFrozen?: boolean;
}

export const ChallengeTag = ({
	children,
	isFrozen = false,
}: ChallengeTagProps) => {
	return (
		<div className={clsx(styles.tag, isFrozen && styles.frozen)}>
			{isFrozen ? <FaRegSnowflake /> : <GoDotFill />}
			<span>{children}</span>
		</div>
	);
};
