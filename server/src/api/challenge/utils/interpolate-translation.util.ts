export const interpolateTranslation = (
	template: string,
	variables: Record<string, string | number>,
): string => {
	return template.replace(/{{(.*?)}}/g, (_, key: string) => {
		const cleanKey = String(key).trim();

		return variables[cleanKey] !== undefined
			? String(variables[cleanKey])
			: `{{${cleanKey}}}`;
	});
};
