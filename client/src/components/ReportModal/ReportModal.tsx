'use client';

import { REPORT_TYPES } from '@/constants';
import { Option } from '@/types';
import { MdReportGmailerrorred } from 'react-icons/md';
import {
	Button,
	Field,
	FormSelect,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
	SelectContent,
	SelectItem,
	Textarea,
} from '../UI';
import styles from './ReportModal.module.scss';
import { REPORT_TITLES_OPTIONS } from './reportTitleOptions';
import { useReportModal } from './useReportModal';

interface ReportModalProps {
	reportedId?: string;
	reportType?: (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES];
}

const ReportModal = ({ reportedId, reportType = 'USER' }: ReportModalProps) => {
	const {
		isOpen,
		handleOpenChange,
		errors,
		control,
		isOtherTitle,
		handleSubmit,
		onSubmit,
		register,
	} = useReportModal({ reportedId, reportType });

	return (
		<Modal open={isOpen} onOpenChange={handleOpenChange}>
			<ModalTrigger asChild>
				<Button
					isIcon
					size="sm"
					variant="contained"
					color="secondary"
					title="Send Report"
				>
					<MdReportGmailerrorred size={30} />
				</Button>
			</ModalTrigger>
			<ModalContent className={styles.modal} description="Report User">
				<ModalHeader>Report User</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<input type="hidden" {...register('reportedId')} />
						<Field
							label="Report Title"
							error={!isOtherTitle ? errors.title?.message : ''}
							required
						>
							<FormSelect
								name="title"
								control={control}
								placeholder="Select a report title"
								displayFormat={(val) => {
									const option = REPORT_TITLES_OPTIONS.find(
										(opt) => opt.value === val,
									);
									return option ? option.label : '';
								}}
							>
								<SelectContent>
									{REPORT_TITLES_OPTIONS.map((option: Option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</FormSelect>
						</Field>
						{isOtherTitle && (
							<Field
								label="Custom Title"
								error={errors.customTitle?.message}
								required
							>
								<Textarea
									placeholder="Enter title"
									{...register('customTitle')}
								/>
							</Field>
						)}
						<Field label="Description" error={errors.description?.message}>
							<Textarea
								minRows={3}
								placeholder="Explain your report. Be as detailed as possible."
								{...register('description')}
							/>
						</Field>
						<Button type="submit">Send</Button>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ReportModal;
