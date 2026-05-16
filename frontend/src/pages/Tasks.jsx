import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", dueDate: "", assignedTo: "", projectId: "" });
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/tasks").then((res) => { setTasks(res.data); setLoading(false); });
        API.get("/projects").then((res) => setProjects(res.data));
    }, []);

    const createTask = async () => {
        if (!form.title || !form.dueDate || !form.assignedTo || !form.projectId) {
            return alert("Please fill all fields");
        }
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
        if (!confirm("Delete this task?")) return;
        try {
            await API.delete(`/tasks/${id}`);
            setTasks(tasks.filter((t) => t.id !== id));
        } catch {
            alert("Failed to delete task");
        }
    };

    const statusColors = {
        TODO: { bg: "#f1f5f9", color: "#475569" },
        IN_PROGRESS: { bg: "#fef3c7", color: "#d97706" },
        DONE: { bg: "#d1fae5", color: "#059669" },
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
            <Navbar />
            <div style={{ padding: "32px 24px" }}>
                <h2 style={{ color: "#1e293b", marginBottom: 24 }}>Tasks</h2>

                {user?.role === "ADMIN" && (
                    <div style={{
                        background: "white",
                        padding: 24,
                        borderRadius: 12,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        marginBottom: 24,
                        display: "flex",
                        gap: 12,
                        flexWrap: "wrap"
                    }}>
                        <input placeholder="Task title" value={form.title}
                            style={{ flex: 1, minWidth: 150, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
                            onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <input placeholder="Description" value={form.description}
                            style={{ flex: 2, minWidth: 150, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
                            onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        <input type="date" value={form.dueDate}
                            style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                        <input placeholder="User ID" value={form.assignedTo}
                            style={{ width: 90, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
                            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />
                        <select value={form.projectId}
                            style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
                            onChange={(e) => setForm({ ...form, projectId: e.target.value })}>
                            <option value="">Select Project</option>
                            {projects.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <button onClick={createTask} style={{
                            padding: "10px 20px",
                            background: "#4f46e5",
                            color: "white",
                            border: "none",
                            borderRadius: 8,
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}>
                            + Create Task
                        </button>
                    </div>
                )}

                {loading ? (
                    <p style={{ color: "#64748b" }}>Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p style={{ color: "#64748b" }}>No tasks yet.</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {tasks.map((t) => (
                            <div key={t.id} style={{
                                background: "white",
                                padding: 20,
                                borderRadius: 12,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 12
                            }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: 0, color: "#1e293b" }}>{t.title}</h3>
                                    <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{t.description}</p>
                                    <div style={{ marginTop: 8, fontSize: 13, color: "#94a3b8" }}>
                                        <span>📁 {t.project?.name}</span>
                                        <span style={{ marginLeft: 16 }}>👤 {t.assignee?.name}</span>
                                        <span style={{ marginLeft: 16 }}>📅 {new Date(t.dueDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span style={{
                                        padding: "4px 10px",
                                        borderRadius: 20,
                                        fontSize: 12,
                                        fontWeight: "bold",
                                        background: statusColors[t.status]?.bg,
                                        color: statusColors[t.status]?.color
                                    }}>
                                        {t.status.replace("_", " ")}
                                    </span>
                                    <select value={t.status} onChange={(e) => updateStatus(t.id, e.target.value)}
                                        style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }}>
                                        <option value="TODO">Todo</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="DONE">Done</option>
                                    </select>
                                    {user?.role === "ADMIN" && (
                                        <button onClick={() => deleteTask(t.id)} style={{
                                            padding: "6px 14px",
                                            background: "#fee2e2",
                                            color: "#dc2626",
                                            border: "none",
                                            borderRadius: 6,
                                            cursor: "pointer",
                                            fontWeight: "bold"
                                        }}>
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}