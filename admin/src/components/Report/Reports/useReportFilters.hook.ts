'use client';

import {
	ReportPaginationQuery,
	ReportStatus,
	ReportType,
	SortBy,
	SortOrder,
} from '@/types';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';

type StrictParsersMap<T> = Record<keyof Required<T>, unknown>;

const reportTypeValues = Object.values(ReportType);
const reportStatusValues = Object.values(ReportStatus);
const sortByValues = Object.values(SortBy);
const sortOrderValues = Object.values(SortOrder);

export const reportFilterParsers = {
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(10),
	reportType: parseAsStringEnum(reportTypeValues).withDefault('USER'),
	sortBy: parseAsStringEnum(sortByValues).withDefault('createdAt'),
	sortOrder: parseAsStringEnum(sortOrderValues).withDefault('desc'),
	status: parseAsStringEnum(reportStatusValues).withDefault('PENDING'),
} satisfies StrictParsersMap<ReportPaginationQuery>;

export const useReportFilters = () => {
	return useQueryStates(reportFilterParsers);
};
