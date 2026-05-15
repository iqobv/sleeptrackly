import { REPORT_TITLES } from '@/constants';
import { Option } from '@/types';

interface ReportTitleOption extends Option {
	value: (typeof REPORT_TITLES)[keyof typeof REPORT_TITLES];
}

export const REPORT_TITLES_OPTIONS: ReportTitleOption[] = [
	{
		value: REPORT_TITLES.AVATAR,
		label: "User avatar isn't appropriate or offensive",
	},
	{
		value: REPORT_TITLES.USERNAME,
		label: "User name isn't appropriate or offensive",
	},
	{
		value: REPORT_TITLES.OTHER,
		label: 'Other',
	},
];
