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
        TODO: { bg: "rgba(99,102,241,0.12)", color: "#818cf8", border: "rgba(99,102,241,0.25)" },
        IN_PROGRESS: { bg: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "rgba(245,158,11,0.25)" },
        DONE: { bg: "rgba(16,185,129,0.12)", color: "#34d399", border: "rgba(16,185,129,0.25)" },
    };

    const inputStyle = {
        padding: "10px 14px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.06)",
        color: "white",
        fontSize: 14,
        outline: "none"
    };

    return (
        <div style={{ minHeight: "100vh", background: "#0f0f1a", fontFamily: "'Segoe UI', sans-serif" }}>
            <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(79,70,229,0.07)", top: -100, right: -100, filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.07)", bottom: -100, left: -100, filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <div style={{ padding: "32px" }}>
                    <h2 style={{ color: "white", marginBottom: 24, fontSize: 24, fontWeight: "bold" }}>✅ Tasks</h2>

                    {user?.role === "ADMIN" && (
                        <div style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            padding: 20,
                            borderRadius: 16,
                            marginBottom: 24,
                            display: "flex",
                            gap: 12,
                            flexWrap: "wrap",
                            alignItems: "center"
                        }}>
                            <input placeholder="Task title" value={form.title} style={{ ...inputStyle, flex: 1, minWidth: 140 }}
                                onChange={(e) => setForm({ ...form, title: e.target.value })} />
                            <input placeholder="Description" value={form.description} style={{ ...inputStyle, flex: 2, minWidth: 140 }}
                                onChange={(e) => setForm({ ...form, description: e.target.value })} />
                            <input type="date" value={form.dueDate} style={inputStyle}
                                onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                            <input placeholder="User ID" value={form.assignedTo} style={{ ...inputStyle, width: 80 }}
                                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />
                            <select value={form.projectId} style={{ ...inputStyle }}
                                onChange={(e) => setForm({ ...form, projectId: e.target.value })}>
                                <option value="" style={{ background: "#1e1e2e" }}>Select Project</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id} style={{ background: "#1e1e2e" }}>{p.name}</option>
                                ))}
                            </select>
                            <button onClick={createTask} style={{
                                padding: "10px 20px",
                                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                color: "white",
                                border: "none",
                                borderRadius: 10,
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontSize: 14,
                                whiteSpace: "nowrap"
                            }}>
                                + Create Task
                            </button>
                        </div>
                    )}

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
                            <div style={{ width: 36, height: 36, border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        </div>
                    ) : tasks.length === 0 ? (
                        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: 60 }}>No tasks yet.</p>
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
                                            <span>📁 {t.project?.name}</span>
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
                                            style={{ ...inputStyle, padding: "6px 10px", fontSize: 13 }}>
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
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
        </div>
    );
}