'use client';

import { ChallengeTemplate } from '@/types/challenge/challenge.types';
import {
	getCoreRowModel,
	Table,
	useTablePagination,
	useTableSorting,
} from '@shared/tables';
import { Pagination } from '@shared/ui';
import { useChallengeTemplatesFilters } from '../useChallengeTemplatesFilters.hook';
import { CHALLENGE_TEMPLATES_TABLE_COLUMNS } from './challengeTemplatesTableColumns';

interface ChallengeTemplatesTableProps {
	templates: ChallengeTemplate[];
	totalPages: number;
}

export const ChallengeTemplatesTable = ({
	templates,
	totalPages,
}: ChallengeTemplatesTableProps) => {
	const [{ sortBy, sortOrder, page, limit }, setFilters] =
		useChallengeTemplatesFilters();

	const { pagination, handlePaginationChange } = useTablePagination({
		limit,
		page,
		setFilters,
		totalPages,
	});

	const { sorting, handleSortingChange } = useTableSorting({
		setFilters,
		sortBy,
		sortOrder,
	});

	return (
		<>
			<Table
				columns={CHALLENGE_TEMPLATES_TABLE_COLUMNS}
				data={templates}
				manualPagination
				manualSorting
				state={{
					pagination,
					sorting,
				}}
				onPaginationChange={handlePaginationChange}
				onSortingChange={handleSortingChange}
				pageCount={totalPages}
				getCoreRowModel={getCoreRowModel()}
			/>
			<Pagination
				currentPage={page + 1}
				onPageChange={(newPage) => setFilters({ page: newPage - 1 })}
				totalPages={totalPages}
			/>
		</>
	);
};
