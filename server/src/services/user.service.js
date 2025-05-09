import User from "../models/user.model.js";
import UserSleepStatus from "../models/userSleepStatus.model.js";

import { hashPassword } from "../utils/hashPassword.js";

const createUser = async (data) => {
  const { username, email, password, googleId } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) return { error: true, message: "User already exists" };

  const countOfUsers = await User.countDocuments();

  const hashedPassword = await hashPassword(password);

  const role = countOfUsers === 0 ? "admin" : "user";

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

export default { createUser };
