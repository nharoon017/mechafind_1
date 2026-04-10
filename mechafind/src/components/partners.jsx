import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import heroBg from "../assets/hero_home.jpg";

const benefits = [
  { icon: "📲", title: "Real-Time Requests", desc: "Receive live service requests from customers near your workshop, straight to your dashboard." },
  { icon: "⭐", title: "Build Your Reputation", desc: "Collect ratings and reviews from every job. A strong profile means more bookings." },
  { icon: "💰", title: "More Revenue", desc: "Fill your calendar with verified customers. No more waiting — MechaFind sends them to you." },
  { icon: "🛡️", title: "Verified Badge", desc: "Every partner mechanic gets a 'MechaFind Verified' badge, boosting trust with customers." },
  { icon: "📊", title: "Business Dashboard", desc: "Track your earnings, jobs, response rate, and customer history all in one place." },
  { icon: "🚀", title: "Zero Commission to Start", desc: "New partners join commission-free to help you get started and build your customer base on MechaFind." },
];

const faqs = [
  { q: "Is it free to join as a partner?", a: "Yes! Registering on MechaFind as a mechanic is completely free. We only charge a small service fee after you complete 50 jobs." },
  { q: "How do I receive service requests?", a: "Once you register and log in, your Mechanic Dashboard will show all incoming requests from customers in your area in real time." },
  { q: "Can I set my own availability?", a: "Absolutely. You can toggle your status Online or Offline from your dashboard at any time." },
  { q: "What areas do you operate in?", a: "MechaFind currently operates in Andhra Pradesh and Telangana. We are expanding to more cities and states — stay tuned!" },
];

const stats = [
  { value: "AP & TG", label: "States We Operate In" },
  { value: "Growing", label: "Mechanic Network" },
  { value: "4.8★", label: "Avg. Mechanic Rating" },
  { value: "24/7", label: "Emergency Coverage" },
];

function Partners() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <div style={{ fontFamily: "'Inter', sans-serif", color: "#0f172a", background: "#f8fafc" }}>

        {/* ── Hero Section ── */}
        <section style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,41,59,0.75) 55%, rgba(230,51,41,0.45) 100%), url(${heroBg})`,
          backgroundSize: "cover", backgroundPosition: "center top",
          color: "#fff", textAlign: "center", padding: "100px 8% 80px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(230,51,41,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 40%)",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}>
            <div style={{
              display: "inline-block", background: "rgba(230,51,41,0.2)", border: "1px solid rgba(230,51,41,0.4)",
              color: "#fb7166", padding: "7px 20px", borderRadius: "20px", fontSize: "13px",
              fontWeight: "700", marginBottom: "24px", letterSpacing: "0.5px"
            }}>
              🤝 BECOME A PARTNER
            </div>
            <h1 style={{ fontSize: "3.8rem", fontWeight: "900", margin: "0 0 20px", lineHeight: 1.1 }}>
              Grow Your Workshop <br />
              <span style={{ color: "#fb7166" }}>with MechaFind</span>
            </h1>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.7 }}>
              Join India's fastest-growing mechanic network and get a steady flow of verified service requests directly to your dashboard — for free.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/register" style={{
                background: "#e63329", color: "#fff", textDecoration: "none",
                padding: "16px 36px", borderRadius: "12px", fontWeight: "800", fontSize: "16px",
                boxShadow: "0 8px 24px rgba(230,51,41,0.4)", transition: "transform 0.2s"
              }}
                onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                Register as a Mechanic →
              </Link>
              <a href="#how-it-works" style={{
                background: "rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none",
                padding: "16px 36px", borderRadius: "12px", fontWeight: "700", fontSize: "16px",
                border: "1px solid rgba(255,255,255,0.2)", transition: "background 0.2s"
              }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section style={{ background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{
            maxWidth: "1100px", margin: "0 auto", padding: "40px 8%",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "30px"
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.6rem", fontWeight: "900", color: "#e63329", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "14px", color: "#64748b", fontWeight: "600", marginTop: "8px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Benefits Section ── */}
        <section style={{ padding: "100px 8%", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "2.8rem", fontWeight: "900", margin: "0 0 16px" }}>
              Why Partner with <span style={{ color: "#e63329" }}>MechaFind?</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "550px", margin: "0 auto" }}>
              Everything you need to run a modern, thriving workshop — all in one platform.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
            {benefits.map((b, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: "20px", padding: "32px",
                border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(0,0,0,0.12)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.04)"; }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "28px", marginBottom: "20px",
                  border: "1px solid #fecaca"
                }}>{b.icon}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "800", margin: "0 0 10px" }}>{b.title}</h3>
                <p style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" style={{ background: "#0f172a", padding: "100px 8%", color: "#fff" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2.8rem", fontWeight: "900", margin: "0 0 16px" }}>
              How It <span style={{ color: "#fb7166" }}>Works</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginBottom: "64px" }}>
              Getting started takes less than 5 minutes.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px" }}>
              {[
                { step: "01", title: "Create Your Account", desc: "Sign up for free as a Mechanic and fill in your workshop details." },
                { step: "02", title: "Go Online", desc: "Toggle your status to 'Online' on your dashboard to start receiving live requests." },
                { step: "03", title: "Accept Jobs", desc: "Review incoming requests and accept the ones that suit you." },
                { step: "04", title: "Get Paid", desc: "Complete the job, mark it done, and watch your earnings and ratings grow." },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #e63329, #c8261e)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", fontSize: "1.1rem", fontWeight: "900",
                    boxShadow: "0 8px 24px rgba(230,51,41,0.4)"
                  }}>{item.step}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", margin: "0 0 10px" }}>{item.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section style={{ padding: "100px 8%", background: "#f8fafc" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "2.8rem", fontWeight: "900", margin: "0 0 16px" }}>
                Trusted by <span style={{ color: "#e63329" }}>Mechanics Across India</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
              {[
                { name: "Ramesh Kumar", city: "Vijayawada, AP", rating: "⭐⭐⭐⭐⭐", quote: "MechaFind changed my business completely. I used to wait for customers to walk in — now my calendar is always full!" },
                { name: "Suresh Babu", city: "Hyderabad, TG", rating: "⭐⭐⭐⭐⭐", quote: "Within the first week, I got 12 new customers from MechaFind. The dashboard is super easy to use." },
                { name: "Anil Yadav", city: "Guntur, AP", rating: "⭐⭐⭐⭐★", quote: "I love how I can toggle my availability on or off. MechaFind gives me control over my own time and income." },
              ].map((t, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: "20px", padding: "32px",
                  border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04)"
                }}>
                  <div style={{ fontSize: "18px", marginBottom: "16px" }}>{t.rating}</div>
                  <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic" }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #e63329, #c8261e)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: "800", fontSize: "16px"
                    }}>{t.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: "800", fontSize: "15px" }}>{t.name}</div>
                      <div style={{ fontSize: "13px", color: "#64748b" }}>📍 {t.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section style={{ padding: "80px 8%", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", margin: "0 0 12px" }}>Frequently Asked <span style={{ color: "#e63329" }}>Questions</span></h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0",
                overflow: "hidden", transition: "box-shadow 0.2s",
                boxShadow: openFaq === i ? "0 8px 24px -4px rgba(0,0,0,0.1)" : "none"
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: "100%", padding: "22px 28px", background: "none", border: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", textAlign: "left",
                }}>
                  <span style={{ fontWeight: "700", fontSize: "16px", color: "#0f172a" }}>{faq.q}</span>
                  <span style={{
                    fontSize: "20px", color: "#e63329", fontWeight: "700",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s", flexShrink: 0, marginLeft: "16px"
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 28px 22px", color: "#64748b", fontSize: "15px", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{
          background: "linear-gradient(135deg, #e63329 0%, #c8261e 100%)",
          padding: "80px 8%", textAlign: "center", color: "#fff"
        }}>
          <h2 style={{ fontSize: "3rem", fontWeight: "900", margin: "0 0 16px" }}>Ready to Grow Your Business?</h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", margin: "0 0 40px" }}>
            Join mechanics across AP & Telangana who are already growing their business with MechaFind.
          </p>
          <Link to="/register" style={{
            background: "#fff", color: "#e63329", textDecoration: "none",
            padding: "18px 48px", borderRadius: "14px", fontWeight: "900", fontSize: "17px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)", transition: "transform 0.2s"
          }}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
            Get Started for Free →
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Partners;