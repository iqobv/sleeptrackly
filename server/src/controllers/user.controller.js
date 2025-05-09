import userService from "../services/user.service.js";

const createUser = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userService.getUserById(userId)

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { createUser, getUserById };
