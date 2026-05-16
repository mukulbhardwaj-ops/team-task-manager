const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await prisma.project.create({
            data: { name, description, createdBy: req.user.id },
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            include: { tasks: true, creator: { select: { name: true, email: true } } },
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
