import Changelog from "../models/changelog.model.js";

const getAllVersions = async () => {
  const changelogs = await Changelog.find();

  const versions = {
    versions: [],
    currentVersions: {},
  };

  versions.versions = changelogs.map((changelog) => ({
    id: changelog._id,
    ver: changelog.ver,
  }));

  versions.currentVersions =
    changelogs.filter((changelog) => changelog.isCurrent)[0] || {};

  return versions;
};

const getChangelogByVer = async (ver) => {
  const changelog = await Changelog.findOne({ ver });

  return changelog;
};

const createChangelog = async (data) => {
  const { ver, verName, summary, content, isBeta, isCurrent } = data;

  const existingCurrentChangelog = await Changelog.findOne({ isCurrent: true });

  let isActive = false;

  if (isCurrent) {
    if (existingCurrentChangelog) {
      await Changelog.findByIdAndUpdate(existingCurrentChangelog._id, {
        isCurrent: false,
      });
    }
    isActive = true;
  } else if (!existingCurrentChangelog) {
    isActive = true;
  }

  const changelog = await Changelog.create({
    ver,
    summary,
    content,
    isBeta,
    isCurrent: isActive,
    verName,
  });

  return changelog;
};

const updateChangelog = async (id, data) => {
  const { ver, summary, content, isBeta, isCurrent } = data;

  let isActive = false;

  if (isCurrent) {
    const existingCurrentChangelog = await Changelog.findOne({
      isCurrent: true,
    });

    if (
      existingCurrentChangelog &&
      existingCurrentChangelog._id.toString() !== id
    ) {
      await Changelog.findByIdAndUpdate(existingCurrentChangelog._id, {
        isCurrent: false,
      });
    }

    isActive = true;
  }

  const changelog = await Changelog.findByIdAndUpdate(
    id,
    {
      ver,
      summary,
      content,
      isBeta,
      isCurrent: isActive,
    },
    { new: true }
  );

  return changelog;
};

const deleteChangelog = async (id) => {
  const changelogToDelete = await Changelog.findById(id);

  if (!changelogToDelete) return;

  const wasCurrent = changelogToDelete.isCurrent;

  await Changelog.findByIdAndDelete(id);

  if (wasCurrent) {
    const latestChangelog = await Changelog.findOne().sort({ createdAt: -1 });

    if (latestChangelog) {
      await Changelog.findByIdAndUpdate(latestChangelog._id, {
        isCurrent: true,
      });
    }
  }
};

export default {
  getAllVersions,
  getChangelogByVer,
  createChangelog,
  updateChangelog,
  deleteChangelog,
};
