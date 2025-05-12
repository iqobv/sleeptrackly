import sleepEntryService from "../services/sleepEntry.service.js";

const getSleepsEntryForWeek = async (req, res) => {
  const { _id: userId } = req.user;
  const { week = 0 } = req.query;

  try {
    const sleepEntries = await sleepEntryService.getSleepsEntryForWeek(userId, {
      week,
    });

    return res.status(200).json(sleepEntries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default { getSleepsEntryForWeek };
