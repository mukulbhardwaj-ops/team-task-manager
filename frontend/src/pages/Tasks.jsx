import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", dueDate: "", assignedTo: "", projectId: "" });
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/tasks").then((res) => setTasks(res.data));
        API.get("/projects").then((res) => setProjects(res.data));
    }, []);

    const createTask = async () => {
        try {
            const res = await API.post("/tasks", {
                ...form,
                assignedTo: parseInt(form.assignedTo),
                projectId: parseInt(form.projectId),
            });
            setTasks([...tasks, res.data]);
            setForm({ title: "", description: "", dueDate: "", assignedTo: "", projectId: "" });
        } catch {
            alert("Failed to create task");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await API.put(`/tasks/${id}`, { status });
            setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
        } catch {
            alert("Failed to update task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            setTasks(tasks.filter((t) => t.id !== id));
        } catch {
            alert("Failed to delete task");
        }
    };

    const statusColor = { TODO: "#f0f0f0", IN_PROGRESS: "#fef3c7", DONE: "#d1fae5" };

    return (
        <div style={{ padding: 24 }}>
            <nav style={{ marginBottom: 24 }}>
                <Link to="/" style={{ marginRight: 16 }}>Dashboard</Link>
                <Link to="/projects" style={{ marginRight: 16 }}>Projects</Link>
                <Link to="/tasks">Tasks</Link>
            </nav>
            <h2>Tasks</h2>
            {user?.role === "ADMIN" && (
                <div style={{ marginBottom: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <input placeholder="Title" value={form.title} style={{ padding: 8 }}
                        onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    <input placeholder="Description" value={form.description} style={{ padding: 8 }}
                        onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <input type="date" value={form.dueDate} style={{ padding: 8 }}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                    <input placeholder="User ID" value={form.assignedTo} style={{ padding: 8, width: 80 }}
                        onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />
                    <select value={form.projectId} style={{ padding: 8 }}
                        onChange={(e) => setForm({ ...form, projectId: e.target.value })}>
                        <option value="">Select Project</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <button onClick={createTask} style={{ padding: 8, background: "#4f46e5", color: "white", border: "none", borderRadius: 4 }}>
                        Create Task
                    </button>
                </div>
            )}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ padding: 8, textAlign: "left" }}>Title</th>
                        <th style={{ padding: 8, textAlign: "left" }}>Project</th>
                        <th style={{ padding: 8, textAlign: "left" }}>Assigned To</th>
                        <th style={{ padding: 8, textAlign: "left" }}>Due Date</th>
                        <th style={{ padding: 8, textAlign: "left" }}>Status</th>
                        <th style={{ padding: 8 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((t) => (
                        <tr key={t.id} style={{ borderBottom: "1px solid #ccc", background: statusColor[t.status] }}>
                            <td style={{ padding: 8 }}>{t.title}</td>
                            <td style={{ padding: 8 }}>{t.project?.name}</td>
                            <td style={{ padding: 8 }}>{t.assignee?.name}</td>
                            <td style={{ padding: 8 }}>{new Date(t.dueDate).toLocaleDateString()}</td>
                            <td style={{ padding: 8 }}>
                                <select value={t.status} onChange={(e) => updateStatus(t.id, e.target.value)} style={{ padding: 4 }}>
                                    <option value="TODO">Todo</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </td>
                            <td style={{ padding: 8 }}>
                                {user?.role === "ADMIN" && (
                                    <button onClick={() => deleteTask(t.id)} style={{ padding: "4px 8px", background: "red", color: "white", border: "none", borderRadius: 4 }}>
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}