import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MechanicProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contact: '',
    location: '',
    services: []
  });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem('mechafind_token');

  useEffect(() => {
    if (!token) {
      navigate('/mechanic/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/mechanic/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to load profile.");

        const data = await res.json();
        if (data.success) {
          setProfile({
            ...data.data,
            services: data.data.services.join(', ')
          });
        }
      } catch (err) {
        setError(err.message || "Failed to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch('http://localhost:5000/api/mechanic/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          services: profile.services.split(',').map(s => s.trim()),
          location: profile.location,
          contact: profile.contact,
          password: password
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile.');

      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate('/mechanic/dashboard'), 2000);
    } catch (err) {
      setError(err.message || 'Unable to update profile.');
    } finally {
      setSaving(false);
    }
  };

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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#f8fafc',
      color: '#0f172a',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: '100%', maxWidth: '500px', padding: '40px',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          position: 'relative', zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 10px', color: '#0f172a' }}>Edit Profile</h2>
            <p style={{ color: '#64748b', margin: 0 }}>Update your mechanic information.</p>
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

          {success && (
            <div style={{
              background: '#d1fae5', border: '1px solid #a7f3d0', color: '#065f46',
              borderRadius: '10px', padding: '12px 16px', fontSize: '14px',
              marginBottom: '20px', fontWeight: '500'
            }}>
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Name</label>
              <input
                type="text" name="name" value={profile.name} onChange={handleChange}
                placeholder="John Doe" style={{...inputStyle, background: '#f1f5f9'}} disabled
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Email</label>
              <input
                type="email" name="email" value={profile.email} onChange={handleChange}
                placeholder="john@example.com" style={{...inputStyle, background: '#f1f5f9'}} disabled
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Contact (Phone)</label>
              <input
                type="text" name="contact" value={profile.contact} onChange={handleChange}
                placeholder="+1 234 567 8900" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Services (comma-separated)</label>
              <input
                type="text" name="services" value={profile.services} onChange={handleChange}
                placeholder="Oil Change, Tire Repair, Battery Replacement" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Location</label>
              <input
                type="text" name="location" value={profile.location} onChange={handleChange}
                placeholder="City, State" style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', paddingLeft: '5px' }}>Confirm Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="Enter current password to save details"
              />
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Required to save changes to your profile.</p>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                type="button"
                onClick={() => navigate('/mechanic/dashboard')}
                style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !password}
                style={{
                  flex: 1,
                  background: (saving || !password) ? '#94a3b8' : '#e63329',
                  color: '#fff', border: 'none', padding: '16px', borderRadius: '12px',
                  fontWeight: '700', fontSize: '16px',
                  cursor: (saving || !password) ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {saving ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={() => navigate('/mechanic/dashboard')} style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>← Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MechanicProfile;