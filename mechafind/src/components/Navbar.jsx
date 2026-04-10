import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

function CustomNavbar() {
  const location = useLocation();
  const userRaw = localStorage.getItem('mechafind_user');
  const user = userRaw ? JSON.parse(userRaw) : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    vehicleType: user?.vehicleType || '',
    vehicleNumber: user?.vehicleNumber || '',

    serviceLocation: user?.serviceLocation || '',
    services: user?.services ? (Array.isArray(user.services) ? user.services.join(', ') : user.services) : '',
    location: user?.location || '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (location.pathname.startsWith('/mechanic')) {
    return null;
  }

  const confirmLogout = () => setShowLogoutConfirm(true);

  const handleLogout = () => {
    localStorage.removeItem('mechafind_token');
    localStorage.removeItem('mechafind_user');
    setShowLogoutConfirm(false);
    window.location.href = '/';
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      setError('Password is required to confirm changes.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let endpoint = 'http://localhost:5000/api/users/profile';
      let body = {
        userId: user.id,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        vehicleType: formData.vehicleType,
        vehicleNumber: formData.vehicleNumber,
        serviceLocation: formData.serviceLocation
      };

      if (user.role === 'Mechanic') {
        body = {
          userId: user.id,
          password: formData.password,
          services: formData.services.split(',').map(s => s.trim()),
          location: formData.location,
          contact: formData.contact
        };
      }

      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (res.ok) {
        let updatedUser = { ...user };
        if (user.role === 'Mechanic') {
          updatedUser = {
            ...user,
            services: formData.services,
            location: formData.location,
            contact: formData.contact,
          };
        } else {
          updatedUser = {
            ...user,
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            vehicleType: formData.vehicleType,
            vehicleNumber: formData.vehicleNumber,
            workshopName: formData.workshopName,
            serviceLocation: formData.serviceLocation,
            ...(data.user || {}),
          };
        }
        localStorage.setItem('mechafind_user', JSON.stringify(updatedUser));
        setIsModalOpen(false);
        setFormData({ ...formData, password: '' });
        alert('Profile updated successfully!');
        window.location.reload();
      } else {
        setError(data.error || data.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: '11px 14px', borderRadius: '10px',
    border: '1px solid #e2e8f0', background: '#f8fafc',
    fontSize: '14px', color: '#0f172a', fontWeight: '500',
    width: '100%', boxSizing: 'border-box',
    outline: 'none', transition: 'border 0.2s, box-shadow 0.2s',
    fontFamily: "'Inter', sans-serif",
  };
  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: '700',
    color: '#475569', marginBottom: '5px', paddingLeft: '2px',
  };
  const handleFocus = (e) => { e.target.style.borderColor = '#e63329'; e.target.style.boxShadow = '0 0 0 3px rgba(230,51,41,0.08)'; };
  const handleBlur = (e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; };

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        padding: '16px 8%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #eff2f5'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Link to={user?.role === 'Mechanic' ? '/mechanic/dashboard' : '/'} style={{ textDecoration: 'none', color: '#111827', fontWeight: '900', fontSize: '24px', letterSpacing: '-0.5px' }}>
            Mecha<span style={{ color: '#e63329' }}>Find</span>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: '20px', marginLeft: '20px' }}>
            {user?.role !== 'Mechanic' && ['Home', 'Partners', 'Services', 'About']
              .map((item) => (
                <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} style={{
                  color: '#4b5563', textDecoration: 'none', fontSize: '15px', fontWeight: '600', transition: 'color 0.2s'
                }} onMouseOver={e => e.target.style.color = '#e63329'} onMouseOut={e => e.target.style.color = '#4b5563'}>
                  {item}
                </Link>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Clickable phone number */}
          <a href="tel:+916304802263" style={{
            color: '#6b7280', fontSize: '14px', fontWeight: '600',
            display: 'flex', alignItems: 'center', gap: '8px',
            textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseOver={e => e.currentTarget.style.color = '#e63329'}
            onMouseOut={e => e.currentTarget.style.color = '#6b7280'}>
            <span>📞</span> +91 6304802263
          </a>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setIsModalOpen(true)}
                title="Edit Profile"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: '#f1f5f9', padding: '8px 14px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={e => e.currentTarget.style.background = '#f1f5f9'}
              >
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e63329 0%, #c8261e 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: '700', fontSize: '13px'
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{user.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{user.role}</div>
                </div>
              </button>

              {user.role === 'Mechanic' && (
                <Link to="/mechanic/dashboard" style={{
                  color: '#e63329', textDecoration: 'none', fontSize: '13px',
                  fontWeight: '700', padding: '8px 14px', borderRadius: '8px',
                  border: '1px solid #fecaca', background: '#fef2f2', transition: 'all 0.2s'
                }}
                  onMouseOver={e => { e.target.style.background = '#e63329'; e.target.style.color = '#fff'; }}
                  onMouseOut={e => { e.target.style.background = '#fef2f2'; e.target.style.color = '#e63329'; }}>
                  Dashboard
                </Link>
              )}

              {user.role === 'Customer' && (
                <Link to="/customer-dashboard" style={{
                  color: '#e63329', textDecoration: 'none', fontSize: '13px',
                  fontWeight: '700', padding: '8px 14px', borderRadius: '8px',
                  border: '1px solid #fecaca', background: '#fef2f2', transition: 'all 0.2s'
                }}
                  onMouseOver={e => { e.target.style.background = '#e63329'; e.target.style.color = '#fff'; }}
                  onMouseOut={e => { e.target.style.background = '#fef2f2'; e.target.style.color = '#e63329'; }}>
                  Dashboard
                </Link>
              )}

              {/* Logout → triggers confirm dialog */}
              <button onClick={confirmLogout} style={{
                background: 'transparent', color: '#64748b', border: '1px solid #e2e8f0',
                padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '13px',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
                onMouseOver={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#dc2626'; }}
                onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#64748b'; }}>
                Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link to="/register" style={{
                color: '#475569', textDecoration: 'none',
                padding: '10px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '14px',
                border: '1px solid #e2e8f0', transition: 'all 0.2s', background: '#fff'
              }}
                onMouseOver={e => { e.target.style.borderColor = '#e63329'; e.target.style.color = '#e63329'; }}
                onMouseOut={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.color = '#475569'; }}>
                Sign Up
              </Link>
              <Link to="/login" style={{
                background: '#e63329', color: '#fff', textDecoration: 'none',
                padding: '10px 24px', borderRadius: '8px', fontWeight: '700', fontSize: '14px',
                boxShadow: '0 4px 12px rgba(230, 51, 41, 0.25)', transition: 'transform 0.2s'
              }} onMouseOver={e => e.target.style.transform = 'translateY(-2px)'} onMouseOut={e => e.target.style.transform = 'translateY(0)'}>
                Sign In
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ── Logout Confirmation Dialog ── */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '36px 32px',
            maxWidth: '380px', width: '90%', textAlign: 'center',
            boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>👋</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px' }}>
              Logging out?
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, margin: '0 0 28px' }}>
              Are you sure you want to log out of your MechaFind account?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1, padding: '13px', borderRadius: '10px',
                  background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0',
                  fontWeight: '700', cursor: 'pointer', fontSize: '14px',
                }}
                onMouseOver={e => e.target.style.background = '#e2e8f0'}
                onMouseOut={e => e.target.style.background = '#f1f5f9'}>
                No, Stay
              </button>
              <button
                onClick={handleLogout}
                style={{
                  flex: 1, padding: '13px', borderRadius: '10px',
                  background: '#e63329', color: '#fff', border: 'none',
                  fontWeight: '700', cursor: 'pointer', fontSize: '14px',
                  boxShadow: '0 4px 14px rgba(230,51,41,0.35)',
                }}
                onMouseOver={e => e.target.style.background = '#c8261e'}
                onMouseOut={e => e.target.style.background = '#e63329'}>
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Profile Modal ── */}
      {isModalOpen && user && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            background: '#fff', width: '100%', maxWidth: '480px',
            borderRadius: '20px', padding: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>Edit Profile</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >×</button>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', border: '1px solid #fecaca' }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Locked Email */}
              <div>
                <label style={labelStyle}>Email (Locked)</label>
                <input disabled type="text" value={user.email} style={{ ...inputStyle, background: '#e2e8f0', color: '#64748b', cursor: 'not-allowed' }} />
              </div>

              {/* Full Name */}
              <div>
                <label style={labelStyle}>Full Name</label>
                <input required type="text" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                  placeholder="Your full name" />
              </div>

              {/* Phone Number */}
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                  placeholder="+91 98765 43210" />
              </div>

              {/* Address */}
              <div>
                <label style={labelStyle}>Address</label>
                <input type="text" value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                  placeholder="e.g. Benz Circle, Vijayawada" />
              </div>

              {/* Customer-only: Vehicle fields */}
              {user.role === 'Customer' && (
                <>
                  <div>
                    <label style={labelStyle}>Vehicle Type</label>
                    <input type="text" value={formData.vehicleType}
                      onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
                      style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="e.g. Car, Bike, SUV" />
                  </div>
                  <div>
                    <label style={labelStyle}>Vehicle Number</label>
                    <input type="text" value={formData.vehicleNumber}
                      onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value })}
                      style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="e.g. AP 09 AB 1234" />
                  </div>
                </>
              )}

              {/* Mechanic-only: Workshop fields */}
              {user.role === 'Mechanic' && (
                <>
                  <div>
                    <label style={labelStyle}>Services (comma-separated)</label>
                    <input required type="text" value={formData.services}
                      onChange={e => setFormData({ ...formData, services: e.target.value })}
                      style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="Oil Change, Tire Repair, Battery Replacement" />
                  </div>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <input required type="text" value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                      placeholder="City, State" />
                  </div>
                </>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />

              {/* Password confirm */}
              <div>
                <label style={{ ...labelStyle, color: '#e63329' }}>Enter Current Password to Save</label>
                <input required type="password" value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Current password"
                  style={{ ...inputStyle, borderColor: '#fecaca' }}
                  onFocus={handleFocus} onBlur={e => { e.target.style.borderColor = '#fecaca'; e.target.style.boxShadow = 'none'; }} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{
                  flex: 1, padding: '13px', borderRadius: '10px', background: '#f1f5f9', color: '#64748b',
                  border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '14px'
                }}>Cancel</button>
                <button type="submit" disabled={loading} style={{
                  flex: 1, padding: '13px', borderRadius: '10px', background: loading ? '#94a3b8' : '#e63329', color: '#fff',
                  border: 'none', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14px',
                  boxShadow: loading ? 'none' : '0 4px 14px rgba(230,51,41,0.3)',
                }}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomNavbar;