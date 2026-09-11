import { components } from '@shared/types';

type SwaggerReportType = components['schemas']['ReportType'];

export const ReportType = {
	USER: 'USER',
} as const satisfies Record<SwaggerReportType, SwaggerReportType>;

export type ReportType = (typeof ReportType)[keyof typeof ReportType];
