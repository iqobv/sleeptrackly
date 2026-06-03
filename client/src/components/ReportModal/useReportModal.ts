import { sendReport } from '@/api';
import { QUERY_KEYS } from '@/config';
import { REPORT_TITLES } from '@/constants';
import { SendReportDto, SendReportFormValues } from '@/dto';
import { sendReportSchema } from '@/schemas';
import { ReportType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ReportModalProps {
	reportedId?: string;
	reportType?: ReportType;
}

export const useReportModal = ({
	reportedId,
	reportType,
}: ReportModalProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SendReportFormValues, unknown, SendReportDto>({
		resolver: zodResolver(sendReportSchema),
		defaultValues: {
			reportedId: reportedId || '',
			title: '',
			customTitle: '',
			description: '',
			reportType: reportType || ReportType.USER,
		},
	});

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			reset();
		}
	};

	const selectedTitle = useWatch({
		control,
		name: 'title',
	});

	const isOtherTitle = selectedTitle === REPORT_TITLES.OTHER;

	const { mutate } = useMutation({
		mutationFn: (data: SendReportDto) => sendReport(data),
		mutationKey: QUERY_KEYS.report.send,
		onSuccess: () => {
			toast.success('Report sent');
			handleOpenChange(false);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = (data: SendReportDto) => mutate(data);

	return {
		isOpen,
		handleOpenChange,
		errors,
		control,
		isOtherTitle,
		handleSubmit,
		onSubmit,
		register,
	};
};
