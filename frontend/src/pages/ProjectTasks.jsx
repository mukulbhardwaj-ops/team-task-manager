import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function ProjectTasks() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/projects").then((res) => {
            const found = res.data.find((p) => p.id === parseInt(id));
            setProject(found);
        });
        API.get("/tasks").then((res) => {
            const filtered = res.data.filter((t) => t.projectId === parseInt(id));
            setTasks(filtered);
            setLoading(false);
        });
    }, [id]);

    const updateStatus = async (taskId, status) => {
        try {
            const res = await API.put(`/tasks/${taskId}`, { status });
            setTasks(tasks.map((t) => (t.id === taskId ? res.data : t)));
        } catch {
            alert("Failed to update task");
        }
    };

    const deleteTask = async (taskId) => {
        if (!confirm("Delete this task?")) return;
        try {
            await API.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter((t) => t.id !== taskId));
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
                <button onClick={() => navigate("/projects")} style={{
                    marginBottom: 24,
                    padding: "8px 16px",
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    cursor: "pointer",
                    color: "#4f46e5",
                    fontWeight: "bold"
                }}>
                    ← Back to Projects
                </button>

                <h2 style={{ color: "#1e293b", marginBottom: 4 }}>
                    {project?.name || "Project"}
                </h2>
                <p style={{ color: "#64748b", marginBottom: 24 }}>
                    {project?.description || ""}
                </p>

                <h3 style={{ color: "#1e293b", marginBottom: 16 }}>
                    Tasks ({tasks.length})
                </h3>

                {loading ? (
                    <p style={{ color: "#64748b" }}>Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p style={{ color: "#64748b" }}>No tasks in this project yet.</p>
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
                                        <span>👤 {t.assignee?.name}</span>
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