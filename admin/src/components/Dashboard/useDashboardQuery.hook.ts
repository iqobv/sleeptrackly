import { DashboardQueryDto } from '@/dto/dashboard/dashboard.dto';
import { StrictParsersMap } from '@/types/parserMap.types';
import { Platform } from '@shared/types';
import { appDayjs } from '@shared/utils';
import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

const platformValues = Object.values(Platform);

export const dashboardQueryParser = {
	date: parseAsString.withDefault(
		appDayjs().startOf('isoWeek').format('YYYY-MM-DD'),
	),
	platform: parseAsStringEnum(platformValues),
} satisfies StrictParsersMap<DashboardQueryDto>;

export const useDashboardQuery = () => {
	return useQueryStates(dashboardQueryParser);
};
