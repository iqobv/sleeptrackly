import { REPORT_TITLES_OPTIONS } from '@/components/ReportModal/reportTitleOptions';
import { REPORT_TITLES } from '@/constants/reportTitle.constats';
import { ReportType } from '@/types/report/reportType.types';
import { z } from 'zod';

export const sendReportSchema = z
	.object({
		title: z.string().min(1, { message: 'Title is required' }),
		customTitle: z.string().optional(),
		description: z.string().optional(),
		reportType: z.enum(ReportType, { error: 'Report type is required' }),
		reportedId: z.string().min(1, { message: 'Reported ID is required' }),
	})
	.superRefine((data, ctx) => {
		if (data.title === REPORT_TITLES.OTHER) {
			if (!data.customTitle || data.customTitle.length < 3) {
				ctx.addIssue({
					code: 'custom',
					path: ['customTitle'],
					message: 'Title must be at least 3 characters',
				});
			}
		}
	})
	.transform((data) => {
		const { customTitle, ...rest } = data;

		let finalTitle = rest.title;

		if (rest.title === REPORT_TITLES.OTHER) {
			finalTitle = customTitle as string;
		} else {
			const option = REPORT_TITLES_OPTIONS.find(
				(opt) => opt.value === rest.title,
			);
			if (option) {
				finalTitle = option.label;
			}
		}

		return {
			...rest,
			title: finalTitle,
		};
	});
