'use client';

import { createChallenge } from '@/api';
import { PAGES } from '@/config';
import { CreateChallengeDto } from '@/dto';
import { CreateChallengeSchema } from '@/schemas';
import { IChallenge } from '@/types';
import { useRouter } from 'next/navigation';
import ChallengeForm from '../ChallengeForm/ChallengeForm';
import { CREATE_CHALLENGE_FIELDS } from './createChallengeFields';

const CreateChallenge = () => {
	const router = useRouter();

	return (
		<ChallengeForm<CreateChallengeDto, IChallenge>
			fields={CREATE_CHALLENGE_FIELDS}
			mutationFn={createChallenge}
			buttonLabel="Create"
			schema={CreateChallengeSchema}
			onSuccess={(data) => router.push(PAGES.CHALLENGE(data.id))}
		/>
	);
};

export default CreateChallenge;
