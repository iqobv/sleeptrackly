import { Schema, model } from 'mongoose';

const contentInnerSchema = new Schema(
	{
		summary: String,
		items: Array,
	},
	{ _id: false },
);

const contentSchema = new Schema(
	{
		added: { type: contentInnerSchema, default: {} },
		changes: { type: contentInnerSchema, default: {} },
		fixes: { type: contentInnerSchema, default: {} },
		removed: { type: contentInnerSchema, default: {} },
	},
	{ _id: false },
);

const changelogSchema = new Schema({
	ver: {
		type: String,
		required: true,
		unique: true,
	},
	verName: String,
	summary: String,
	content: contentSchema,
	isBeta: {
		type: Boolean,
		default: false,
	},
	isCurrent: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	isPrivate: {
		type: Boolean,
		default: false,
	},
	githubLink: String,
});

const Changelog = model('changelog', changelogSchema);

export default Changelog;
