'use client';

import { getChallengeTemplate } from '@/api/challenge/templates/getChallengeTemplate.api';
import { updateChallengeTemplate } from '@/api/challenge/templates/updateChallengeTemplate.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
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
import { CHALLENGE_TEMPLATE_DEFAULT_VALUES } from '../ChallengeTemplateForm/challengeTemplateDefaultValues';
import { ChallengeTemplateForm } from '../ChallengeTemplateForm/ChallengeTemplateForm';
import { DeleteChallengeTemplate } from '../DeleteChallengeTemplate/DeleteChallengeTemplate';
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
			<PageWrapper
				title="Update Challenge Template"
				customRightSlot={
					<DeleteChallengeTemplate id={id} href={PAGES.CHALLENGE_TEMPLATES} />
				}
			>
				<Form<UpdateChallengeTemplateDto>
					schema={updateChallengeTemplateSchema}
					defaultValues={CHALLENGE_TEMPLATE_DEFAULT_VALUES}
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
