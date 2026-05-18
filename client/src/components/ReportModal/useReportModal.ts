import { sendReport } from '@/api';
import { QUERY_KEYS } from '@/config';
import { REPORT_TITLES, REPORT_TYPES } from '@/constants';
import { SendReportDto } from '@/dto';
import { sendReportSchema } from '@/schemas';
import { Option } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ReportModalProps {
	reportedId?: string;
	reportType?: (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES];
}

export const useReportModal = ({
	reportedId,
	reportType,
}: ReportModalProps) => {
	const [selectedTitle, setSelectedTitle] = useState<Option | null>(null);

	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<SendReportDto>({
		resolver: zodResolver(sendReportSchema),
		defaultValues: {
			reportedId: reportedId || '',
			title: '',
			description: '',
			reportType: reportType || REPORT_TYPES.USER,
		},
	});

	const { mutate } = useMutation({
		mutationFn: (data: SendReportDto) => sendReport(data),
		mutationKey: QUERY_KEYS.report.send,
		onSuccess: () => {
			toast.success('Report sent');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = (data: SendReportDto) => mutate(data);

	useEffect(() => {
		setValue(
			'title',
			selectedTitle?.value === REPORT_TITLES.OTHER
				? ''
				: selectedTitle?.label || '',
		);
	}, [selectedTitle, setValue]);

	return {
		errors,
		selectedTitle,
		control,
		setSelectedTitle,
		handleSubmit,
		onSubmit,
		register,
	};
};
