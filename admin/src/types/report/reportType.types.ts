import { components } from '../schema';

type SwaggerReportType = components['schemas']['ReportType'];

export const ReportType = {
	USER: 'USER',
} as const satisfies Record<SwaggerReportType, SwaggerReportType>;

export type ReportType = (typeof ReportType)[keyof typeof ReportType];
