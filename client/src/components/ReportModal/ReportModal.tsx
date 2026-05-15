'use client';

import { REPORT_TITLES, REPORT_TYPES } from '@/constants';
import { Option } from '@/types';
import { Controller } from 'react-hook-form';
import { Button, Modal, SectionHeader, Select, TextField } from '../UI';
import styles from './ReportModal.module.scss';
import { REPORT_TITLES_OPTIONS } from './reportTitleOptions';
import { useReportModal } from './useReportModal';

interface ReportModalProps {
	isOpen: boolean;
	modalTitle: string;
	onClose: () => void;
	reportedId?: string;
	reportType?: (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES];
}

const ReportModal = ({
	isOpen,
	onClose,
	reportedId,
	modalTitle,
	reportType = 'USER',
}: ReportModalProps) => {
	const {
		errors,
		control,
		selectedTitle,
		setSelectedTitle,
		handleSubmit,
		onSubmit,
		register,
	} = useReportModal({ reportedId, reportType, onClose });

	return (
		<Modal isOpen={isOpen} onClose={onClose} containerClassName={styles.modal}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<SectionHeader title={modalTitle} titleComponent="h2" padding={5} />
				<input type="hidden" {...register('reportedId')} />
				<Select
					options={REPORT_TITLES_OPTIONS as Option[]}
					label="Select a report title"
					placeholder="Select a report title"
					error={
						selectedTitle?.value !== REPORT_TITLES.OTHER
							? errors.title?.message
							: ''
					}
					value={selectedTitle?.value || ''}
					onChange={(value) => {
						setSelectedTitle(
							REPORT_TITLES_OPTIONS.find((option) => option.value === value) ||
								null,
						);
					}}
				/>
				{selectedTitle?.value === REPORT_TITLES.OTHER ? (
					<TextField
						multiline
						error={errors.title?.message}
						label="Title"
						required
						{...register('title')}
					/>
				) : (
					<Controller
						name="title"
						control={control}
						render={({ field }) => <input type="hidden" {...field} readOnly />}
					/>
				)}
				<TextField
					multiline
					label="Explain your report"
					minRows={3}
					placeholder="Explain your report. Be as detailed as possible."
					{...register('description')}
				/>
				<Button type="submit">Send</Button>
			</form>
		</Modal>
	);
};

export default ReportModal;
