import createError from 'http-errors';
import bcrypt from 'bcrypt';

import User from '../models/user.model.js';
import UserSleepStatus from '../models/userSleepStatus.model.js';

import { hashPassword } from '../utils/hashPassword.js';

const createUser = async (data) => {
	const { username, email, password, googleId } = data;

	const existingUser = await User.findOne({ email });

	if (existingUser) return { error: true, message: 'User already exists' };

	const countOfUsers = await User.countDocuments();

	const hashedPassword = await hashPassword(password);

	const role = countOfUsers === 0 ? 'admin' : 'user';

	const user = await User.create({
		username,
		email,
		password: hashedPassword,
		googleId,
		role,
	});

	if (user) {
		await UserSleepStatus.create({ userId: user._id });
	}

	return user;
};

const getUserById = async (id) => {
	const user = await User.findById(id).select('-password');

	return user;
};

const getUserProfile = async (username) => {
	const user = await User.findOne({ username })
		.select('-password')
		.select('-email')
		.select('-googleId')
		.select('-_id');

	return user;
};

const updateUser = async (id, data) => {
	const user = await User.findByIdAndUpdate(id, data, { new: true });

	return user;
};

const updatePassword = async (userId, password) => {
	const user = await User.findById(userId);

	if (user) {
		const passwordIsMatched = await bcrypt.compare(password, user.password);

		if (passwordIsMatched) throw createError(400, 'New password is the same');

		const hashedPassword = await hashPassword(password);

		user.password = hashedPassword;
		await user.save();
	}

	return user;
};

export default {
	createUser,
	getUserById,
	getUserProfile,
	updateUser,
	updatePassword,
};
