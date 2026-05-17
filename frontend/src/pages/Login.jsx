import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import WelcomeSplash from "../components/WelcomeSplash";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUserName(res.data.user.name);
            setShowSplash(true);
        } catch {
            setError("Invalid email or password");
        }
        setLoading(false);
    };

    if (showSplash) return <WelcomeSplash name={userName} onDone={() => navigate("/")} />;

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0f0f1a",
            display: "flex",
            fontFamily: "'Segoe UI', sans-serif",
            position: "relative",
            overflow: "hidden"
        }}>

            {/* Animated background blobs */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(79,70,229,0.2)", top: -150, left: -150, filter: "blur(100px)", animation: "blob1 8s ease-in-out infinite" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.2)", bottom: -100, right: -100, filter: "blur(100px)", animation: "blob2 10s ease-in-out infinite" }} />
                <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(37,99,235,0.15)", top: "40%", right: "20%", filter: "blur(80px)", animation: "blob3 12s ease-in-out infinite" }} />
            </div>

            {/* Moving fog clouds */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                <div style={{
                    position: "absolute",
                    width: 800, height: 200,
                    background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
                    top: "10%",
                    animation: "fogMove1 20s ease-in-out infinite",
                    filter: "blur(40px)"
                }} />
                <div style={{
                    position: "absolute",
                    width: 600, height: 150,
                    background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
                    top: "5%",
                    right: 0,
                    animation: "fogMove2 25s ease-in-out infinite",
                    filter: "blur(50px)"
                }} />
                <div style={{
                    position: "absolute",
                    width: 700, height: 180,
                    background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)",
                    top: "15%",
                    animation: "fogMove3 18s ease-in-out infinite",
                    filter: "blur(45px)"
                }} />
            </div>

            {/* Stars */}
            {[...Array(20)].map((_, i) => (
                <div key={i} style={{
                    position: "absolute",
                    width: Math.random() * 2 + 1,
                    height: Math.random() * 2 + 1,
                    background: "white",
                    borderRadius: "50%",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.1,
                    animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 3}s`
                }} />
            ))}

            {/* Left side branding */}
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "60px",
                position: "relative",
                zIndex: 1
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                    <div style={{
                        width: 48, height: 48,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        borderRadius: 14,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24,
                        boxShadow: "0 8px 32px rgba(79,70,229,0.5)"
                    }}>🗂</div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: "2px", background: "linear-gradient(135deg, #818cf8, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ETHARA</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "3px" }}>TASKFLOW</div>
                    </div>
                </div>

                <h1 style={{ color: "white", fontSize: 42, fontWeight: 900, lineHeight: 1.2, margin: "0 0 20px", letterSpacing: "-1px" }}>
                    Manage your<br />
                    <span style={{ background: "linear-gradient(135deg, #818cf8, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>team tasks</span><br />
                    effortlessly.
                </h1>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.7, maxWidth: 340 }}>
                    Assign tasks, track progress, and collaborate with your team — all in one place.
                </p>

                <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
                    {[
                        { value: "100%", label: "Uptime" },
                        { value: "RBAC", label: "Role Based" },
                        { value: "Live", label: "Real-time" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div style={{ color: "#818cf8", fontSize: 22, fontWeight: 800 }}>{stat.value}</div>
                            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 2 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side login form */}
            <div style={{
                width: 460,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 40,
                position: "relative",
                zIndex: 1
            }}>
                <div style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(30px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: 40,
                    borderRadius: 24,
                    width: "100%",
                }}>
                    <h2 style={{ color: "white", margin: "0 0 6px", fontSize: 22, fontWeight: 700 }}>Sign in</h2>
                    <p style={{ color: "rgba(255,255,255,0.4)", margin: "0 0 28px", fontSize: 14 }}>Enter your credentials to continue</p>

                    {error && (
                        <div style={{
                            background: "rgba(220,38,38,0.12)",
                            border: "1px solid rgba(220,38,38,0.25)",
                            color: "#f87171",
                            padding: 12,
                            borderRadius: 10,
                            marginBottom: 20,
                            fontSize: 13,
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", marginBottom: 8, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.5px", textTransform: "uppercase" }}>Email</label>
                        <input
                            placeholder="you@example.com"
                            type="email"
                            style={{
                                width: "100%", padding: "12px 14px", borderRadius: 10,
                                border: "1px solid rgba(255,255,255,0.08)",
                                background: "rgba(255,255,255,0.05)",
                                color: "white", fontSize: 14, boxSizing: "border-box", outline: "none"
                            }}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", marginBottom: 8, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.5px", textTransform: "uppercase" }}>Password</label>
                        <input
                            placeholder="••••••••"
                            type="password"
                            style={{
                                width: "100%", padding: "12px 14px", borderRadius: 10,
                                border: "1px solid rgba(255,255,255,0.08)",
                                background: "rgba(255,255,255,0.05)",
                                color: "white", fontSize: 14, boxSizing: "border-box", outline: "none"
                            }}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: "100%", padding: "13px",
                            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            color: "white", border: "none", borderRadius: 10,
                            fontSize: 14, fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer",
                            boxShadow: "0 4px 20px rgba(79,70,229,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10
                        }}>
                        {loading ? (
                            <>
                                <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                                Signing in...
                            </>
                        ) : "Sign In →"}
                    </button>

                    <p style={{ textAlign: "center", marginTop: 20, color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>Sign up</Link>
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.1); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -40px) scale(1.15); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(0.9); }
        }
        @keyframes fogMove1 {
          0%   { transform: translateX(-200px); opacity: 0.5; }
          50%  { transform: translateX(200px); opacity: 1; }
          100% { transform: translateX(-200px); opacity: 0.5; }
        }
        @keyframes fogMove2 {
          0%   { transform: translateX(200px); opacity: 0.3; }
          50%  { transform: translateX(-150px); opacity: 0.8; }
          100% { transform: translateX(200px); opacity: 0.3; }
        }
        @keyframes fogMove3 {
          0%   { transform: translateX(-100px); opacity: 0.4; }
          50%  { transform: translateX(300px); opacity: 0.7; }
          100% { transform: translateX(-100px); opacity: 0.4; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.6; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
        </div>
    );
}