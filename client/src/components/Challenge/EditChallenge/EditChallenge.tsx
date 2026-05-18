'use client';

import { getChallengeById, updateChallenge } from '@/api';
import { Button } from '@/components/UI';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { UpdateChallengeDto } from '@/dto';
import { UpdateSchema } from '@/schemas';
import { Challenge } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { IoMdArrowBack } from 'react-icons/io';
import ChallengeForm from '../ChallengeForm/ChallengeForm';
import { UPDATE_CHALLENGE_FIELDS } from './editChallengeFields';

import Link from 'next/link';
import styles from './EditChallenge.module.scss';

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
		<div className={styles['edit-challenge']}>
			<Button variant="text" asChild>
				<Link href={PRIVATE_PAGES.CHALLENGES.BY_ID(id)}>
					<IoMdArrowBack />
					Go Back
				</Link>
			</Button>
			<ChallengeForm<UpdateChallengeDto, Challenge>
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
