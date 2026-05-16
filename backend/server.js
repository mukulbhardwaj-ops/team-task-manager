const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/api/dashboard", async (req, res) => {
    try {
        const total = await prisma.task.count();
        const completed = await prisma.task.count({ where: { status: "DONE" } });
        const inProgress = await prisma.task.count({ where: { status: "IN_PROGRESS" } });
        const overdue = await prisma.task.count({
            where: { dueDate: { lt: new Date() }, status: { not: "DONE" } },
        });
        res.json({ total, completed, inProgress, overdue });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});