'use client';

import { Button } from '@/components/UI';
import { PAGES } from '@/config';

const CreateChellengeButton = () => {
	return (
		<div>
			<Button href={PAGES.NEW_CHALLENGE}>Create Challenge</Button>
		</div>
	);
};

export default CreateChellengeButton;
