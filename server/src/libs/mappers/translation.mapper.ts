export const mapTranslation = <T extends { language: string }>(
	items: T[],
	language: string,
): T | undefined => {
	return (
		items.find((t) => t.language === language) ||
		items.find((t) => t.language === 'en')
	);
};
