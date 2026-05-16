import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, overdue: 0 });
    const [loading, setLoading] = useState(true);
    const [butterflies, setButterflies] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/dashboard").then((res) => {
            setStats(res.data);
            setLoading(false);
        });

        const bs = Array.from({ length: 3 }, (_, i) => ({
            id: i,
            x: Math.random() * 80 + 5,
            y: Math.random() * 80 + 5,
            delay: Math.random() * 10,
            duration: 10 + Math.random() * 8,
            size: 18 + Math.random() * 14,
        }));
        setButterflies(bs);
    }, []);

    const cards = [
        { label: "Total Tasks", value: stats.total, color: "#6366f1", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.25)", icon: "📋" },
        { label: "Completed", value: stats.completed, color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.25)", icon: "✅" },
        { label: "In Progress", value: stats.inProgress, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)", icon: "⚡" },
        { label: "Overdue", value: stats.overdue, color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)", icon: "🚨" },
    ];

    const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div style={{ minHeight: "100vh", background: "#0f0f1a", fontFamily: "'Segoe UI', sans-serif", overflow: "hidden" }}>

            <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(79,70,229,0.07)", top: -150, left: -150, filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(124,58,237,0.07)", bottom: -150, right: -150, filter: "blur(80px)" }} />
            </div>

            {butterflies.map((b) => (
                <div key={b.id} style={{
                    position: "fixed",
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    fontSize: b.size,
                    zIndex: 2,
                    pointerEvents: "none",
                    animation: `fly${b.id} ${b.duration}s ${b.delay}s ease-in-out infinite`,
                    opacity: 0.6
                }}>🦋</div>
            ))}

            <style>{`
        @keyframes fly0 {
          0%   { transform: translate(0px, 0px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.6; }
          25%  { transform: translate(120px, -80px) rotate(15deg); }
          50%  { transform: translate(250px, 40px) rotate(-10deg); }
          75%  { transform: translate(180px, -120px) rotate(20deg); }
          90%  { opacity: 0.6; }
          100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0; }
        }
        @keyframes fly1 {
          0%   { transform: translate(0px, 0px); opacity: 0; }
          10%  { opacity: 0.5; }
          30%  { transform: translate(-100px, 60px) rotate(-15deg); }
          60%  { transform: translate(-200px, -50px) rotate(10deg); }
          90%  { opacity: 0.5; }
          100% { transform: translate(0px, 0px); opacity: 0; }
        }
        @keyframes fly2 {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          15%  { opacity: 0.7; }
          40%  { transform: translate(80px, 100px) rotate(20deg); }
          70%  { transform: translate(-60px, 150px) rotate(-15deg); }
          90%  { opacity: 0.5; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

            <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <div style={{ padding: "32px 48px" }}>

                    <div style={{ marginBottom: 28 }}>
                        <h2 style={{
                            color: "white",
                            margin: 0,
                            fontSize: 26,
                            fontWeight: "800",
                            letterSpacing: "-0.5px",
                            background: "linear-gradient(135deg, #fff 40%, #818cf8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontFamily: "'Georgia', serif"
                        }}>
                            Welcome back, {user?.name} 👋
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.4)", marginTop: 6, fontSize: 14 }}>
                            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 150 }}>
                            <div style={{ width: 36, height: 36, border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        </div>
                    ) : (
                        <>
                            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
                                {cards.map((card) => (
                                    <div key={card.label} style={{
                                        flex: "1 1 160px",
                                        background: card.bg,
                                        border: `1px solid ${card.border}`,
                                        borderRadius: 16,
                                        padding: "20px 20px",
                                    }}>
                                        <div style={{ fontSize: 24, marginBottom: 10 }}>{card.icon}</div>
                                        <p style={{ color: "rgba(255,255,255,0.45)", margin: 0, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{card.label}</p>
                                        <p style={{ color: card.color, fontSize: 36, fontWeight: "bold", margin: "6px 0 0", lineHeight: 1 }}>{card.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 24px", marginBottom: 16 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                                    <h3 style={{ color: "white", margin: 0, fontSize: 15, fontWeight: 600 }}>Overall Progress</h3>
                                    <span style={{ color: "#818cf8", fontSize: 14, fontWeight: 600 }}>{progress}%</span>
                                </div>
                                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, height: 10, overflow: "hidden" }}>
                                    <div style={{
                                        height: "100%",
                                        width: `${progress}%`,
                                        background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                                        borderRadius: 10,
                                        transition: "width 1s ease"
                                    }} />
                                </div>
                                <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>✅ {stats.completed} completed</span>
                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>⚡ {stats.inProgress} in progress</span>
                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>🚨 {stats.overdue} overdue</span>
                                </div>
                            </div>

                            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 24px" }}>
                                <h3 style={{ color: "white", margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>Quick Actions</h3>
                                <div style={{ display: "flex", gap: 10 }}>
                                    {[
                                        { label: "Projects", href: "/projects", icon: "📁" },
                                        { label: "Tasks", href: "/tasks", icon: "✅" },
                                    ].map((action) => (
                                        <a key={action.label} href={action.href} style={{
                                            padding: "10px 18px",
                                            background: "rgba(99,102,241,0.12)",
                                            border: "1px solid rgba(99,102,241,0.25)",
                                            borderRadius: 10,
                                            color: "#818cf8",
                                            textDecoration: "none",
                                            fontWeight: 600,
                                            fontSize: 13,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6
                                        }}>
                                            {action.icon} {action.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}