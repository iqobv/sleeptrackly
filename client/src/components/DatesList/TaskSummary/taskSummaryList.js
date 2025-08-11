const Item = (name, label, value) => ({
	name,
	label,
	value,
});

export const taskSummaryItems = (data) => [
	Item('description', 'Description', data?.description || ''),
	Item('target-value', 'Target value', data?.targetValue || ''),
	Item('your-completed-value', 'Your completed value', data?.targetValue || ''),
	Item('status', 'Status', data?.isCompleted ? 'Yes' : 'No'),
];
