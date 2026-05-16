import { useEffect, useState } from "react";

export default function WelcomeSplash({ name, onDone }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 500);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            background: "#0f0f1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
            flexDirection: "column",
            gap: 20
        }}>
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(79,70,229,0.2)", top: -150, left: -150, filter: "blur(80px)" }} />
                <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(124,58,237,0.2)", bottom: -150, right: -150, filter: "blur(80px)" }} />
            </div>

            <div style={{
                width: 80, height: 80,
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                borderRadius: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                boxShadow: "0 8px 40px rgba(79,70,229,0.6)",
                animation: "pulse 1.5s ease-in-out infinite",
                position: "relative"
            }}>🗂</div>

            <h1 style={{
                color: "white",
                fontSize: 28,
                fontWeight: "bold",
                margin: 0,
                position: "relative",
                textAlign: "center",
                animation: "fadeUp 0.6s ease"
            }}>
                Warm Welcome! {name} 👋
            </h1>

            <p style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 15,
                margin: 0,
                position: "relative",
                animation: "fadeUp 0.8s ease"
            }}>
                Taking you to your dashboard...
            </p>

            <div style={{
                width: 200,
                height: 3,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
                marginTop: 10
            }}>
                <div style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                    borderRadius: 10,
                    animation: "load 2s linear forwards"
                }} />
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 40px rgba(79,70,229,0.6); }
          50% { transform: scale(1.05); box-shadow: 0 8px 60px rgba(79,70,229,0.8); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes load {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
        </div>
    );
}