import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		sparse: true,
	},
	email: {
		type: String,
		unique: true,
		sparse: true,
	},
	password: String,
	googleId: String,
	dateOfRegistration: {
		type: Date,
		default: Date.now,
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
});

const User = model('user', userSchema);

export default User;
