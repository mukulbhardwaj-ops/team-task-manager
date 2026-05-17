import { useEffect } from "react";

export default function AccountCreatedSplash({ onDone }) {

    useEffect(() => {
        const timer = setTimeout(onDone, 2000);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <div style={{
            position: "fixed", inset: 0,
            background: "rgba(15,15,26,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999,
            animation: "overlayIn 0.3s ease",
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 24, padding: "48px 56px",
                textAlign: "center", maxWidth: 380, width: "90%",
                animation: "cardPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                position: "relative", overflow: "hidden"
            }}>

                {[...Array(14)].map((_, i) => {
                    const angle = (i / 14) * 360;
                    const dist = 80 + Math.random() * 60;
                    const tx = Math.cos(angle * Math.PI / 180) * dist;
                    const ty = Math.sin(angle * Math.PI / 180) * dist;
                    const colors = ['#818cf8', '#a78bfa', '#6366f1', '#c4b5fd', '#7c3aed'];
                    return (
                        <div key={i} style={{
                            position: "absolute", width: 6, height: 6, borderRadius: "50%",
                            left: "50%", top: "40%",
                            background: colors[i % colors.length],
                            animation: `burst 0.9s ease-out ${0.4 + i * 0.03}s both`,
                            "--tx": `${tx}px`, "--ty": `${ty}px`
                        }} />
                    );
                })}

                <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px",
                    animation: "ringPulse 1.5s ease-in-out infinite",
                    boxShadow: "0 8px 32px rgba(79,70,229,0.5)"
                }}>
                    <svg viewBox="0 0 36 36" style={{
                        width: 36, height: 36, fill: "none",
                        stroke: "white", strokeWidth: 3,
                        strokeLinecap: "round", strokeLinejoin: "round",
                        strokeDasharray: 50, strokeDashoffset: 50,
                        animation: "drawCheck 0.5s ease 0.4s forwards"
                    }}>
                        <path d="M8 18 L15 25 L28 11" />
                    </svg>
                </div>

                <p style={{
                    color: "white", fontSize: 22, fontWeight: 700,
                    margin: "0 0 10px", letterSpacing: "-0.5px",
                    animation: "fadeUp 0.4s ease 0.5s both"
                }}>
                    Account Created!
                </p>
                <p style={{
                    color: "rgba(255,255,255,0.5)", fontSize: 14,
                    lineHeight: 1.6, margin: "0 0 28px",
                    animation: "fadeUp 0.4s ease 0.65s both"
                }}>
                    You can now use these credentials<br />to sign in to your account.
                </p>

                <div style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 999, height: 4, overflow: "hidden",
                    animation: "fadeUp 0.4s ease 0.8s both"
                }}>
                    <div style={{
                        height: "100%", borderRadius: 999,
                        background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                        animation: "fillBar 2s linear 0.9s forwards",
                        width: "0%"
                    }} />
                </div>
                <p style={{
                    color: "rgba(255,255,255,0.3)", fontSize: 12,
                    marginTop: 10, animation: "fadeUp 0.4s ease 0.9s both"
                }}>
                    Redirecting to login...
                </p>
            </div>

            <style>{`
                @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes cardPop {
                    from { opacity: 0; transform: scale(0.8) translateY(20px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes drawCheck { to { stroke-dashoffset: 0; } }
                @keyframes ringPulse {
                    0%, 100% { box-shadow: 0 8px 32px rgba(79,70,229,0.5); }
                    50%      { box-shadow: 0 8px 48px rgba(124,58,237,0.7); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fillBar { from { width: 0%; } to { width: 100%; } }
                @keyframes burst {
                    0%   { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
                }
            `}</style>
        </div>
    );
}