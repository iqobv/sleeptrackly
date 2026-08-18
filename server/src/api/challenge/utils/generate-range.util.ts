import dayjs from 'dayjs';

interface GeneratedRange {
	availableFrom: Date;
	availableTo: Date;
}

export const generateRange = (): GeneratedRange => {
	const availableFrom = dayjs()
		.add(1, 'day')
		.hour(3)
		.minute(0)
		.second(0)
		.millisecond(0)
		.toDate();

	const availableTo = dayjs(availableFrom).add(7, 'day').toDate();

	return { availableFrom, availableTo };
};
