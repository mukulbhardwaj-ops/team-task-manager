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
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "14px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(20px)",
            position: "sticky",
            top: 0,
            zIndex: 100
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 36, height: 36,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18
                    }}>🗂</div>
                    <span style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Ethara TaskFlow</span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                    {[
                        { label: "Dashboard", to: "/" },
                        { label: "Projects", to: "/projects" },
                        { label: "Tasks", to: "/tasks" },
                    ].map((item) => (
                        <Link key={item.to} to={item.to} style={{
                            color: "rgba(255,255,255,0.6)",
                            textDecoration: "none",
                            padding: "6px 14px",
                            borderRadius: 8,
                            fontSize: 14,
                            fontWeight: 500,
                            transition: "all 0.2s"
                        }}
                            onMouseEnter={e => { e.target.style.color = "white"; e.target.style.background = "rgba(255,255,255,0.08)"; }}
                            onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.6)"; e.target.style.background = "transparent"; }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "6px 14px",
                    borderRadius: 10
                }}>
                    <div style={{
                        width: 28, height: 28,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: "bold",
                        color: "white"
                    }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{user?.name}</span>
                    <span style={{
                        background: "rgba(99,102,241,0.2)",
                        border: "1px solid rgba(99,102,241,0.3)",
                        color: "#818cf8",
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontWeight: 600
                    }}>{user?.role}</span>
                </div>

                <button onClick={logout} style={{
                    padding: "8px 16px",
                    background: "rgba(15,15,26,0.95)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#f87171",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 13
                }}>
                    Logout
                </button>
            </div>
        </nav>
    );
}