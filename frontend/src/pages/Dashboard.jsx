import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, overdue: 0 });
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/dashboard").then((res) => {
            setStats(res.data);
            setLoading(false);
        });
    }, []);

    const cards = [
        { label: "Total Tasks", value: stats.total, color: "#6366f1", bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)", icon: "📋" },
        { label: "Completed", value: stats.completed, color: "#10b981", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)", icon: "✅" },
        { label: "In Progress", value: stats.inProgress, color: "#f59e0b", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", icon: "⚡" },
        { label: "Overdue", value: stats.overdue, color: "#ef4444", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)", icon: "🚨" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#0f0f1a", fontFamily: "'Segoe UI', sans-serif" }}>
            <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(79,70,229,0.08)", top: -200, left: -200, filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(124,58,237,0.08)", bottom: -200, right: -200, filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <div style={{ padding: "40px 32px" }}>
                    <div style={{ marginBottom: 40 }}>
                        <h2 style={{ color: "white", margin: 0, fontSize: 28, fontWeight: "bold" }}>
                            Welcome back, {user?.name} 👋
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.4)", marginTop: 8, fontSize: 15 }}>
                            Here's your task overview for today.
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
                            <div style={{
                                width: 40, height: 40,
                                border: "3px solid rgba(255,255,255,0.1)",
                                borderTop: "3px solid #6366f1",
                                borderRadius: "50%",
                                animation: "spin 0.8s linear infinite"
                            }} />
                        </div>
                    ) : (
                        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                            {cards.map((card) => (
                                <div key={card.label} style={{
                                    flex: "1 1 200px",
                                    background: card.bg,
                                    border: `1px solid ${card.border}`,
                                    borderRadius: 20,
                                    padding: 28,
                                    position: "relative",
                                    overflow: "hidden"
                                }}>
                                    <div style={{ fontSize: 32, marginBottom: 16 }}>{card.icon}</div>
                                    <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>{card.label}</p>
                                    <p style={{ color: card.color, fontSize: 48, fontWeight: "bold", margin: "8px 0 0", lineHeight: 1 }}>{card.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ marginTop: 40, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28 }}>
                        <h3 style={{ color: "white", margin: "0 0 16px", fontSize: 18 }}>Quick Actions</h3>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            {[
                                { label: "View Projects", href: "/projects", icon: "📁" },
                                { label: "View Tasks", href: "/tasks", icon: "✅" },
                            ].map((action) => (
                                <a key={action.label} href={action.href} style={{
                                    padding: "12px 20px",
                                    background: "rgba(99,102,241,0.15)",
                                    border: "1px solid rgba(99,102,241,0.3)",
                                    borderRadius: 12,
                                    color: "#818cf8",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    fontSize: 14,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8
                                }}>
                                    {action.icon} {action.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}