'use client';

import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { Button } from '@shared/ui';
import Link from 'next/link';

export const CreateChellengeButton = () => {
	return (
		<div>
			<Button asChild>
				<Link href={PRIVATE_PAGES.CHALLENGES.NEW}>Create Challenge</Link>
			</Button>
		</div>
	);
};
