import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav style={{
            background: "#4f46e5",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white"
        }}>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <span style={{ fontWeight: "bold", fontSize: 18 }}>🗂 Ethara TaskFlow</span>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
                <Link to="/projects" style={{ color: "white", textDecoration: "none" }}>Projects</Link>
                <Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>Tasks</Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 14 }}>👤 {user?.name} ({user?.role})</span>
                <button onClick={logout} style={{
                    padding: "6px 14px",
                    background: "white",
                    color: "#4f46e5",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "bold"
                }}>Logout</button>
            </div>
        </nav>
    );
}