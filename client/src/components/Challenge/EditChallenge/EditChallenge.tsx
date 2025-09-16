'use client';

import { getChallengeById, updateChallenge } from '@/api';
import { Button } from '@/components/UI';
import { PAGES } from '@/config';
import { UpdateChallengeDto } from '@/dto';
import { UpdateSchema } from '@/schemas';
import { IChallenge } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IoMdArrowBack } from 'react-icons/io';
import ChallengeForm from '../ChallengeForm/ChallengeForm';
import { UPDATE_CHALLENGE_FIELDS } from './editChallengeFields';

import styles from './EditChallenge.module.scss';

interface EditChallengeProps {
	id: string;
}

const EditChallenge = ({ id }: EditChallengeProps) => {
	const queryClient = useQueryClient();

	const { data: challenge } = useQuery({
		queryKey: ['challenge', id],
		queryFn: () => getChallengeById(id),
		enabled: !!id,
	});

	const onSuccess = () =>
		queryClient.invalidateQueries({ queryKey: ['challenge', id] });

	return (
		<div className={styles['edit-challenge']}>
			<Button href={PAGES.CHALLENGE(id)} variant="text">
				<IoMdArrowBack />
				Go Back
			</Button>
			<ChallengeForm<UpdateChallengeDto, IChallenge>
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
