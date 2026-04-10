import { Link } from "react-router-dom";

function Footer() {
  return (
    <div style={{ background: "#1a2b4a", color: "#fff", padding: "60px 80px 20px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "40px", marginBottom: "40px" }}>

        {/* Brand */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#fff", marginBottom: "12px" }}>
            MECHAFIND
          </h2>
          <p style={{ fontSize: "14px", color: "#aaa", lineHeight: "1.8", maxWidth: "260px" }}>
            Connecting drivers with trusted local mechanics across Andhra Pradesh & Telangana.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            {[
              { label: "f", href: "https://facebook.com" },
              { label: "in", href: "https://linkedin.com" },
              { label: "tw", href: "https://twitter.com" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#2c3e6b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "bold", color: "#fff", cursor: "pointer", textDecoration: "none", transition: "background 0.2s" }}
                onMouseOver={e => e.currentTarget.style.background = "#e63329"}
                onMouseOut={e => e.currentTarget.style.background = "#2c3e6b"}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* fkazz not working change neededd Quick Links */}
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "16px", letterSpacing: "0.05em" }}>
            QUICK LINKS
          </h4>
          {[
            { label: "Home", to: "/" },
            { label: "Services", to: "/services" },
            { label: "About", to: "/about" },
            { label: "Partners", to: "/partners" },
          ].map((link, i) => (
            <p key={i} style={{ margin: "0 0 10px", fontSize: "14px" }}>
              <Link to={link.to} style={{ color: "#aaa", textDecoration: "none" }}
                onMouseOver={e => (e.target.style.color = "#e63329")}
                onMouseOut={e => (e.target.style.color = "#aaa")}
              >
                {link.label}
              </Link>
            </p>
          ))}
        </div>

        {/* Services */}
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "16px", letterSpacing: "0.05em" }}>
            SERVICES
          </h4>
          {["Periodic Car Service", "Car Detailing", "Denting & Painting", "Car Inspection", "AC Service", "Insurance Claims"].map((s, i) => (
            <p key={i} style={{ margin: "0 0 10px", fontSize: "14px", color: "#aaa" }}>
              {s}
            </p>
          ))}
        </div>

        {/* Contact */}
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "16px", letterSpacing: "0.05em" }}>
            CONTACT US
          </h4>
          <p style={{ fontSize: "14px", color: "#aaa", marginBottom: "10px" }}>📞 +91 6304802263</p>
          <p style={{ fontSize: "14px", color: "#aaa", marginBottom: "10px" }}>✉️ haroon@mechafind.com</p>
          <p style={{ fontSize: "14px", color: "#aaa", marginBottom: "10px" }}>📍 Vijayawada, India</p>
        </div>

      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #2c3e6b", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>
          © 2026 MechaFind. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy Policy", "Terms of Service"].map((item, i) => (
            <a key={i} href="#" style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}
              onMouseOver={e => (e.target.style.color = "#e63329")}
              onMouseOut={e => (e.target.style.color = "#aaa")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Footer;