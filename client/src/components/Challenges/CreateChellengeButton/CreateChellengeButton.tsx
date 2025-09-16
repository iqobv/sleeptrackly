'use client';

import { Button } from '@/components/UI';
import { PAGES } from '@/config';
import styles from './CreateChellengeButton.module.scss';

const CreateChellengeButton = () => {
	return (
		<div className={styles['challenges-list-create-challenge']}>
			<Button href={PAGES.NEW_CHALLENGE}>Create Challenge</Button>
		</div>
	);
};

export default CreateChellengeButton;
