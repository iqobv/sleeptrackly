export const pickTranslation = <T extends { language: string }>(
	translations: T[],
	language: string,
): T | null => {
	return (
		translations.find((t) => t.language === language) ||
		translations.find((t) => t.language === 'en') ||
		translations[0] ||
		null
	);
};
