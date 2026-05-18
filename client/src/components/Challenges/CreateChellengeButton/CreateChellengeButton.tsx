'use client';

import { Button } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config';
import Link from 'next/link';

const CreateChellengeButton = () => {
	return (
		<div>
			<Button asChild>
				<Link href={PRIVATE_PAGES.CHALLENGES.NEW}>Create Challenge</Link>
			</Button>
		</div>
	);
};

export default CreateChellengeButton;
