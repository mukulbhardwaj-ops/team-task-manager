import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "MEMBER" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await API.post("/auth/signup", form);
            navigate("/login");
        } catch {
            setError("Signup failed. Email may already exist.");
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                background: "white",
                padding: 40,
                borderRadius: 16,
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                width: "100%",
                maxWidth: 400
            }}>
                <h1 style={{ color: "#4f46e5", marginBottom: 4 }}>🗂 TaskFlow</h1>
                <p style={{ color: "#64748b", marginBottom: 24 }}>Create your account</p>
                {error && (
                    <div style={{ background: "#fee2e2", color: "#dc2626", padding: 12, borderRadius: 8, marginBottom: 16 }}>
                        {error}
                    </div>
                )}
                <input
                    placeholder="Full Name"
                    style={{ width: "100%", marginBottom: 12, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Email"
                    type="email"
                    style={{ width: "100%", marginBottom: 12, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    placeholder="Password"
                    type="password"
                    style={{ width: "100%", marginBottom: 12, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <select
                    style={{ width: "100%", marginBottom: 20, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="MEMBER">Member</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#4f46e5",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
                <p style={{ textAlign: "center", marginTop: 16, color: "#64748b" }}>
                    Already have an account? <Link to="/login" style={{ color: "#4f46e5" }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}