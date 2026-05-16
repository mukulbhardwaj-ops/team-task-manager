const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { createProject, getProjects, deleteProject } = require("../controllers/projectController");

router.get("/", auth, getProjects);
router.post("/", auth, role("ADMIN"), createProject);
router.delete("/:id", auth, role("ADMIN"), deleteProject);

module.exports = router;
