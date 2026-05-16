import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch {
            setError("Invalid email or password");
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
        }}>
            <div style={{
                background: "white",
                padding: 40,
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                width: "100%",
                maxWidth: 420
            }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{
                        width: 60, height: 60,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        borderRadius: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        margin: "0 auto 16px"
                    }}>🗂</div>
                    <h1 style={{ color: "#1e293b", margin: 0, fontSize: 24, fontWeight: "bold" }}>Ethara TaskFlow</h1>
                    <p style={{ color: "#64748b", marginTop: 8 }}>Sign in to your account</p>
                </div>

                {error && (
                    <div style={{
                        background: "#fee2e2",
                        color: "#dc2626",
                        padding: 12,
                        borderRadius: 10,
                        marginBottom: 20,
                        fontSize: 14,
                        textAlign: "center"
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 6, color: "#374151", fontWeight: 500, fontSize: 14 }}>Email</label>
                    <input
                        placeholder="Enter your email"
                        type="email"
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 10,
                            border: "1.5px solid #e2e8f0",
                            fontSize: 14,
                            boxSizing: "border-box",
                            outline: "none",
                            transition: "border 0.2s"
                        }}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", marginBottom: 6, color: "#374151", fontWeight: 500, fontSize: 14 }}>Password</label>
                    <input
                        placeholder="Enter your password"
                        type="password"
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 10,
                            border: "1.5px solid #e2e8f0",
                            fontSize: 14,
                            boxSizing: "border-box",
                            outline: "none"
                        }}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "13px",
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        color: "white",
                        border: "none",
                        borderRadius: 10,
                        fontSize: 15,
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 4px 15px rgba(79,70,229,0.4)"
                    }}>
                    {loading ? "Signing in..." : "Sign In →"}
                </button>

                <p style={{ textAlign: "center", marginTop: 20, color: "#64748b", fontSize: 14 }}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}