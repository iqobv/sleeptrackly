'use client';

import { getChallengeById, updateChallenge } from '@/api';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { UpdateChallengeDto } from '@/dto';
import { UpdateSchema } from '@/schemas';
import { Button } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';
import ChallengeForm from '../ChallengeForm/ChallengeForm';
import styles from './EditChallenge.module.scss';
import { UPDATE_CHALLENGE_FIELDS } from './editChallengeFields';

type EditChallengeResponse = Awaited<ReturnType<typeof updateChallenge>>;

interface EditChallengeProps {
	id: string;
}

const EditChallenge = ({ id }: EditChallengeProps) => {
	const { data: challenge, refetch } = useQuery({
		queryKey: QUERY_KEYS.challenges.one(id),
		queryFn: () => getChallengeById(id),
		enabled: !!id,
	});

	const onSuccess = () => refetch();

	return (
		<div className={styles.editChallenge}>
			<Button variant="text" asChild>
				<Link href={PRIVATE_PAGES.CHALLENGES.BY_ID(id)}>
					<IoMdArrowBack />
					Go Back
				</Link>
			</Button>
			<ChallengeForm<UpdateChallengeDto, EditChallengeResponse>
				fields={UPDATE_CHALLENGE_FIELDS}
				mutationFn={(data) => updateChallenge(id, data)}
				buttonLabel="Update"
				schema={UpdateSchema}
				onSuccess={onSuccess}
				{...{ defaultValues: challenge }}
			/>
		</div>
	);
};

export default EditChallenge;
