'use client';

import { Challenge } from '@/types/challenge/challenge.types';
import {
	getCoreRowModel,
	Table,
	useTablePagination,
	useTableSorting,
} from '@shared/tables';
import { Pagination } from '@shared/ui';
import { useChallengeFilters } from '../useChallengeFilters.hook';
import { CHALLENGES_TABLE_COLUMNS } from './challengesTableColumns';

interface ChallengesTableProps {
	challenges: Challenge[];
	totalPages: number;
}

export const ChallengesTable = ({
	challenges,
	totalPages,
}: ChallengesTableProps) => {
	const [{ sortBy, sortOrder, page, limit }, setFilters] =
		useChallengeFilters();

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
				columns={CHALLENGES_TABLE_COLUMNS}
				data={challenges}
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
