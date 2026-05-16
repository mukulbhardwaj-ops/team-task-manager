import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/projects").then((res) => {
            setProjects(res.data);
            setLoading(false);
        });
    }, []);

    const createProject = async () => {
        if (!form.name) return alert("Project name is required");
        try {
            const res = await API.post("/projects", form);
            setProjects([...projects, res.data]);
            setForm({ name: "", description: "" });
        } catch {
            alert("Failed to create project");
        }
    };

    const deleteProject = async (id) => {
        if (!confirm("Delete this project and all its tasks?")) return;
        try {
            await API.delete(`/projects/${id}`);
            setProjects(projects.filter((p) => p.id !== id));
        } catch {
            alert("Failed to delete project");
        }
    };

    const inputStyle = {
        flex: 1,
        minWidth: 160,
        padding: "11px 14px",
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
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(79,70,229,0.07)", top: -100, left: -100, filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.07)", bottom: -100, right: -100, filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <div style={{ padding: "32px" }}>
                    <h2 style={{ color: "white", marginBottom: 24, fontSize: 24, fontWeight: "bold" }}>📁 Projects</h2>

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
                            <input
                                placeholder="Project name"
                                value={form.name}
                                style={inputStyle}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                            <input
                                placeholder="Description (optional)"
                                value={form.description}
                                style={{ ...inputStyle, flex: 2 }}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                            <button onClick={createProject} style={{
                                padding: "11px 20px",
                                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                color: "white",
                                border: "none",
                                borderRadius: 10,
                                fontWeight: "bold",
                                cursor: "pointer",
                                fontSize: 14,
                                whiteSpace: "nowrap"
                            }}>
                                + Create Project
                            </button>
                        </div>
                    )}

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
                            <div style={{ width: 36, height: 36, border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        </div>
                    ) : projects.length === 0 ? (
                        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: 60 }}>No projects yet. Create one above!</p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {projects.map((p) => (
                                <div key={p.id} style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    padding: "18px 22px",
                                    borderRadius: 14,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 12
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h3
                                            onClick={() => navigate(`/projects/${p.id}`)}
                                            style={{ margin: 0, color: "#818cf8", cursor: "pointer", fontSize: 16, fontWeight: 600 }}
                                        >
                                            {p.name} →
                                        </h3>
                                        <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{p.description || "No description"}</p>
                                        <span style={{
                                            display: "inline-block",
                                            marginTop: 8,
                                            padding: "3px 10px",
                                            borderRadius: 20,
                                            fontSize: 11,
                                            fontWeight: 600,
                                            background: p.tasks?.length > 0 ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                                            color: p.tasks?.length > 0 ? "#818cf8" : "rgba(255,255,255,0.25)",
                                            border: p.tasks?.length > 0 ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(255,255,255,0.08)"
                                        }}>
                                            {p.tasks?.length || 0} {p.tasks?.length === 1 ? "task" : "tasks"}
                                        </span>
                                    </div>
                                    {user?.role === "ADMIN" && (
                                        <button onClick={() => deleteProject(p.id)} style={{
                                            padding: "7px 14px",
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
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } } input::placeholder { color: rgba(255,255,255,0.25); }`}</style>
        </div>
    );
}