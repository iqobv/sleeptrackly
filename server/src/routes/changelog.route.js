import { Router } from "express";
import changelogController from "../controllers/changelog.controller.js";

const router = Router();

router.get("/all-versions", changelogController.getAllVersions);
router.get("/ver/:ver", changelogController.getChangelogByVer);

router.post("/", changelogController.createChangelog);

router.patch("/:id", changelogController.updateChangelog);

router.delete("/:id", changelogController.deleteChangelog);

export default router;
