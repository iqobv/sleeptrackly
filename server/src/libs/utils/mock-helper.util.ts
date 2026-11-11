export const partialMock = <T>(data: Partial<T>): T => {
	return data as T;
};
