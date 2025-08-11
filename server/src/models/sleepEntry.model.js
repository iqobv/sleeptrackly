import { Schema, model } from 'mongoose';

import { dateSchema } from '../schemas/date.schema.js';

const sleepEntrySchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	sleepStart: dateSchema,
	sleepEnd: dateSchema,
	sleepDuration: {
		type: Number,
		required: true,
	},
	dateForChart: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const SleepEntry = model('sleepEntry', sleepEntrySchema);

export default SleepEntry;
