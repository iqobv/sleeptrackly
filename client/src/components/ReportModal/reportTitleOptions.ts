import { REPORT_TITLES } from '@/constants';
import { IOption } from '@/types';

interface IReportTitleOption extends IOption {
	value: (typeof REPORT_TITLES)[keyof typeof REPORT_TITLES];
}

export const REPORT_TITLES_OPTIONS: IReportTitleOption[] = [
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
