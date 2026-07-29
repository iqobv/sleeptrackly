'use client';

import { createChallengeTemplate } from '@/api/challenge/templates/createChallengeTemplate.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { createChallengeTemplateSchema } from '@/schemas/challenge/templates/createChallengeTemplate.schema';
import { Form } from '@shared/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ChallengeTemplateForm } from '../ChallengeTemplateForm/ChallengeTemplateForm';
import styles from './CreateChallengeTemplate.module.scss';

export const CreateChallengeTemplate = () => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: CreateChallengeTemplateDto) =>
			createChallengeTemplate(data),
	});

	return (
		<div className={styles.create}>
			<PageWrapper title="Create Challenge Template">
				<Form<CreateChallengeTemplateDto>
					schema={createChallengeTemplateSchema}
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
					onSubmit={(data) =>
						mutate(data, {
							onSuccess: (data) => {
								queryClient.invalidateQueries({
									queryKey: QUERY_KEYS.challenge.listsTemplates(),
								});

								router.push(PAGES.CHALLENGE_TEMPLATE(data.id));
							},
							onError: (error) => {
								if (isAxiosError(error) && error.response?.data?.message) {
									toast.error(error.response.data.message);
									return;
								}

								toast.error('Failed to create challenge template');
							},
						})
					}
				>
					<ChallengeTemplateForm isLoading={isPending} isEditing={false} />
				</Form>
			</PageWrapper>
		</div>
	);
};
