'use client';

import { bulkCreateChallengeTemplates } from '@/api/challenge/templates/bulkCreateChallengeTemplates.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { BulkCreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { bulkCreateChallengeTemplatesSchema } from '@/schemas/challenge/templates/bulkCreateChallengeTemplate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Textarea, Typography } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
	FormProvider,
	Resolver,
	useFieldArray,
	useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { CHALLENGE_TEMPLATE_DEFAULT_VALUES } from '../ChallengeTemplateForm/challengeTemplateDefaultValues';
import { ChallengeTemplateForm } from '../ChallengeTemplateForm/ChallengeTemplateForm';

export const BulkCreateChallengeTemplates = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const [viewMode, setViewMode] = useState<'json' | 'form'>('form');
	const [rawJson, setRawJson] = useState<string>('');
	const [jsonError, setJsonError] = useState<string | null>(null);

	const methods = useForm<BulkCreateChallengeTemplateDto>({
		resolver: zodResolver(
			bulkCreateChallengeTemplatesSchema,
		) as unknown as Resolver<BulkCreateChallengeTemplateDto>,
		defaultValues: {
			templates: [{ ...CHALLENGE_TEMPLATE_DEFAULT_VALUES, isActive: true }],
		},
	});

	const { control, handleSubmit, reset, getValues } = methods;
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'templates',
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: BulkCreateChallengeTemplateDto) =>
			bulkCreateChallengeTemplates(data),
	});

	const handleToggleView = (): void => {
		if (viewMode === 'form') {
			setRawJson(JSON.stringify(getValues().templates, null, 2));
			setJsonError(null);
			setViewMode('json');
			return;
		}

		try {
			const parsed: unknown = JSON.parse(rawJson);
			const payload = { templates: parsed };
			const result = bulkCreateChallengeTemplatesSchema.safeParse(payload);

			if (!result.success) {
				setJsonError(
					'Invalid JSON structure according to schema requirements.',
				);
				return;
			}

			reset(result.data);
			setJsonError(null);
			setViewMode('form');
		} catch {
			setJsonError('Invalid JSON syntax. Please fix errors before switching.');
		}
	};

	const onSubmit = (data: BulkCreateChallengeTemplateDto): void => {
		let payload = data;

		if (viewMode === 'json') {
			try {
				const parsed: unknown = JSON.parse(rawJson);
				const payloadToValidate = { templates: parsed };
				const result =
					bulkCreateChallengeTemplatesSchema.safeParse(payloadToValidate);

				if (!result.success) {
					const errorMessage = result.error.issues
						.map((err) => `${err.path.join('.')}: ${err.message}`)
						.join('\n');

					setJsonError(`Schema validation failed:\n${errorMessage}`);
					return;
				}

				payload = result.data;
				reset(payload);
			} catch {
				setJsonError('Invalid JSON syntax.');
				return;
			}
		}

		mutate(payload, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.challenge.listsTemplates(),
				});
				toast.success('Templates created successfully!');
				router.push(PAGES.CHALLENGE_TEMPLATES);
			},
			onError: (error: unknown) => {
				if (isAxiosError(error) && error.response?.data?.message) {
					toast.error(error.response.data.message);
					return;
				}
				toast.error('Failed to create challenge templates');
			},
		});
	};

	return (
		<PageWrapper title="Bulk Create Challenge Templates">
			<div style={{ marginBottom: '1rem' }}>
				<Button color="secondary" size="sm" onClick={handleToggleView}>
					{viewMode === 'form' ? 'Switch to JSON View' : 'Switch to Form View'}
				</Button>
			</div>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{viewMode === 'form' ? (
						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
						>
							{fields.map((field, index) => (
								<div
									key={field.id}
									style={{
										border: '1px solid #ccc',
										padding: '1rem',
										borderRadius: '8px',
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginBottom: '1rem',
										}}
									>
										<Typography variant="h3">Template #{index + 1}</Typography>
										{fields.length > 1 && (
											<Button
												type="button"
												color="danger"
												size="sm"
												onClick={() => remove(index)}
											>
												Remove
											</Button>
										)}
									</div>
									<ChallengeTemplateForm
										isLoading={isPending}
										isEditing={false}
										index={index}
										isBulk={true}
									/>
								</div>
							))}

							<div style={{ display: 'flex', gap: '1rem' }}>
								<Button
									type="button"
									color="secondary"
									onClick={() =>
										append({
											...CHALLENGE_TEMPLATE_DEFAULT_VALUES,
											isActive: true,
										} as BulkCreateChallengeTemplateDto['templates'][number])
									}
								>
									Add Template
								</Button>
								<Button type="submit" disabled={isPending}>
									{isPending ? 'Creating...' : 'Submit All'}
								</Button>
							</div>
						</div>
					) : (
						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
						>
							{jsonError && (
								<Typography
									as="pre"
									color="error"
									style={{ whiteSpace: 'pre-wrap' }}
								>
									{jsonError}
								</Typography>
							)}
							<Textarea
								value={rawJson}
								onChange={(e) => setRawJson(e.target.value)}
								rows={25}
							/>
							<Button type="submit" disabled={isPending}>
								{isPending ? 'Creating...' : 'Submit JSON'}
							</Button>
						</div>
					)}
				</form>
			</FormProvider>
		</PageWrapper>
	);
};
