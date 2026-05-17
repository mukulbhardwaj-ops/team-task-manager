import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import AccountCreatedSplash from "../components/AccountCreatedSplash";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "MEMBER" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await API.post("/auth/signup", form);
            setShowSplash(true);
        } catch {
            setError("Signup failed. Email may already exist.");
        }
        setLoading(false);
    };

    if (showSplash) return <AccountCreatedSplash onDone={() => navigate("/login")} />;

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0f0f1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(79,70,229,0.15)", top: -100, right: -100, filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.15)", bottom: -100, left: -100, filter: "blur(80px)" }} />
            </div>

            <div style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: 40,
                borderRadius: 24,
                width: "100%",
                maxWidth: 420,
                position: "relative"
            }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{
                        width: 64, height: 64,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        borderRadius: 18,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 30,
                        margin: "0 auto 16px",
                        boxShadow: "0 8px 32px rgba(79,70,229,0.4)"
                    }}>🗂</div>
                    <h1 style={{ color: "white", margin: 0, fontSize: 26, fontWeight: "bold", letterSpacing: "-0.5px" }}>Ethara TaskFlow</h1>
                    <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 8, fontSize: 14 }}>Create your account to get started.</p>
                </div>

                {error && (
                    <div style={{
                        background: "rgba(220,38,38,0.15)",
                        border: "1px solid rgba(220,38,38,0.3)",
                        color: "#f87171",
                        padding: 12, borderRadius: 10,
                        marginBottom: 20, fontSize: 14, textAlign: "center"
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 8, color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: 13, letterSpacing: "0.5px", textTransform: "uppercase" }}>Full Name</label>
                    <input
                        placeholder="Enter your name"
                        style={{
                            width: "100%", padding: "13px 16px", borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.07)",
                            color: "white", fontSize: 14, boxSizing: "border-box", outline: "none"
                        }}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 8, color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: 13, letterSpacing: "0.5px", textTransform: "uppercase" }}>Email</label>
                    <input
                        placeholder="Enter your email"
                        type="email"
                        style={{
                            width: "100%", padding: "13px 16px", borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.07)",
                            color: "white", fontSize: 14, boxSizing: "border-box", outline: "none"
                        }}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 8, color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: 13, letterSpacing: "0.5px", textTransform: "uppercase" }}>Password</label>
                    <input
                        placeholder="Enter your password"
                        type="password"
                        style={{
                            width: "100%", padding: "13px 16px", borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.07)",
                            color: "white", fontSize: 14, boxSizing: "border-box", outline: "none"
                        }}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: 28 }}>
                    <label style={{ display: "block", marginBottom: 8, color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: 13, letterSpacing: "0.5px", textTransform: "uppercase" }}>Role</label>
                    <select
                        style={{
                            width: "100%", padding: "13px 16px", borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.07)",
                            color: "white", fontSize: 14, boxSizing: "border-box", outline: "none"
                        }}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}>
                        <option value="MEMBER" style={{ background: "#1e1e2e" }}>Member</option>
                        <option value="ADMIN" style={{ background: "#1e1e2e" }}>Admin</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        width: "100%", padding: "14px",
                        background: loading ? "rgba(79,70,229,0.5)" : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        color: "white", border: "none", borderRadius: 12,
                        fontSize: 15, fontWeight: "bold",
                        cursor: loading ? "not-allowed" : "pointer",
                        boxShadow: "0 4px 20px rgba(79,70,229,0.5)",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10
                    }}>
                    {loading ? (
                        <>
                            <div style={{
                                width: 18, height: 18,
                                border: "2px solid rgba(255,255,255,0.3)",
                                borderTop: "2px solid white",
                                borderRadius: "50%",
                                animation: "spin 0.8s linear infinite"
                            }} />
                            Creating account...
                        </>
                    ) : "Create Account →"}
                </button>

                <p style={{ textAlign: "center", marginTop: 24, color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
                </p>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                input::placeholder { color: rgba(255,255,255,0.25); }
            `}</style>
        </div>
    );
}