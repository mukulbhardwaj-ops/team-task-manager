import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, overdue: 0 });
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/dashboard").then((res) => setStats(res.data));
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Welcome, {user?.name}</h2>
                <button onClick={logout} style={{ padding: "8px 16px", background: "red", color: "white", border: "none", borderRadius: 4 }}>Logout</button>
            </div>
            <nav style={{ marginBottom: 24 }}>
                <Link to="/" style={{ marginRight: 16 }}>Dashboard</Link>
                <Link to="/projects" style={{ marginRight: 16 }}>Projects</Link>
                <Link to="/tasks">Tasks</Link>
            </nav>
            <div style={{ display: "flex", gap: 16 }}>
                <div style={{ padding: 24, background: "#f0f0f0", borderRadius: 8, flex: 1 }}>
                    <h3>Total Tasks</h3>
                    <p style={{ fontSize: 32 }}>{stats.total}</p>
                </div>
                <div style={{ padding: 24, background: "#d1fae5", borderRadius: 8, flex: 1 }}>
                    <h3>Completed</h3>
                    <p style={{ fontSize: 32 }}>{stats.completed}</p>
                </div>
                <div style={{ padding: 24, background: "#fef3c7", borderRadius: 8, flex: 1 }}>
                    <h3>In Progress</h3>
                    <p style={{ fontSize: 32 }}>{stats.inProgress}</p>
                </div>
                <div style={{ padding: 24, background: "#fee2e2", borderRadius: 8, flex: 1 }}>
                    <h3>Overdue</h3>
                    <p style={{ fontSize: 32 }}>{stats.overdue}</p>
                </div>
            </div>
        </div>
    );
}