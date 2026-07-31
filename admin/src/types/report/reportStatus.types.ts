import { components } from '@shared/types';

type SwaggerReportStatus = components['schemas']['ReportStatus'];

export const ReportStatus = {
	PENDING: 'PENDING',
	IN_PROGRESS: 'IN_PROGRESS',
	APPROVED: 'APPROVED',
	REJECTED: 'REJECTED',
} as const satisfies Record<SwaggerReportStatus, SwaggerReportStatus>;

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];
