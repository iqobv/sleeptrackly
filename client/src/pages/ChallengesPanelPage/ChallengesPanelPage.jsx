import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
	createChallenge,
	getChallengeById,
	updateChallenge,
} from '../../api/challenges';

import { changeDocumentTitle } from '../../utils/changeDocumentTitle';

import Button from '../../components/Button/Button';
import DatePicker from '../../components/Form/DatePicker/DatePicker';
import Input from '../../components/Form/Input/Input';
import Select from '../../components/Form/Select/Select';

import styles from './ChallengesPanelPage.module.scss';

const ChallengesPanelPage = ({ isEdit = false }) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm();

	const { id } = useParams();

	const {
		data: challenge,
		isLoading: isLoadingChallenge,
		isError: isErrorChallenge,
		error: errorChallenge,
	} = useQuery({
		queryKey: ['challenge', id],
		queryFn: () => getChallengeById(id),
		enabled: isEdit && !!id,
	});

	if (isEdit && challenge?.isCompleted) {
		return <Navigate to={`/challenges/${challenge._id}`} replace />;
	}

	const {
		mutate: createNewChallenge,
		data,
		isError,
		isLoading,
	} = useMutation({
		mutationFn: (data) => createChallenge(data),
		mutationKey: ['create-challenge'],
	});

	const {
		mutate: updateChallengeData,
		data: updatedChallenge,
		isError: isErrorUpdate,
		isLoading: isLoadingUpdate,
		error: errorUpdate,
	} = useMutation({
		mutationFn: ({ challengeId, data }) => updateChallenge(challengeId, data),
		mutationKey: ['update-challenge', id],
	});

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		isEdit
			? updateChallengeData({ challengeId: id, data })
			: createNewChallenge(data);
	};

	useEffect(() => {
		changeDocumentTitle(isEdit ? 'Edit challenge' : 'Create new challenge');
	}, [isEdit]);

	useEffect(() => {
		if (data && !isLoading && !isError) navigate(`/challenges/${data._id}`);
	}, [data, isLoading, isError]);

	useEffect(() => {
		if (updatedChallenge && !isLoadingUpdate && !isErrorUpdate) {
			toast.success('Challenge updated successfully');
		} else if (isErrorUpdate && errorUpdate) {
			toast.error(errorUpdate?.message || 'Failed to update challenge');
		}
	}, [updatedChallenge, isLoadingUpdate, isErrorUpdate]);

	useEffect(() => {
		if (challenge) {
			const {
				title,
				description,
				frequency,
				startDate: { date: startDateStr },
				endDate: { date: endDateStr },
			} = challenge;

			const startDate = dayjs(startDateStr).format('YYYY-MM-DDTHH:mm');
			const endDate = dayjs(endDateStr).format('YYYY-MM-DDTHH:mm');

			reset({
				title,
				description,
				frequency,
				startDate,
				endDate,
			});
		}
	}, [challenge]);

	const shouldRender =
		!isEdit || (isEdit && !challenge?.isStarted && !challenge?.isCompleted);

	return (
		<div className={`container ${styles['challenges-panel-page']}`}>
			<h1 className={styles['page-title']}>
				{isEdit ? 'Edit challenge' : 'Create new challenge'}
			</h1>
			{isEdit && (
				<Link className={styles['to-challenge-link']} to={`/challenges/${id}`}>
					Go To Challenge
				</Link>
			)}
			<form
				className={styles['challenge-form']}
				action=""
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					fullWidth
					name="title"
					label="Title"
					control={control}
					rules={{ required: 'Title is required' }}
					placeholder="Title"
				/>
				<Input
					multiline
					fullWidth
					label="Description"
					name="description"
					control={control}
					rules={{ required: 'Description is required' }}
					placeholder="Description"
				/>
				{!isEdit && (
					<div className={styles['tasks-options']}>
						<Input
							fullWidth
							label="Value for tasks"
							name="tasksOptions.value"
							type="number"
							rules={{ min: 0, required: 'Value for tasks is required' }}
							control={control}
							placeholder="Value for tasks"
						/>
						<Input
							fullWidth
							label="Increment value"
							name="tasksOptions.increment"
							type="number"
							rules={{ min: 0, required: 'Increment value is required' }}
							control={control}
							placeholder="Increment value"
						/>
						<Input
							fullWidth
							multiline
							label="Tasks"
							name="tasksOptions.description"
							control={control}
							rules={{ required: 'Tasks description is required' }}
							placeholder="Description for tasks"
						/>
					</div>
				)}
				{shouldRender && (
					<>
						<Select
							control={control}
							label={'Frequency'}
							name={'frequency'}
							options={[
								{ label: 'Daily', value: 'daily', default: true },
								{ label: 'Weekly', value: 'weekly' },
								{ label: 'Monthly', value: 'monthly' },
							]}
							rules={{ required: 'Frequency is required' }}
							fullWidth
						/>
						<div className={styles['start-end-date']}>
							<DatePicker
								control={control}
								name="startDate"
								label="Start Date"
								fullWidth
								rules={{ required: 'Start date is required' }}
							/>
							<DatePicker
								control={control}
								name="endDate"
								label="End Date"
								fullWidth
								rules={{ required: 'End date is required' }}
							/>
						</div>
					</>
				)}
				<Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
			</form>
		</div>
	);
};

export default ChallengesPanelPage;
