import userService from "../services/user.service.js";

const createUser = async (req, res, next) => {
  const { username, email, password, googleId } = req.body;

  try {
    const user = await userService.createUser({
      username,
      email,
      password,
      googleId,
    });

    if (user.error) {
      return res.status(400).json({ message: user.message });
    }

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.getUserById(userId);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await userService.getUserProfile(username);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  const { username, email } = req.body;

  try {
    const user = await userService.updateUser(userId, { username, email });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const userId = req.user._id;
  const { password } = req.body;

  try {
    const user = await userService.updatePassword(userId, password);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getUserById,
  getUserProfile,
  updateUser,
  updatePassword,
};
