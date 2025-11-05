import { SendReportDto } from '@/dto';
import { fetcher } from '@/utils';

export const sendReport = async (dto: SendReportDto) =>
	await fetcher('/api/v1/reports/send', {
		method: 'POST',
		body: JSON.stringify({ ...dto }),
	});
