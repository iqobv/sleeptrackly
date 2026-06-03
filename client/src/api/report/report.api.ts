import { SendReportDto } from '@/dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type SendReportResponse =
	paths['/v1/reports/send']['post']['responses']['200']['content']['application/json'];

export const sendReport = async (dto: SendReportDto) =>
	(await apiClient.post<SendReportResponse>('/v1/reports/send', dto)).data;
