'use client';

import { getChallengeTemplate } from '@/api/challenge/templates/getChallengeTemplate.api';
import { updateChallengeTemplate } from '@/api/challenge/templates/updateChallengeTemplate.api';
import { PageWrapper } from '@/components/UI';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpdateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { updateChallengeTemplateSchema } from '@/schemas/challenge/templates/updateChallengeTemplate.schema';
import { Form } from '@shared/form';
import {
	skipToken,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ChallengeTemplateForm } from '../ChallengeTemplateForm/ChallengeTemplateForm';
import styles from './EditChallengeTemplate.module.scss';

export const EditChallengeTemplate = () => {
	const { id } = useParams<{ id: string }>();

	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: QUERY_KEYS.challenge.detailTemplate(id),
		queryFn: id ? () => getChallengeTemplate(id) : skipToken,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpdateChallengeTemplateDto) =>
			updateChallengeTemplate(id, data),
	});

	const challengeTemplateValues = {
		...data,
	} as UpdateChallengeTemplateDto;

	return (
		<div className={styles.create}>
			<PageWrapper title="Update Challenge Template">
				<Form<UpdateChallengeTemplateDto>
					schema={updateChallengeTemplateSchema}
					defaultValues={{
						isActive: true,
						tier: 'TIER_1',
						type: 'SLEEP_DURATION',
						generationRules: {
							durations: [1],
							metadata: {
								minDurationMinutes: [60],
							},
						},
						translations: [
							{
								language: 'en',
								title: '',
								description: '',
							},
						],
					}}
					values={challengeTemplateValues}
					onSubmit={(data) =>
						mutate(data, {
							onSuccess: () => {
								queryClient.invalidateQueries({
									queryKey: QUERY_KEYS.challenge.detailTemplate(id),
								});
								queryClient.invalidateQueries({
									queryKey: QUERY_KEYS.challenge.listsTemplates(),
								});
							},
							onError: (error) => {
								if (isAxiosError(error) && error.response?.data?.message) {
									toast.error(error.response.data.message);
									return;
								}

								toast.error('Failed to update challenge template');
							},
						})
					}
				>
					<ChallengeTemplateForm isLoading={isPending} isEditing />
				</Form>
			</PageWrapper>
		</div>
	);
};
