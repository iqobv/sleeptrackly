'use client';

import { Button } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config';

const CreateChellengeButton = () => {
	return (
		<div>
			<Button href={PRIVATE_PAGES.CHALLENGES.NEW}>Create Challenge</Button>
		</div>
	);
};

export default CreateChellengeButton;
