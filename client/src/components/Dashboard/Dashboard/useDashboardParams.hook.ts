'use client';

import { useQueryStates } from 'nuqs';
import { dashboardQueryParser } from './dashboard.searchParams';

export const useDashboardParams = () => {
	return useQueryStates(dashboardQueryParser);
};
