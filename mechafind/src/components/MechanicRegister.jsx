import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroBg from '../assets/hero_bg.png';

function MechanicRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [services, setServices] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const inputStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    color: '#0f172a',
    fontSize: '15px',
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#e63329';
    e.target.style.boxShadow = '0 0 0 3px rgba(230,51,41,0.1)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = '#e2e8f0';
    e.target.style.boxShadow = 'none';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/mechanic/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, contact, services: services.split(',').map(s => s.trim()), location }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      // Save JWT to localStorage
      localStorage.setItem('mechafind_token', data.data.token);
      localStorage.setItem('mechafind_mechanic', JSON.stringify(data.data.mechanic));

      navigate('/mechanic/dashboard');
    } catch (error) {
      console.error(error);
      setError('Cannot reach server. Please make sure the backend is running on port 5000.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#f8fafc',
      color: '#0f172a',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Left split - Image / Branding */}
      <div style={{
        flex: 1,
        display: 'flex',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(230, 51, 41, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
        }} />
        <div style={{
          position: 'relative', zIndex: 1, padding: '60px', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px', lineHeight: 1.1, color: '#fff' }}>
            Join MechaFind as a <br /><span style={{ color: '#fff' }}>Mechanic</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', maxWidth: '400px' }}>
            Register your mechanic account and start helping customers get back on the road.
          </p>
        </div>
      </div>

      {/* Right split - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: '100%', maxWidth: '420px', padding: '40px',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          position: 'relative', zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 10px', color: '#0f172a' }}>Mechanic Registration</h2>
            <p style={{ color: '#64748b', margin: 0 }}>Create your mechanic account.</p>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
              borderRadius: '10px', padding: '12px 16px', fontSize: '14px',
              marginBottom: '20px', fontWeight: '500'
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Name</label>
              <input
                required type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="John Doe" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Email</label>
              <input
                required type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Password</label>
              <input
                required type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Contact (Phone)</label>
              <input
                required type="text" value={contact} onChange={e => setContact(e.target.value)}
                placeholder="+1 234 567 8900" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Services (comma-separated)</label>
              <input
                required type="text" value={services} onChange={e => setServices(e.target.value)}
                placeholder="Oil Change, Tire Repair, Battery Replacement" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Location</label>
              <input
                required type="text" value={location} onChange={e => setLocation(e.target.value)}
                placeholder="City, State" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#94a3b8' : '#e63329',
                color: '#fff', border: 'none', padding: '16px', borderRadius: '12px',
                fontWeight: '700', fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '10px', transition: 'background 0.2s'
              }}
              onMouseOver={e => { if (!loading) e.target.style.background = '#c8261e'; }}
              onMouseOut={e => { if (!loading) e.target.style.background = '#e63329'; }}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#64748b', marginTop: '30px', fontSize: '14px' }}>
            Already have an account? <Link to="/mechanic/login" style={{ color: '#0ea5e9', fontWeight: '700', textDecoration: 'none' }}>Sign in</Link>
          </p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MechanicRegister;