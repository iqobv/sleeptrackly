'use client';

import { REPORT_TITLES, REPORT_TYPES } from '@/constants';
import { Option } from '@/types';
import { Controller } from 'react-hook-form';
import { MdReportGmailerrorred } from 'react-icons/md';
import { Button, Modal, Select, TextField } from '../UI';
import styles from './ReportModal.module.scss';
import { REPORT_TITLES_OPTIONS } from './reportTitleOptions';
import { useReportModal } from './useReportModal';

interface ReportModalProps {
	reportedId?: string;
	reportType?: (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES];
}

const ReportModal = ({ reportedId, reportType = 'USER' }: ReportModalProps) => {
	const {
		errors,
		control,
		selectedTitle,
		setSelectedTitle,
		handleSubmit,
		onSubmit,
		register,
	} = useReportModal({ reportedId, reportType });

	return (
		<Modal>
			<Modal.Trigger asChild>
				<Button
					isIcon
					size="sm"
					variant="contained"
					color="secondary"
					title="Send Report"
				>
					<MdReportGmailerrorred size={30} />
				</Button>
			</Modal.Trigger>
			<Modal.Content className={styles.modal} description="Report User">
				<Modal.Header>Report User</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
									REPORT_TITLES_OPTIONS.find(
										(option) => option.value === value,
									) || null,
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
								render={({ field }) => (
									<input type="hidden" {...field} readOnly />
								)}
							/>
						)}
						<TextField
							multiline
							label="Explain your report"
							minRows={3}
							placeholder="Explain your report. Be as detailed as possible."
							{...register('description')}
						/>
						<Modal.Close asChild>
							<Button type="submit">Send</Button>
						</Modal.Close>
					</form>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default ReportModal;
