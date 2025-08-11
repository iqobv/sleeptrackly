import { Schema, model } from 'mongoose';

const dateSchema = new Schema(
	{
		localeDate: {
			type: String,
			default: () => dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
		},
		date: { type: Date, default: Date.now },
	},
	{ _id: false },
);

const userSleepStatusSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	isSleeping: {
		type: Boolean,
		default: false,
	},
	sleepStart: dateSchema,
});

const UserSleepStatus = model('userSleepStatus', userSleepStatusSchema);

export default UserSleepStatus;
