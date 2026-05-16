import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "MEMBER" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/signup", form);
            navigate("/login");
        } catch {
            setError("Signup failed");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
            <h2>Signup</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input placeholder="Name" style={{ width: "100%", marginBottom: 8, padding: 8 }}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" style={{ width: "100%", marginBottom: 8, padding: 8 }}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password" style={{ width: "100%", marginBottom: 8, padding: 8 }}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <select style={{ width: "100%", marginBottom: 8, padding: 8 }}
                onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button onClick={handleSubmit} style={{ width: "100%", padding: 8, background: "#4f46e5", color: "white", border: "none", borderRadius: 4 }}>
                Signup
            </button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}