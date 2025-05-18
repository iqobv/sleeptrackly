import changelogService from "../services/changelog.service.js";

const getAllVersions = async (req, res) => {
  try {
    const versions = await changelogService.getAllVersions();

    return res.status(200).json(versions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getChangelogByVer = async (req, res) => {
  const { ver } = req.params;

  try {
    const changelog = await changelogService.getChangelogByVer(ver);

    return res.status(200).json(changelog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createChangelog = async (req, res) => {
  const { ver, verName, summary, content, isBeta, isCurrent } = req.body;

  try {
    const changelog = await changelogService.createChangelog({
      ver,
      summary,
      content,
      isBeta,
      isCurrent,
      verName,
    });

    return res.status(201).json(changelog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateChangelog = async (req, res) => {
  const { ver, verName, summary, content, isBeta, isCurrent } = req.body;
  const { id } = req.params;

  try {
    const changelog = await changelogService.updateChangelog(id, {
      ver,
      summary,
      content,
      isBeta,
      isCurrent,
    });

    return res.status(200).json(changelog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteChangelog = async (req, res) => {
  const { id } = req.params;

  try {
    await changelogService.deleteChangelog(id);

    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  getAllVersions,
  getChangelogByVer,
  createChangelog,
  updateChangelog,
  deleteChangelog,
};
