import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroBg from '../assets/hero_bg.png';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const inputStyle = {
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    color: '#0f172a',
    width: '100%',
    fontSize: '15px',
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '7px',
    paddingLeft: '2px',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#e63329';
    e.target.style.boxShadow = '0 0 0 3px rgba(230,51,41,0.1)';
    e.target.style.background = '#fff';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = '#e2e8f0';
    e.target.style.boxShadow = 'none';
    e.target.style.background = '#f8fafc';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'Customer',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      localStorage.setItem('mechafind_token', data.token);
      localStorage.setItem('mechafind_user', JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.error(error);
      setError('Cannot reach server. Please make sure the backend is running on port 5000.');
      setLoading(false);
    }
  };

  const features = [
    'Find trusted mechanics instantly',
    'Track your service history',
    'Emergency roadside assistance',
    'Transparent pricing, no surprises',
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
      alignItems: 'flex-start',
    }}>
      {/* Left Panel — Branding (sticky so it stays visible while form scrolls) */}
      <div style={{
        flex: 1,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(230, 51, 41, 0.75) 100%)'
        }} />
        <div style={{
          position: 'relative', zIndex: 1, padding: '60px',
          height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '36px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}>
          {/* Logo */}
          <div>
            <div style={{ color: '#fff', fontWeight: '900', fontSize: '28px', letterSpacing: '-0.5px', marginBottom: '4px' }}>
              Mecha<span style={{ color: '#fb7166' }}>Find</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: '500' }}>India's trusted mechanic network</div>
          </div>

          {/* Headline */}
          <div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', lineHeight: 1.15, margin: '0 0 16px' }}>
              Get back on the road,<br />faster with MechaFind.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '360px', margin: 0 }}>
              Sign up now to request local mechanics, manage service bookings, and get help quickly when you need it most.
            </p>
          </div>

          {/* Features List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(230, 51, 41, 0.3)', border: '1px solid rgba(230,51,41,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px'
                }}>✓</div>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: '500' }}>{f}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '12px', padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'center'
          }}>
            <span style={{ fontSize: '22px' }}>🚗</span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.5 }}>
              Create a customer account to request services, track jobs, and contact mechanics instantly.
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div style={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 20px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          width: '100%', maxWidth: '440px',
          background: '#fff', borderRadius: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.08)',
          padding: '40px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Create Account</h2>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Join MechaFind and get started in minutes.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
              borderRadius: '10px', padding: '12px 16px', fontSize: '14px',
              marginBottom: '20px', fontWeight: '500'
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ paddingLeft: '2px', marginBottom: '16px' }}>
              <label style={labelStyle}>Register as</label>
              <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.7 }}>
                Customer account. If you are a mechanic, please register through the dedicated <Link to="/mechanic/register" style={{ color: '#0ea5e9', fontWeight: '700', textDecoration: 'none' }}>mechanic portal</Link>.
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label style={labelStyle}>Full Name</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="E.g. Aditya Reddy" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="aditya@example.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>


            {/* Submit Button */}
            <button type="submit" disabled={loading} style={{
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #e63329 0%, #c8261e 100%)',
              color: '#fff', border: 'none', padding: '16px',
              borderRadius: '12px', fontWeight: '700', fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer', marginTop: '6px',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(230, 51, 41, 0.35)',
              letterSpacing: '0.3px'
            }}
              onMouseOver={e => { if (!loading) e.target.style.transform = 'translateY(-1px)'; }}
              onMouseOut={e => { e.target.style.transform = 'translateY(0)'; }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#64748b', marginTop: '24px', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#e63329', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
          </p>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <Link to="/" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
