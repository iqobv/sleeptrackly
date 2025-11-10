export const generateUsername = (): string => {
	const numbers = Array.from({ length: 8 }, () =>
		Math.floor(Math.random() * 10),
	);

	const username = `user${numbers.join('')}`;

	return username;
};
