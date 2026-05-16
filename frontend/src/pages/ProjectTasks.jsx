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
        TODO: { bg: "rgba(99,102,241,0.12)", color: "#818cf8", border: "rgba(99,102,241,0.25)" },
        IN_PROGRESS: { bg: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "rgba(245,158,11,0.25)" },
        DONE: { bg: "rgba(16,185,129,0.12)", color: "#34d399", border: "rgba(16,185,129,0.25)" },
    };

    return (
        <div style={{ minHeight: "100vh", background: "#0f0f1a", fontFamily: "'Segoe UI', sans-serif" }}>
            <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(79,70,229,0.07)", top: -100, left: -100, filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.07)", bottom: -100, right: -100, filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <div style={{ padding: "32px 48px" }}>
                    <button onClick={() => navigate("/projects")} style={{
                        marginBottom: 24,
                        padding: "8px 16px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10,
                        cursor: "pointer",
                        color: "#818cf8",
                        fontWeight: "bold",
                        fontSize: 14
                    }}>
                        ← Back to Projects
                    </button>

                    <h2 style={{ color: "white", margin: "0 0 4px", fontSize: 24, fontWeight: "bold" }}>
                        📁 {project?.name || "Project"}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 28, fontSize: 14 }}>
                        {project?.description || ""}
                    </p>

                    <h3 style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16, fontSize: 15, fontWeight: 600 }}>
                        Tasks ({tasks.length})
                    </h3>

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
                            <div style={{ width: 36, height: 36, border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        </div>
                    ) : tasks.length === 0 ? (
                        <div style={{ textAlign: "center", padding: 60 }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>No tasks in this project yet.</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {tasks.map((t) => (
                                <div key={t.id} style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    padding: "18px 22px",
                                    borderRadius: 14,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: 12
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0, color: "white", fontSize: 15, fontWeight: 600 }}>{t.title}</h3>
                                        <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{t.description}</p>
                                        <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.3)", display: "flex", gap: 16 }}>
                                            <span>👤 {t.assignee?.name}</span>
                                            <span>📅 {new Date(t.dueDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span style={{
                                            padding: "4px 12px",
                                            borderRadius: 20,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            background: statusColors[t.status]?.bg,
                                            color: statusColors[t.status]?.color,
                                            border: `1px solid ${statusColors[t.status]?.border}`
                                        }}>
                                            {t.status.replace("_", " ")}
                                        </span>
                                        <select value={t.status} onChange={(e) => updateStatus(t.id, e.target.value)}
                                            style={{
                                                padding: "6px 10px",
                                                borderRadius: 8,
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                background: "rgba(255,255,255,0.06)",
                                                color: "white",
                                                fontSize: 13,
                                                outline: "none"
                                            }}>
                                            <option value="TODO" style={{ background: "#1e1e2e" }}>Todo</option>
                                            <option value="IN_PROGRESS" style={{ background: "#1e1e2e" }}>In Progress</option>
                                            <option value="DONE" style={{ background: "#1e1e2e" }}>Done</option>
                                        </select>
                                        {user?.role === "ADMIN" && (
                                            <button onClick={() => deleteTask(t.id)} style={{
                                                padding: "6px 14px",
                                                background: "rgba(239,68,68,0.12)",
                                                color: "#f87171",
                                                border: "1px solid rgba(239,68,68,0.25)",
                                                borderRadius: 8,
                                                cursor: "pointer",
                                                fontWeight: 600,
                                                fontSize: 13
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
            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}