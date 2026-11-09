import { DashboardQueryDto } from '@/dto/dashboard/dashboard.dto';
import { StrictParsersMap } from '@/types/parserMap.types';
import { appDayjs } from '@shared/utils';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const dashboardQueryParser = {
	date: parseAsString.withDefault(
		appDayjs().startOf('isoWeek').format('YYYY-MM-DD'),
	),
} satisfies StrictParsersMap<DashboardQueryDto>;

export const dashboardSearchParamsCache =
	createSearchParamsCache(dashboardQueryParser);
