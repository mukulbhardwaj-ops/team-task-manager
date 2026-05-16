const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignedTo, projectId } = req.body;

        if (!title || !dueDate || !assignedTo || !projectId) {
            return res.status(400).json({ message: "Title, due date, assigned user and project are required" });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                assignedTo,
                projectId,
            },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                assignee: { select: { name: true, email: true } },
                project: { select: { name: true } },
            },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const task = await prisma.task.update({
            where: { id: parseInt(req.params.id) },
            data: { status },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await prisma.task.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};