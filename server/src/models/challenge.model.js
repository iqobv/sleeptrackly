import { Schema, model } from 'mongoose';

import { dateSchema } from '../schemas/date.schema.js';
import { taskItemSchema } from '../schemas/taskItem.schema.js';

const challengeSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	frequency: {
		type: String,
		required: true,
		enum: ['daily', 'weekly', 'monthly', 'once'],
		default: 'daily',
	},
	tasks: [taskItemSchema],
	startDate: dateSchema,
	endDate: dateSchema,
	isStarted: {
		type: Boolean,
		default: false,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Challenge = model('challenge', challengeSchema);

export default Challenge;
