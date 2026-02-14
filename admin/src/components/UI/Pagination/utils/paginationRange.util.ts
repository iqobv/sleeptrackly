export const getPaginationRange = (currentPage: number, totalPages: number) => {
	const delta = 2;
	const range = [];
	for (
		let i = Math.max(2, currentPage - delta);
		i <= Math.min(totalPages - 1, currentPage + delta);
		i++
	) {
		range.push(i);
	}

	if (currentPage - delta > 2) range.unshift('...');
	if (currentPage + delta < totalPages - 1) range.push('...');

	range.unshift(1);
	if (totalPages > 1) range.push(totalPages);

	return range;
};
