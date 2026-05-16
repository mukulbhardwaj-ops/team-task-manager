import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/projects").then((res) => setProjects(res.data));
    }, []);

    const createProject = async () => {
        try {
            const res = await API.post("/projects", form);
            setProjects([...projects, res.data]);
            setForm({ name: "", description: "" });
        } catch (e) {
            alert("Failed to create project");
        }
    };

    const deleteProject = async (id) => {
        try {
            await API.delete(`/projects/${id}`);
            setProjects(projects.filter((p) => p.id !== id));
        } catch {
            alert("Failed to delete project");
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <nav style={{ marginBottom: 24 }}>
                <Link to="/" style={{ marginRight: 16 }}>Dashboard</Link>
                <Link to="/projects" style={{ marginRight: 16 }}>Projects</Link>
                <Link to="/tasks">Tasks</Link>
            </nav>
            <h2>Projects</h2>
            {user?.role === "ADMIN" && (
                <div style={{ marginBottom: 24 }}>
                    <input placeholder="Project name" value={form.name} style={{ marginRight: 8, padding: 8 }}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input placeholder="Description" value={form.description} style={{ marginRight: 8, padding: 8 }}
                        onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <button onClick={createProject} style={{ padding: 8, background: "#4f46e5", color: "white", border: "none", borderRadius: 4 }}>
                        Create Project
                    </button>
                </div>
            )}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ padding: 8, textAlign: "left" }}>Name</th>
                        <th style={{ padding: 8, textAlign: "left" }}>Description</th>
                        <th style={{ padding: 8, textAlign: "left" }}>Tasks</th>
                        {user?.role === "ADMIN" && <th style={{ padding: 8 }}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {projects.map((p) => (
                        <tr key={p.id} style={{ borderBottom: "1px solid #ccc" }}>
                            <td style={{ padding: 8 }}>{p.name}</td>
                            <td style={{ padding: 8 }}>{p.description}</td>
                            <td style={{ padding: 8 }}>{p.tasks?.length || 0}</td>
                            {user?.role === "ADMIN" && (
                                <td style={{ padding: 8 }}>
                                    <button onClick={() => deleteProject(p.id)} style={{ padding: "4px 8px", background: "red", color: "white", border: "none", borderRadius: 4 }}>
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}