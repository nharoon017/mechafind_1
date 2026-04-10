import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import heroBg from "../assets/hero_home.jpg";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import carRoad from "../assets/car_road.jpg";
import carFeature from "../assets/car_feature.jpg";

const servicesList = [
  {
    id: 1,
    image: service2,
    badge: "MOST POPULAR",
    badgeColor: "#e63329",
    icon: "🔧",
    title: "Engine & Mechanical",
    desc: "Full engine diagnostics, oil changes, spark plugs, timing belts, and all mechanical repairs done at your location or workshop.",
    price: "₹500 – ₹5,000+",
    tags: ["Engine Diagnostics", "Oil Change", "Spark Plugs", "Timing Belt", "Gearbox"],
  },
  {
    id: 2,
    image: service1,
    badge: "EMERGENCY",
    badgeColor: "#dc2626",
    icon: "🔩",
    title: "Tyres & Wheels",
    desc: "Instant tyre puncture repair, replacement, balancing, and wheel alignment — we come to you anywhere.",
    price: "₹300 – ₹2,500",
    tags: ["Puncture Repair", "Tyre Replacement", "Tyre Balancing", "Wheel Alignment"],
  },
  {
    id: 3,
    image: carRoad,
    badge: "QUICK FIX",
    badgeColor: "#0ea5e9",
    icon: "⚡",
    title: "Battery & Electrical",
    desc: "Battery replacement, jump-starts, starter motor issues, alternator repairs, and electrical wiring problems fixed fast.",
    price: "₹800 – ₹3,000",
    tags: ["Battery Replacement", "Jump Start", "Alternator", "Wiring Repair"],
  },
  {
    id: 4,
    image: service4,
    badge: "SAFETY",
    badgeColor: "#7c3aed",
    icon: "🛑",
    title: "Brakes & Suspension",
    desc: "Brake pad replacement, disc rotor servicing, suspension alignment, and steering repairs for a safer, smoother ride.",
    price: "₹600 – ₹4,000",
    tags: ["Brake Pads", "Brake Discs", "Suspension Repair", "Steering"],
  },
  {
    id: 5,
    image: service3,
    badge: "DETAILING",
    badgeColor: "#059669",
    icon: "🚿",
    title: "Car Wash & Detailing",
    desc: "Premium exterior wash, interior deep clean, polish, and full detailing service — making your car look brand new.",
    price: "₹400 – ₹2,000",
    tags: ["Exterior Wash", "Interior Clean", "Polishing", "Full Detailing"],
  },
  {
    id: 6,
    image: carFeature,
    badge: "24/7",
    badgeColor: "#e63329",
    icon: "🚗",
    title: "Emergency Towing",
    desc: "24/7 emergency towing service to your nearest workshop, fuel delivery, and full roadside breakdown assistance.",
    price: "₹500 – ₹3,000",
    tags: ["Vehicle Towing", "Fuel Delivery", "Breakdown Assist", "On-Site Help"],
  },
  {
    id: 7,
    image: service2,
    badge: "COMFORT",
    badgeColor: "#0ea5e9",
    icon: "❄️",
    title: "AC & Cooling System",
    desc: "AC gas refill, compressor repair, coolant top-up, radiator flush, and full cooling system diagnostics.",
    price: "₹500 – ₹3,500",
    tags: ["AC Repair", "Gas Refill", "Coolant Flush", "Compressor"],
  },
  {
    id: 8,
    image: service1,
    badge: "ROUTINE",
    badgeColor: "#10b981",
    icon: "🛢️",
    title: "Fluids & Filters",
    desc: "Engine oil, brake fluid, transmission fluid, coolant replacements, and air/fuel/oil filter changes.",
    price: "₹300 – ₹1,200",
    tags: ["Oil Change", "Air Filter", "Fuel Filter", "Brake Fluid"],
  },
];

function Services() {
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", color: "#0f172a" }}>

      {/* ── Hero ── */}
      <section style={{
        position: "relative", minHeight: "52vh",
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover", backgroundPosition: "center top",
        display: "flex", alignItems: "center", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, rgba(10,15,30,0.94) 0%, rgba(10,15,30,0.7) 60%, rgba(230,51,41,0.3) 100%)",
        }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "5px", background: "linear-gradient(180deg, #e63329, #c8261e)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "80px 8%", maxWidth: "800px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "rgba(230,51,41,0.15)", border: "1px solid rgba(230,51,41,0.35)",
            padding: "7px 18px", borderRadius: "50px", marginBottom: "24px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#e63329", display: "inline-block" }} />
            <span style={{ color: "#fb7166", fontSize: "12px", fontWeight: "700", letterSpacing: "2px" }}>WHAT WE OFFER</span>
          </div>
          <h1 style={{ fontSize: "3.8rem", fontWeight: "900", color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: "-1px" }}>
            Every Service Your<br />
            Vehicle <span style={{ color: "#e63329" }}>Ever Needs.</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, maxWidth: "540px", margin: "0 0 36px" }}>
            From emergency roadside rescue to full workshop servicing — MechaFind's verified mechanics handle it all, wherever you are.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/search" style={{
              background: "#e63329", color: "#fff", textDecoration: "none",
              padding: "14px 32px", borderRadius: "12px", fontWeight: "800", fontSize: "15px",
              boxShadow: "0 8px 24px rgba(230,51,41,0.45)", transition: "transform 0.2s",
            }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "none"}>
              🔍 Find a Mechanic
            </Link>
            <Link to="/emergency" style={{
              background: "rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "14px 32px", borderRadius: "12px", fontWeight: "700", fontSize: "15px",
              backdropFilter: "blur(8px)", transition: "background 0.2s",
            }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
              🚨 Emergency SOS
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div style={{ background: "#0f172a", padding: "18px 8%" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap", alignItems: "center" }}>
          {["🔧 8 Service Categories", "📍 Serving AP & Telangana", "⚡ 60-Second Mechanic Match", "🛡️ Verified Professionals", "💰 Upfront Pricing"].map(item => (
            <span key={item} style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: "600" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section style={{ padding: "90px 8%" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ color: "#e63329", fontWeight: "700", fontSize: "13px", letterSpacing: "2px", marginBottom: "12px" }}>OUR SERVICES</div>
          <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#0f172a", margin: "0 0 14px" }}>Browse by Service Type</h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto" }}>
            Click any card to see what's included — then find a nearby mechanic instantly.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          {servicesList.map((s) => (
            <div
              key={s.id}
              onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: hoveredId === s.id
                  ? "0 24px 48px -8px rgba(0,0,0,0.16)"
                  : "0 4px 16px rgba(0,0,0,0.06)",
                border: expandedId === s.id ? "2px solid #e63329" : "2px solid transparent",
                transition: "all 0.25s ease",
                transform: hoveredId === s.id ? "translateY(-4px)" : "none",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src={s.image}
                  alt={s.title}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.4s ease",
                    transform: hoveredId === s.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                <div style={{
                  position: "absolute", top: "16px", left: "16px",
                  background: s.badgeColor, color: "#fff",
                  padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", letterSpacing: "1px",
                }}>{s.badge}</div>
                <div style={{
                  position: "absolute", bottom: "16px", right: "16px",
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff", padding: "6px 14px", borderRadius: "10px",
                  fontSize: "13px", fontWeight: "700",
                }}>{s.price}</div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "22px 24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    background: "#fef2f2", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "18px", flexShrink: 0,
                  }}>{s.icon}</div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", margin: 0, lineHeight: 1.3 }}>{s.title}</h3>
                </div>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, margin: "0 0 14px" }}>{s.desc}</p>

                {/* Expand toggle */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  color: "#e63329", fontSize: "13px", fontWeight: "700",
                }}>
                  <span>{expandedId === s.id ? "Hide details ▲" : "View details ▼"}</span>
                  <Link
                    to="/search"
                    onClick={e => e.stopPropagation()}
                    style={{
                      background: "#e63329", color: "#fff", textDecoration: "none",
                      padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "700",
                    }}>
                    Book Now
                  </Link>
                </div>

                {/* Expanded content */}
                <div style={{
                  maxHeight: expandedId === s.id ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}>
                  <div style={{
                    marginTop: "16px", paddingTop: "16px",
                    borderTop: "1px solid #f1f5f9",
                  }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", letterSpacing: "1px", marginBottom: "10px" }}>INCLUDES</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {s.tags.map((tag) => (
                        <span key={tag} style={{
                          background: "#f1f5f9", color: "#475569",
                          padding: "5px 12px", borderRadius: "20px",
                          fontSize: "12px", fontWeight: "600",
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "80px 8%", textAlign: "center",
      }}>
        <div style={{ color: "#e63329", fontWeight: "700", fontSize: "13px", letterSpacing: "2px", marginBottom: "16px" }}>READY TO GET STARTED?</div>
        <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#fff", margin: "0 0 16px" }}>
          Find a Mechanic Near You
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Search by location, pick your service, and connect with a verified mechanic in under 60 seconds.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/search" style={{
            background: "#e63329", color: "#fff", textDecoration: "none",
            padding: "16px 40px", borderRadius: "12px", fontWeight: "800", fontSize: "16px",
            boxShadow: "0 8px 24px rgba(230,51,41,0.4)", transition: "transform 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={e => e.currentTarget.style.transform = "none"}>
            🔍 Find a Mechanic →
          </Link>
          <Link to="/emergency" style={{
            background: "rgba(255,255,255,0.08)", color: "#fff", textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "16px 40px", borderRadius: "12px", fontWeight: "700", fontSize: "16px",
            transition: "background 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
            🚨 Emergency SOS
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Services;
