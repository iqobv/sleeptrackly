import dayjs from "dayjs";
import challengeService from "../services/challenge.service.js";

const createChallenge = async (req, res) => {
  const userId = req.user._id;
  const { title, description, frequency, tasksOptions, startDate, endDate } =
    req.body;

  try {
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!dayjs(startDate).isValid() || !dayjs(endDate).isValid()) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const challenge = await challengeService.createChallenge(userId, {
      title,
      description,
      frequency,
      startDate,
      tasksOptions,
      endDate,
    });

    if (!challenge) {
      return res.status(400).json({ message: "Error creating challenge" });
    }

    return res.status(200).json(challenge);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error creating challenge" });
  }
};

const getChallenges = async (req, res) => {
  const userId = req.user._id;

  try {
    const challenges = await challengeService.getChallenges(userId);

    return res.status(200).json(challenges);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error getting challenges" });
  }
};

const getChallengeById = async (req, res) => {
  const { id } = req.params;

  try {
    const challenge = await challengeService.getChallengeById(id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    return res.status(200).json(challenge);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error getting challenge" });
  }
};

const updateChallenge = async (req, res) => {
  const { id } = req.params;
  const { title, description, isStarted, isCompleted, startDate, endTime } =
    req.body;

  try {
    const challenge = await challengeService.updateChallenge(id, {
      title,
      description,
      isStarted,
      isCompleted,
      startDate,
      endTime,
    });

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    return res.status(200).json(challenge);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error updating challenge" });
  }
};

const updateTask = async (req, res) => {
  const { challengeId, taskId } = req.params;
  const { isCompleted, completedValue } = req.body;

  try {
    const task = await challengeService.updateTask(challengeId, taskId, {
      isCompleted,
      completedValue,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error updating task" });
  }
};

const deleteChallenge = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const challenge = await challengeService.deleteChallenge(id, userId);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    return res.status(200).json({ message: "Challenge deleted" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Error deleting challenge" });
  }
};

export default {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  updateTask,
  deleteChallenge,
};
