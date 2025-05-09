import userSleepStatusService from "../services/userSleepStatus.service.js";

// userSleepStatusService.getSleepStatus(), userSleepStatusService.updateSleepStatus()

const getSleepStatus = async (req, res) => {
  const { userId } = req.params;

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
  const { userId } = req.params;

  console.log(userId);

  try {
    const userSleepStatus = await userSleepStatusService.updateSleepStatus(
      userId
    );

    console.log(userSleepStatus);

    return res.status(200).json(userSleepStatus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { getSleepStatus, updateSleepStatus };
