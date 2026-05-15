import { SendReportDto } from '@/dto';
import { apiClient } from '../axios';

export const sendReport = async (dto: SendReportDto) =>
	(await apiClient.post('/v1/reports/send', dto)).data;
