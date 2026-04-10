import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero_home.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';
import service4 from '../assets/service4.jpg';
import Footer from './footer';

function Home() {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    { num: '01', icon: '📍', title: 'Search Nearby', desc: 'Enter your location to instantly find verified mechanics within your area.' },
    { num: '02', icon: '🔍', title: 'Choose & Request', desc: 'Browse profiles, check specializations, and send a service request.' },
    { num: '03', icon: '🛠️', title: 'Get Serviced', desc: 'The mechanic arrives and fixes your vehicle on-site or at their workshop.' },
    { num: '04', icon: '🚗', title: 'Back on the Road', desc: 'Pay transparently and continue your journey stress-free.' },
  ];

  return (
    <div style={{ background: '#f8fafc', color: '#0f172a', overflowX: 'hidden', fontFamily: "'Inter', sans-serif" }}>

      {/* ══ HERO SECTION ══════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative', minHeight: '92vh',
        display: 'flex', alignItems: 'center', padding: '0 8%', gap: '60px',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        overflow: 'hidden',
        justifyContent: 'space-between',
      }}>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(10,15,30,0.93) 0%, rgba(10,15,30,0.75) 55%, rgba(10,15,30,0.2) 100%)',
        }} />
        {/* Red accent line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px',
          background: 'linear-gradient(180deg, #e63329 0%, #c8261e 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', color: '#fff', marginTop: '80px', flex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(230,51,41,0.15)', border: '1px solid rgba(230,51,41,0.4)',
            padding: '8px 18px', borderRadius: '50px', marginBottom: '30px',
            position: 'relative', zIndex: 1,
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e63329', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '2px', color: '#fb7166' }}>24/7 ROADSIDE ASSISTANCE ACROSS INDIA</span>
          </div>

          <h1 style={{ fontSize: '4.8rem', fontWeight: '900', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-1px' }}>
            Stranded?<br />
            Find a <span style={{ color: '#e63329' }}>Mechanic</span><br />
            in Minutes.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '44px', maxWidth: '520px' }}>
            MechaFind connects you with the nearest trusted mechanics instantly — whether it's an emergency breakdown or a scheduled repair.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '40px', marginBottom: '44px', flexWrap: 'wrap' }}>
            {[['AP & TG', 'States We Serve'], ['24/7', 'Emergency Support'], ['4.8★', 'Average Rating']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff' }}>{val}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', letterSpacing: '0.5px', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons - Right Side */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '80px', flex: 0.5, minWidth: '220px' }}>
          <Link to="/search" style={{
            background: '#e63329', color: '#fff', textDecoration: 'none',
            padding: '28px 36px', borderRadius: '18px', fontWeight: '900', fontSize: '18px',
            boxShadow: '0 12px 40px rgba(230,51,41,0.5)', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            textAlign: 'center', lineHeight: 1.3,
          }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 50px rgba(230,51,41,0.6)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(230,51,41,0.5)'; }}>
            🔍<br />Find a<br />Mechanic
          </Link>
          <Link to="/emergency" style={{
            background: 'rgba(230,51,41,0.25)', color: '#fff', textDecoration: 'none',
            border: '2px solid rgba(230,51,41,0.5)',
            padding: '28px 36px', borderRadius: '18px', fontWeight: '800', fontSize: '18px',
            backdropFilter: 'blur(12px)', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            textAlign: 'center', lineHeight: 1.3,
          }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(230,51,41,0.35)'; e.currentTarget.style.borderColor = 'rgba(230,51,41,0.8)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(230,51,41,0.25)'; e.currentTarget.style.borderColor = 'rgba(230,51,41,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            🚨<br />Emergency<br />SOS
          </Link>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textAlign: 'center' }}>
          SCROLL DOWN ↓
        </div>
      </div>

      {/* ══ TRUST BAR ══════════════════════════════════════════════════════ */}
      <div style={{ background: '#0f172a', padding: '20px 8%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', alignItems: 'center' }}>
          {['🔧 Verified Mechanics', '📍 Location-Based Search', '⚡ Instant Matching', '🔒 Secure Payments', '⭐ Rated & Reviewed'].map(item => (
            <span key={item} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: '600' }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT MECHAFIND ════════════════════════════════════════════════ */}
      <div style={{ padding: '100px 8%', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>

          {/* Left: Image collage */}
          <div style={{ position: 'relative', height: '560px' }}>
            {/* Main large image */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: '80px', height: '380px',
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}>
              <img src={service2} alt="Mechanic working on a car engine" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.45) 0%, transparent 60%)' }} />
            </div>

            {/* Bottom right secondary image */}
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '240px', height: '220px',
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
              border: '4px solid #fff',
            }}>
              <img src={service3} alt="Car detailing and service" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Floating stat badge */}
            <div style={{
              position: 'absolute', bottom: '40px', left: '20px',
              background: '#0f172a', borderRadius: '16px', padding: '18px 24px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              display: 'flex', alignItems: 'center', gap: '14px',
              zIndex: 2,
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', background: '#e63329',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
              }}>✅</div>
              <div>
                <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.4rem', lineHeight: 1 }}>Growing</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', fontWeight: '600', marginTop: '4px' }}>Customers Served Daily</div>
              </div>
            </div>

            {/* Red accent corner */}
            <div style={{
              position: 'absolute', top: '-16px', left: '-16px',
              width: '60px', height: '60px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #e63329, #c8261e)',
              boxShadow: '0 8px 20px rgba(230,51,41,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px',
            }}>🔧</div>
          </div>

          {/* Right: Content */}
          <div>
            <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '16px' }}>ABOUT MECHAFIND</div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: '0 0 24px' }}>
              India's Most Trusted<br />
              <span style={{ color: '#e63329' }}>Vehicle Service</span> Network
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '20px' }}>
              MechaFind was built with one mission — to eliminate the stress of vehicle breakdowns across India. Whether you're stuck on a highway at midnight or need a weekend service, we connect you with skilled, verified mechanics in minutes.
            </p>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '36px' }}>
              Currently serving Andhra Pradesh and Telangana, covering everything from emergency roadside rescue to full workshop servicing — for cars, bikes, and commercial vehicles. Expanding rapidly.
            </p>

            {/* Values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {[
                ['🛡️', 'Background-Verified Mechanics', 'Every mechanic is screened, certified, and reviewed by real customers before joining our network.'],
                ['📍', 'Hyperlocal Coverage', 'Find a mechanic within 5 km of your exact location, wherever you are in India.'],
                ['💬', 'Transparent Communication', 'Chat with your mechanic, get quotes upfront, and track your service — all in one place.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  background: '#f8fafc', borderRadius: '14px', padding: '16px 20px',
                  border: '1px solid #e2e8f0',
                }}>
                  <div style={{
                    width: '42px', height: '42px', background: '#fef2f2', borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '15px', marginBottom: '4px' }}>{title}</div>
                    <div style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[['AP & TG', 'States Covered'], ['Growing', 'Mechanic Network'], ['4.8★', 'Avg. Rating']].map(([num, label]) => (
                <div key={label} style={{
                  textAlign: 'center', padding: '20px 10px',
                  background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '14px',
                }}>
                  <div style={{ fontSize: '1.7rem', fontWeight: '900', color: '#e63329' }}>{num}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: '600', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ WHY MECHAFIND (FEATURE SPLIT) ══════════════════════════════════ */}
      <div style={{ display: 'flex', minHeight: '580px', overflow: 'hidden' }}>
        {/* Left image — mechanic actively working on car engine */}
        <div style={{
          flex: 1, minHeight: '480px',
          backgroundImage: `url(${service2})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,15,30,0.45)' }} />
          <div style={{
            position: 'absolute', bottom: '40px', left: '40px', right: '40px',
            background: 'rgba(230,51,41,0.92)', borderRadius: '14px', padding: '20px 24px',
          }}>
            <div style={{ color: '#fff', fontWeight: '800', fontSize: '1.1rem' }}>Expert Mechanics, Ready Now</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginTop: '4px' }}>All mechanics on MechaFind are verified and background-checked.</div>
          </div>
        </div>

        {/* Right content */}
        <div style={{ flex: 1.2, background: '#fff', padding: '70px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '16px' }}>WHY MECHAFIND</div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.2, margin: '0 0 20px' }}>
            The smarter way to handle vehicle trouble.
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '36px' }}>
            Whether you're stuck on a highway or need a routine service, MechaFind puts skilled mechanics at your fingertips — no middlemen, no guesswork.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              ['⚡', 'Instant Connection', 'Reach mechanics in your area in under 60 seconds.'],
              ['📋', 'Transparent Pricing', 'No hidden charges — get estimated quotes before booking.'],
              ['🛡️', 'Trusted Network', 'Every mechanic is rated and reviewed by real customers.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px', height: '44px', background: '#fef2f2', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '15px', marginBottom: '4px' }}>{title}</div>
                  <div style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════ */}
      <div style={{ padding: '100px 8%', background: '#f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>THE PROCESS</div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', margin: '0 0 16px' }}>How It Works</h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>From breakdown to back on the road in 4 simple steps.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {steps.map((step, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
              style={{
                background: hoveredStep === i ? '#e63329' : '#fff',
                borderRadius: '20px', padding: '36px 28px',
                boxShadow: hoveredStep === i ? '0 20px 40px rgba(230,51,41,0.3)' : '0 4px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease', cursor: 'default',
                border: `1px solid ${hoveredStep === i ? '#e63329' : '#e2e8f0'}`,
                transform: hoveredStep === i ? 'translateY(-6px)' : 'none',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span style={{ fontSize: '2rem' }}>{step.icon}</span>
                <span style={{ fontSize: '3rem', fontWeight: '900', color: hoveredStep === i ? 'rgba(255,255,255,0.2)' : '#f1f5f9', lineHeight: 1 }}>{step.num}</span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: hoveredStep === i ? '#fff' : '#0f172a', margin: '0 0 10px' }}>{step.title}</h4>
              <p style={{ color: hoveredStep === i ? 'rgba(255,255,255,0.8)' : '#64748b', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES SECTION ═══════════════════════════════════════════════ */}
      <div style={{ padding: '100px 8%', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>WHAT WE COVER</div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', margin: '0 0 16px' }}>Services Available</h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>From emergency rescues to full servicing — our mechanics handle it all.</p>
        </div>

        {/* Bento-style image grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '300px 300px', gap: '16px', maxWidth: '1100px', margin: '0 auto' }}>

          {/* Tall left card — Mechanic under car hood (Roadside Rescue) */}
          <div style={{
            gridRow: '1 / 3', gridColumn: '1',
            backgroundImage: `url(${service2})`,
            backgroundSize: 'cover', backgroundPosition: 'center top',
            borderRadius: '20px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0) 55%)' }} />
            <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px' }}>
              <div style={{ background: '#e63329', color: '#fff', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '10px' }}>EMERGENCY</div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '800', margin: '0 0 6px' }}>Roadside Rescue</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>Flat tyre, battery dead, engine failure — we come to you.</p>
            </div>
          </div>

          {/* Top middle — Car being serviced/washed */}
          <div style={{
            backgroundImage: `url(${service3})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            borderRadius: '20px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 70%)' }} />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <div style={{ background: '#0ea5e9', color: '#fff', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>SERVICING</div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Full Car Service</h3>
            </div>
          </div>

          {/* Top right — Dark card with instant match CTA */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: '3rem' }}>⚡</div>
            <div>
              <div style={{ color: '#e63329', fontWeight: '700', fontSize: '12px', letterSpacing: '1.5px', marginBottom: '10px' }}>INSTANT</div>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', margin: '0 0 10px' }}>60-Second Matching</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>Our system finds the nearest available mechanic in under a minute.</p>
            </div>
            <Link to="/search" style={{
              background: '#e63329', color: '#fff', textDecoration: 'none',
              padding: '12px 20px', borderRadius: '10px', fontWeight: '700', fontSize: '14px',
              display: 'inline-block', textAlign: 'center',
            }}>
              Find Now →
            </Link>
          </div>

          {/* Bottom middle — Car on highway */}
          <div style={{
            backgroundImage: `url(${service4})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            borderRadius: '20px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 70%)' }} />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <div style={{ background: '#10b981', color: '#fff', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>ALL VEHICLES</div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>2-Wheeler & 4-Wheeler</h3>
            </div>
          </div>

          {/* Bottom right — Stats */}
          <div style={{
            background: '#fef2f2', borderRadius: '20px', padding: '32px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
            border: '1px solid #fecaca',
          }}>
            {[['4.8★', 'Avg. Mechanic Rating'], ['24/7', 'Emergency Support'], ['Verified', 'All Mechanics']].map(([num, label]) => (
              <div key={label} style={{ borderBottom: '1px solid #fecaca', paddingBottom: '16px' }}>
                <div style={{ fontSize: '1.9rem', fontWeight: '900', color: '#e63329' }}>{num}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ REVIEWS ═══════════════════════════════════════════════════════ */}
      <div style={{ padding: '100px 8%', background: '#0f172a' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>TESTIMONIALS</div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', margin: 0 }}>What Our Customers Say</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Reliable & Fast', review: "I had a flat tyre early morning on the highway and didn't know what to do. MechaFind's mechanic arrived in 20 minutes and fixed everything on the spot. Absolutely brilliant service!", name: 'Aditya R.', city: 'Vijayawada, AP', rating: '⭐⭐⭐⭐⭐' },
            { title: 'Saved Our Trip', review: "My car broke down near Gachibowli. MechaFind sent a mechanic faster than I expected. Very professional, fair price, and sorted the issue in no time. Cannot recommend enough!", name: 'Priya S.', city: 'Hyderabad, TG', rating: '⭐⭐⭐⭐⭐' },
            { title: 'Great Experience', review: "Used MechaFind for a routine engine check in Vizag. The mechanic arrived on time, was very knowledgeable, and explained everything clearly. Will definitely use again!", name: 'Ravi K.', city: 'Visakhapatnam, AP', rating: '⭐⭐⭐⭐⭐' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px', padding: '32px',
              transition: 'background 0.2s',
            }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
              <div style={{ fontSize: '16px', marginBottom: '12px' }}>{item.rating}</div>
              <h4 style={{ color: '#fff', fontWeight: '800', fontSize: '1.1rem', margin: '0 0 12px' }}>{item.title}</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.8, margin: '0 0 24px' }}>"{item.review}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', background: '#e63329',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: '800', fontSize: '16px',
                }}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>{item.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{item.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CTA ══════════════════════════════════════════════════════════ */}
      {/* Using service4 (black car on highway) — a fitting "back on the road" image */}
      <div style={{
        padding: '120px 8%', textAlign: 'center',
        backgroundImage: `url(${service4})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(230,51,41,0.88)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', margin: '0 0 20px', lineHeight: 1.2 }}>
            Ready to Get Back<br />on the Road?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '520px', margin: '0 auto 44px', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Join drivers and mechanics already on MechaFind — building India's most reliable vehicle service network, one city at a time.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/search" style={{
              background: '#fff', color: '#e63329', textDecoration: 'none',
              padding: '16px 36px', borderRadius: '12px', fontWeight: '800', fontSize: '16px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)', transition: 'transform 0.2s',
            }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}>
              🔍 Find a Mechanic
            </Link>
            <Link to="/register" style={{
              background: 'transparent', color: '#fff', textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.6)',
              padding: '16px 36px', borderRadius: '12px', fontWeight: '700', fontSize: '16px',
              transition: 'all 0.2s',
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}>
              Join as Mechanic
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;