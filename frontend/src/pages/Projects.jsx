import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        if (!confirm("Delete this project?")) return;
        try {
            await API.delete(`/projects/${id}`);
            setProjects(projects.filter((p) => p.id !== id));
        } catch {
            alert("Failed to delete project");
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
            <Navbar />
            <div style={{ padding: "32px 24px" }}>
                <h2 style={{ color: "#1e293b", marginBottom: 24 }}>Projects</h2>

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
                        <input
                            placeholder="Project name"
                            value={form.name}
                            style={{ flex: 1, minWidth: 180, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input
                            placeholder="Description (optional)"
                            value={form.description}
                            style={{ flex: 2, minWidth: 180, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                        <button onClick={createProject} style={{
                            padding: "10px 20px",
                            background: "#4f46e5",
                            color: "white",
                            border: "none",
                            borderRadius: 8,
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}>
                            + Create Project
                        </button>
                    </div>
                )}

                {loading ? (
                    <p style={{ color: "#64748b" }}>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p style={{ color: "#64748b" }}>No projects yet.</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {projects.map((p) => (
                            <div key={p.id} style={{
                                background: "white",
                                padding: 20,
                                borderRadius: 12,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div>
                                    <h3 style={{ margin: 0, color: "#4f46e5", cursor: "pointer" }}
                                        onClick={() => navigate(`/projects/${p.id}`)}>
                                        {p.name} →
                                    </h3>
                                    <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{p.description || "No description"}</p>
                                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{p.tasks?.length || 0} tasks</span>
                                </div>
                                {user?.role === "ADMIN" && (
                                    <button onClick={() => deleteProject(p.id)} style={{
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}