export const getFormData = <T extends Record<string, unknown>>(
	data: T,
): FormData => {
	const formData = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		if (value instanceof File || typeof value === 'string') {
			formData.append(key, value);
		} else if (value !== undefined && value !== null) {
			formData.append(key, JSON.stringify(value));
		}
	});

	return formData;
};
