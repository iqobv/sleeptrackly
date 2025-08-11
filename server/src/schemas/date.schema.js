import { Schema } from 'mongoose';
import dayjs from 'dayjs';

export const dateSchema = new Schema(
	{
		localeDate: {
			type: String,
			default: () => dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
		},
		date: { type: Date, default: Date.now },
	},
	{ _id: false },
);
