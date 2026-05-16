const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.get("/", auth, getTasks);
router.post("/", auth, role("ADMIN"), createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, role("ADMIN"), deleteTask);

module.exports = router;