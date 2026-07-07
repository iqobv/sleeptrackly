import { DashboardQueryDto } from '@/dto/dashboard/dashboard.dto';
import { StrictParsersMap } from '@/types/parserMap.types';
import dayjs from 'dayjs';
import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const dashboardQueryParser = {
	date: parseAsString.withDefault(
		dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
	),
} satisfies StrictParsersMap<DashboardQueryDto>;

export const dashboardSearchParamsCache =
	createSearchParamsCache(dashboardQueryParser);
