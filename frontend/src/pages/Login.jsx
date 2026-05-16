import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input placeholder="Email" style={{ width: "100%", marginBottom: 8, padding: 8 }}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password" style={{ width: "100%", marginBottom: 8, padding: 8 }}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button onClick={handleSubmit} style={{ width: "100%", padding: 8, background: "#4f46e5", color: "white", border: "none", borderRadius: 4 }}>
                Login
            </button>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    );
}