'use client';

import {
	getChallengeById,
	updateChallenge,
} from '@/api/challenge/challenge.api';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpdateChallengeDto } from '@/dto/challenge/challenge.dto';
import { updateChallengeSchema } from '@/schemas/challenge/updateChallenge.schema';
import { Form } from '@shared/form';
import { Button } from '@shared/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';
import { toast } from 'react-toastify';
import { ChallengeForm } from '../ChallengeForm/ChallengeForm';
import styles from './EditChallenge.module.scss';
import { UPDATE_CHALLENGE_FIELDS } from './editChallengeFields';

interface EditChallengeProps {
	id: string;
}

export const EditChallenge = ({ id }: EditChallengeProps) => {
	const queryClient = useQueryClient();

	const { data: challenge } = useQuery({
		queryKey: QUERY_KEYS.challenges.detail(id),
		queryFn: () => getChallengeById(id),
		enabled: !!id,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpdateChallengeDto) => updateChallenge(id, data),
	});

	return (
		<div className={styles.editChallenge}>
			<Button variant="text" asChild>
				<Link href={PRIVATE_PAGES.CHALLENGES.BY_ID(id)}>
					<IoMdArrowBack />
					Go Back
				</Link>
			</Button>
			<Form<UpdateChallengeDto>
				schema={updateChallengeSchema}
				defaultValues={{
					title: '',
					description: '',
				}}
				values={{
					title: challenge?.title || '',
					description: challenge?.description || '',
				}}
				onSubmit={(data, _e, methods) => {
					mutate(data, {
						onSuccess: () => {
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.challenges.detail(id),
							});
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.challenges.list(),
							});
							toast.success('Challenge updated successfully');
						},
						onError: (error) => {
							if (isAxiosError(error) && error.response?.data.field) {
								methods.setError(error.response.data.field, {
									message: error.response.data.message,
								});
								return;
							}

							toast.error(
								error.message ||
									'An error occurred while updating the challenge',
							);
						},
					});
				}}
			>
				<ChallengeForm<UpdateChallengeDto>
					fields={UPDATE_CHALLENGE_FIELDS}
					buttonLabel="Update"
					isEditing
					isLoading={isPending}
				/>
			</Form>
		</div>
	);
};
