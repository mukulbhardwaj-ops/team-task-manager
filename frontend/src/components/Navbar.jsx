import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const navLinks = [
        { label: "Dashboard", to: "/" },
        { label: "Projects", to: "/projects" },
        { label: "Tasks", to: "/tasks" },
    ];

    return (
        <nav style={{
            background: "rgba(15,15,26,0.97)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(20px)",
            position: "sticky",
            top: 0,
            zIndex: 100
        }}>
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{
                        width: 30, height: 30,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        boxShadow: "0 4px 12px rgba(79,70,229,0.35)"
                    }}>🗂</div>
                    <div>
                        <div style={{
                            fontSize: 11,
                            fontWeight: "900",
                            letterSpacing: "2.5px",
                            textTransform: "uppercase",
                            background: "linear-gradient(135deg, #818cf8, #c4b5fd)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            lineHeight: 1.2
                        }}>ETHARA</div>
                        <div style={{
                            fontSize: 8,
                            color: "rgba(255,255,255,0.3)",
                            letterSpacing: "3px",
                            textTransform: "uppercase",
                        }}>TASKFLOW</div>
                    </div>
                </div>

                {/* Nav Links */}
                <div style={{ display: "flex", gap: 2 }}>
                    {navLinks.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <Link key={item.to} to={item.to} style={{
                                color: isActive ? "white" : "rgba(255,255,255,0.45)",
                                textDecoration: "none",
                                padding: "5px 12px",
                                borderRadius: 7,
                                fontSize: 12,
                                fontWeight: isActive ? 600 : 400,
                                background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                                border: isActive ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
                                transition: "all 0.15s"
                            }}>
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Right Side */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "5px 12px",
                    borderRadius: 8
                }}>
                    <div style={{
                        width: 22, height: 22,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "white"
                    }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{user?.name}</span>
                    <span style={{
                        background: "rgba(99,102,241,0.15)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        color: "#818cf8",
                        fontSize: 10,
                        padding: "1px 7px",
                        borderRadius: 20,
                        fontWeight: 600
                    }}>{user?.role}</span>
                </div>

                <button onClick={logout} style={{
                    padding: "5px 14px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#f87171",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 11
                }}>
                    Logout
                </button>
            </div>
        </nav>
    );
}