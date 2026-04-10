import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';
import heroBg from '../assets/hero_home.jpg';

const team = [
  {
    initials: 'SH',
    name: 'Syed Haroon',
    role: 'Founder & CEO',
    desc: 'Leads the vision and direction of MechaFind. Passionate about solving real-world problems through technology and connecting communities.',
  },
  {
    initials: 'N',
    name: 'Naveed',
    role: 'Co-Founder & CTO',
    desc: 'Drives technical architecture and development. Ensures MechaFind is fast, reliable, and built for scale from day one.',
  },
];

const mvv = [
  {
    icon: '🎯',
    title: 'Our Mission',
    bg: '#fef2f2',
    border: '#fecaca',
    text: 'Make vehicle repair services accessible, transparent, and stress-free for every driver across Andhra Pradesh and Telangana — available 24/7, wherever they are.',
  },
  {
    icon: '🔭',
    title: 'Our Vision',
    bg: '#f0f9ff',
    border: '#bae6fd',
    text: 'To become the most trusted mechanic discovery platform in South India, empowering both vehicle owners and local mechanics to thrive together.',
  },
  {
    icon: '💡',
    title: 'Our Values',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    text: 'Trust, transparency, and speed are non-negotiable. Every mechanic is verified, every price is upfront, and every customer is heard.',
  },
];

const whyUs = [
  { icon: '✅', title: 'Verified Mechanics', desc: 'Every mechanic is background-checked and skill-verified before joining the platform.' },
  { icon: '⚡', title: 'Real-Time Matching', desc: 'Get connected to available mechanics based on your exact location in seconds.' },
  { icon: '🛡️', title: 'Transparent Pricing', desc: 'Know the cost upfront. No hidden charges, no surprises after the job is done.' },
  { icon: '📍', title: 'Hyperlocal Focus', desc: 'We serve specific regions properly rather than spreading thin across the country.' },
  { icon: '⭐', title: 'Rated & Reviewed', desc: 'See honest reviews from real customers before you book any mechanic.' },
  { icon: '🚨', title: '24/7 Emergency SOS', desc: 'Stuck at 2am? Our emergency SOS connects you to nearby mechanics anytime.' },
];

function About() {
  return (
    <>
      <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', background: '#f8fafc' }}>

        {/* ── Hero ── */}
        <section style={{
          position: 'relative', minHeight: '50vh',
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover', backgroundPosition: 'center top',
          display: 'flex', alignItems: 'center', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, rgba(10,15,30,0.94) 0%, rgba(10,15,30,0.72) 60%, rgba(230,51,41,0.25) 100%)',
          }} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: 'linear-gradient(180deg, #e63329, #c8261e)' }} />

          <div style={{ position: 'relative', zIndex: 1, padding: '80px 8%', maxWidth: '760px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'rgba(230,51,41,0.15)', border: '1px solid rgba(230,51,41,0.35)',
              padding: '7px 18px', borderRadius: '50px', marginBottom: '24px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e63329', display: 'inline-block' }} />
              <span style={{ color: '#fb7166', fontSize: '12px', fontWeight: '700', letterSpacing: '2px' }}>WHO WE ARE</span>
            </div>
            <h1 style={{ fontSize: '3.8rem', fontWeight: '900', color: '#fff', lineHeight: 1.05, margin: '0 0 20px', letterSpacing: '-1px' }}>
              Built to End the<br />
              Stress of <span style={{ color: '#e63329' }}>Breakdowns.</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: '560px', margin: 0 }}>
              MechaFind is a vehicle service platform connecting drivers with verified local mechanics — fast, transparently, and reliably, right here in AP & Telangana.
            </p>
          </div>
        </section>

        {/* ── About Us ── */}
        <section style={{ background: '#fff', padding: '100px 8%' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '16px' }}>ABOUT US</div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.2, margin: '0 0 28px' }}>
              Why We Built <span style={{ color: '#e63329' }}>MechaFind</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.85, margin: '0 0 18px' }}>
                  MechaFind was born from a real problem — finding a reliable mechanic when you're stranded is stressful, unpredictable, and time-consuming. There was no easy way to locate a trusted mechanic nearby.
                </p>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.85, margin: 0 }}>
                  We built MechaFind to change that. Our platform connects vehicle owners with verified, skilled mechanics in real-time — making repair services accessible, transparent, and completely stress-free.
                </p>
              </div>
              <div>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.85, margin: '0 0 18px' }}>
                  We started with a focus on doing things right — verifying every mechanic, ensuring upfront pricing, and building something people can genuinely rely on during an emergency.
                </p>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.85, margin: '0 0 28px' }}>
                  Currently operating in Andhra Pradesh and Telangana, we're expanding steadily — city by city, mechanic by mechanic. Every service completed makes our network stronger.
                </p>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link to="/search" style={{
                    background: '#e63329', color: '#fff', textDecoration: 'none',
                    padding: '13px 26px', borderRadius: '10px', fontWeight: '800', fontSize: '14px',
                    boxShadow: '0 6px 18px rgba(230,51,41,0.3)', transition: 'transform 0.2s',
                  }}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}>
                    Find a Mechanic →
                  </Link>
                  <Link to="/partners" style={{
                    background: 'transparent', color: '#0f172a', textDecoration: 'none',
                    border: '2px solid #e2e8f0', padding: '13px 26px', borderRadius: '10px',
                    fontWeight: '700', fontSize: '14px', transition: 'border-color 0.2s',
                  }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#e63329'}
                    onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
                    Become a Partner
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission / Vision / Values ── */}
        <section style={{ background: '#f8fafc', padding: '100px 8%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>OUR FOUNDATION</div>
              <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', margin: '0 0 14px' }}>
                Mission, Vision & Values
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#64748b', margin: 0, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
                The principles that guide every decision we make at MechaFind.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
              {mvv.map((item, i) => (
                <div key={i} style={{
                  background: item.bg, borderRadius: '20px', padding: '36px',
                  border: `1px solid ${item.border}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ fontSize: '44px', marginBottom: '20px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 14px', color: '#0f172a' }}>{item.title}</h3>
                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.78, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Team ── */}
        <section style={{ background: '#fff', padding: '100px 8%' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>THE TEAM</div>
              <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', margin: '0 0 14px' }}>
                Meet Our <span style={{ color: '#e63329' }}>Core Team</span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#64748b', margin: 0 }}>
                The people building MechaFind from the ground up.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
              {team.map((member, i) => (
                <div key={i} style={{
                  background: '#f8fafc', borderRadius: '20px', padding: '32px',
                  border: '1px solid #e2e8f0', display: 'flex', gap: '24px', alignItems: 'flex-start',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.08)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  {/* Avatar with initials */}
                  <div style={{
                    width: '68px', height: '68px', borderRadius: '18px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #e63329 0%, #c8261e 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: '900', fontSize: '22px',
                    boxShadow: '0 8px 20px rgba(230,51,41,0.3)',
                    letterSpacing: '-0.5px',
                  }}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px', color: '#0f172a' }}>
                      {member.name}
                    </h3>
                    <div style={{
                      display: 'inline-block', background: '#fef2f2', color: '#e63329',
                      fontSize: '12px', fontWeight: '700', padding: '3px 12px',
                      borderRadius: '20px', border: '1px solid #fecaca', marginBottom: '12px',
                    }}>
                      {member.role}
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section style={{ background: '#f8fafc', padding: '100px 8%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '12px' }}>THE DIFFERENCE</div>
              <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', margin: '0 0 14px' }}>
                Why Choose <span style={{ color: '#e63329' }}>MechaFind?</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {whyUs.map((item, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: '16px', padding: '28px',
                  border: '1px solid #e2e8f0', transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.07)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px', background: '#fef2f2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', marginBottom: '16px',
                  }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 8px', color: '#0f172a' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '100px 8%', textAlign: 'center',
        }}>
          <div style={{ color: '#e63329', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', marginBottom: '16px' }}>GET STARTED</div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', margin: '0 0 16px' }}>
            Ready to Experience MechaFind?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Find a verified mechanic near you right now, or join us as a partner and grow your workshop business.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/search" style={{
              background: '#e63329', color: '#fff', textDecoration: 'none',
              padding: '16px 36px', borderRadius: '12px', fontWeight: '800', fontSize: '16px',
              boxShadow: '0 8px 24px rgba(230,51,41,0.4)', transition: 'transform 0.2s',
            }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}>
              🔍 Find a Mechanic
            </Link>
            <Link to="/partners" style={{
              background: 'rgba(255,255,255,0.08)', color: '#fff', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '16px 36px', borderRadius: '12px', fontWeight: '700', fontSize: '16px',
              transition: 'background 0.2s',
            }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
              Join as Mechanic
            </Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}

export default About;