import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt();

	const hash = await bcrypt.hash(password, salt);

	return hash;
};

export const comparePassword = async (
	password: string,
	hash: string,
): Promise<boolean> => bcrypt.compare(password, hash);
