import userSleepStatusService from "../services/userSleepStatus.service.js";

const getSleepStatus = async (req, res) => {
  const { _id: userId } = req?.user;

  try {
    const userSleepStatus = await userSleepStatusService.getSleepStatus(userId);

    if (!userSleepStatus)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json(userSleepStatus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSleepStatus = async (req, res) => {
  const { _id: userId } = req?.user;
  const { clickedBy } = req.body;

  try {
    const userSleepStatus = await userSleepStatusService.updateSleepStatus(
      userId,
      clickedBy
    );

    return res.status(200).json(userSleepStatus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { getSleepStatus, updateSleepStatus };
