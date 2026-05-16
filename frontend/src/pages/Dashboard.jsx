import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, overdue: 0 });
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/dashboard").then((res) => setStats(res.data));
    }, []);

    const cards = [
        { label: "Total Tasks", value: stats.total, color: "#4f46e5", bg: "#ede9fe" },
        { label: "Completed", value: stats.completed, color: "#059669", bg: "#d1fae5" },
        { label: "In Progress", value: stats.inProgress, color: "#d97706", bg: "#fef3c7" },
        { label: "Overdue", value: stats.overdue, color: "#dc2626", bg: "#fee2e2" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
            <Navbar />
            <div style={{ padding: "32px 24px" }}>
                <h2 style={{ marginBottom: 8, color: "#1e293b" }}>Welcome back, {user?.name} 👋</h2>
                <p style={{ color: "#64748b", marginBottom: 32 }}>Here's your task overview for today.</p>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    {cards.map((card) => (
                        <div key={card.label} style={{
                            flex: "1 1 180px",
                            background: card.bg,
                            borderRadius: 12,
                            padding: 24,
                            borderLeft: `4px solid ${card.color}`
                        }}>
                            <p style={{ color: "#64748b", marginBottom: 8, fontWeight: 500 }}>{card.label}</p>
                            <p style={{ fontSize: 40, fontWeight: "bold", color: card.color, margin: 0 }}>{card.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}