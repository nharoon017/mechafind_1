import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SearchMechanic() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [mechanics, setMechanics] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const userRaw = localStorage.getItem('mechafind_user');
  const user = userRaw ? JSON.parse(userRaw) : null;

  // Request form state
  const [reqName, setReqName] = useState(user?.name || "");
  const [reqPhone, setReqPhone] = useState("");
  const [reqVehicle, setReqVehicle] = useState("");
  const [reqIssue, setReqIssue] = useState("");
  const [customerLatitude, setCustomerLatitude] = useState(null);
  const [customerLongitude, setCustomerLongitude] = useState(null);
  const [locationShared, setLocationShared] = useState(false);
  const [geoStatus, setGeoStatus] = useState('Location not shared yet.');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    setError("");
    setHasSearched(true);
    setMechanics([]);

    try {
      const res = await fetch(
        `http://localhost:5000/api/mechanics?location=${encodeURIComponent(location.trim())}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch mechanics.");
      } else {
        setMechanics(data.mechanics);
      }
    } catch (err) {
      console.error(err);
      setError("Cannot reach server. Make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('Geolocation is not supported by your browser.');
      return;
    }
    setGeoStatus('Requesting location...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCustomerLatitude(position.coords.latitude);
        setCustomerLongitude(position.coords.longitude);
        setLocationShared(true);
        setGeoStatus('Location shared successfully.');
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationShared(false);
        setGeoStatus('Could not get location. Please allow location access.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!selectedMechanic) return;
    if (!user || user.role !== 'Customer') {
      alert('Please login as a customer before sending a request.');
      return;
    }
    if (customerLatitude == null || customerLongitude == null) {
      alert('Please share your location so the mechanic can find you.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mechanicId: selectedMechanic.id,
          customerId: user.id,
          customerName: reqName || user.name,
          customerPhone: reqPhone,
          customerLatitude,
          customerLongitude,
          customerLocation: location.trim() || 'Current location',
          vehicle: reqVehicle,
          issue: reqIssue
        })
      });

      if (res.ok) {
        setRequestSent(true);
        setTimeout(() => {
          setRequestSent(false);
          setSelectedMechanic(null);
          setReqName(user.name || "");
          setReqPhone("");
          setReqVehicle("");
          setReqIssue("");
          setCustomerLatitude(null);
          setCustomerLongitude(null);
          setLocationShared(false);
          setGeoStatus('Location not shared yet.');
          navigate('/customer-dashboard');
        }, 1200);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to send request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Could not reach the server. Please check your connection.');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px',
    color: '#0f172a', background: '#f8fafc', boxSizing: 'border-box',
    transition: 'border 0.2s, box-shadow 0.2s', fontFamily: "'Inter', sans-serif",
  };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' };
  const handleFocus = (e) => { e.target.style.borderColor = '#e63329'; e.target.style.boxShadow = '0 0 0 3px rgba(230,51,41,0.1)'; };
  const handleBlur = (e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc', color: '#0f172a',
      paddingTop: '80px', paddingBottom: '80px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '40px', padding: '0 20px' }}>
        <div style={{
          display: 'inline-block', background: '#fef2f2', color: '#e63329',
          padding: '6px 16px', borderRadius: '20px', fontSize: '13px',
          fontWeight: '700', marginBottom: '16px', border: '1px solid #fecaca'
        }}>
          🔍 Live Search
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '900', margin: '0 0 16px', lineHeight: 1.15 }}>
          Find a <span style={{ color: '#e63329' }}>Mechanic</span> Nearby
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0, lineHeight: 1.6 }}>
          Enter your city or area to find verified mechanics registered in your locality — in real time.
        </p>
      </div>

      {/* ── Search Box ── */}
      <form onSubmit={handleSearch} style={{
        background: '#fff', padding: '24px 30px', borderRadius: '20px',
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0',
        width: '90%', maxWidth: '800px', display: 'flex', gap: '16px', flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ flex: '1 1 300px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>📍</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter full address or area (e.g. MG Road, Vijayawada)"
            style={{
              width: '100%', padding: '16px 20px 16px 48px',
              borderRadius: '12px', border: '2px solid #e2e8f0',
              background: '#f8fafc', color: '#0f172a',
              fontSize: '15px', outline: 'none', boxSizing: 'border-box',
              transition: 'border 0.2s, box-shadow 0.2s', fontFamily: "'Inter', sans-serif",
            }}
            onFocus={(e) => { e.target.style.borderColor = '#e63329'; e.target.style.boxShadow = '0 0 0 4px rgba(230,51,41,0.1)'; e.target.style.background = '#fff'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
          />
        </div>
        <button type="submit" disabled={loading} style={{
          flex: '0 0 auto', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #e63329 0%, #c8261e 100%)',
          color: '#fff', border: 'none', padding: '16px 36px', borderRadius: '12px',
          fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px',
          boxShadow: loading ? 'none' : '0 6px 20px rgba(230,51,41,0.3)',
          transition: 'transform 0.2s',
        }}
          onMouseOver={e => { if (!loading) e.target.style.transform = 'translateY(-1px)'; }}
          onMouseOut={e => { e.target.style.transform = 'translateY(0)'; }}>
          {loading ? 'Searching...' : 'Search 🔍'}
        </button>
      </form>

      {/* ── Error ── */}
      {error && (
        <div style={{
          marginTop: '30px', background: '#fef2f2', border: '1px solid #fecaca',
          color: '#dc2626', borderRadius: '12px', padding: '14px 20px',
          fontSize: '14px', fontWeight: '500', maxWidth: '800px', width: '90%'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── Loading Skeleton ── */}
      {loading && (
        <div style={{ marginTop: '50px', width: '90%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              padding: '24px',
              border: '1px solid #e2e8f0', height: '100px',
              background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }} />
          ))}
        </div>
      )}

      {/* ── Results ── */}
      {hasSearched && !loading && (
        <div style={{ marginTop: '50px', width: '90%', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '14px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
              Results near <span style={{ color: '#e63329' }}>{location}</span>
            </h3>
            <span style={{
              background: mechanics.length > 0 ? '#dcfce7' : '#fef2f2',
              color: mechanics.length > 0 ? '#16a34a' : '#dc2626',
              padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '700'
            }}>
              {mechanics.length} {mechanics.length === 1 ? 'mechanic' : 'mechanics'} found
            </span>
          </div>

          {mechanics.length === 0 ? (
            <div style={{
              background: '#fff', borderRadius: '20px', padding: '60px 40px',
              border: '1px solid #e2e8f0', textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔧</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#0f172a', margin: '0 0 10px' }}>
                No mechanics found in "{location}"
              </h4>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px' }}>
                No mechanics have registered in this area yet. Try a nearby city or check spelling.
              </p>
              <button onClick={() => { setHasSearched(false); setLocation(''); }} style={{
                background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0',
                padding: '10px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '14px'
              }}>
                Try Another Location
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {mechanics.map(mechanic => (
                <div key={mechanic.id} style={{
                  background: '#fff', borderRadius: '18px', padding: '24px 28px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)',
                  flexWrap: 'wrap', gap: '20px', transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(0,0,0,0.1)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.04)'; }}>

                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', flex: 1 }}>
                    {/* Avatar */}
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '14px', flexShrink: 0,
                      background: 'linear-gradient(135deg, #e63329 0%, #c8261e 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: '800', fontSize: '22px',
                      boxShadow: '0 4px 12px rgba(230,51,41,0.3)'
                    }}>
                      {mechanic.name ? mechanic.name.charAt(0).toUpperCase() : 'M'}
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1.15rem', margin: '0 0 4px', fontWeight: '800', color: '#0f172a' }}>
                        {mechanic.workshopName || mechanic.name}
                      </h4>
                      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '2px', fontWeight: '500' }}>
                        👤 {mechanic.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#475569', fontSize: '13px', fontWeight: '600' }}>
                          📍 {mechanic.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308', fontSize: '13px', fontWeight: '700' }}>
                          ⭐ {mechanic.rating}
                        </span>
                        <span style={{
                          background: mechanic.status === 'available' ? '#dcfce7' : '#fee2e2', color: mechanic.status === 'available' ? '#16a34a' : '#dc2626', padding: '3px 10px',
                          borderRadius: '20px', fontSize: '12px', fontWeight: '700'
                        }}>
                          {mechanic.status === 'available' ? '✅ Available' : '🔴 Closed'}
                        </span>
                      </div>
                      <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#64748b' }}>
                        <span style={{ fontWeight: '700', color: '#0f172a' }}>Services: </span>{mechanic.services}
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={mechanic.status !== 'available'}
                    style={{
                      background: mechanic.status === 'available' ? 'linear-gradient(135deg, #e63329 0%, #c8261e 100%)' : '#e2e8f0',
                      color: mechanic.status === 'available' ? '#fff' : '#94a3b8', border: 'none', padding: '14px 26px',
                      borderRadius: '12px', fontWeight: '700', cursor: mechanic.status === 'available' ? 'pointer' : 'not-allowed',
                      fontSize: '14px', transition: 'transform 0.2s, box-shadow 0.2s',
                      boxShadow: mechanic.status === 'available' ? '0 4px 12px rgba(230,51,41,0.3)' : 'none', whiteSpace: 'nowrap'
                    }}
                    onClick={() => mechanic.status === 'available' && setSelectedMechanic(mechanic)}
                    onMouseOver={e => { if(mechanic.status === 'available') { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 20px rgba(230,51,41,0.4)'; } }}
                    onMouseOut={e => { if(mechanic.status === 'available') { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 12px rgba(230,51,41,0.3)'; } }}>
                    {mechanic.status === 'available' ? 'Send Request →' : 'Currently Closed'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Service Request Modal ── */}
      {selectedMechanic && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000, padding: '20px',
        }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedMechanic(null); }}>
          <div style={{
            background: '#fff', width: '100%', maxWidth: '500px', borderRadius: '24px',
            padding: '40px', position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.25s ease'
          }}>
            {/* Close */}
            <button onClick={() => setSelectedMechanic(null)} style={{
              position: 'absolute', top: '18px', right: '18px', background: '#f1f5f9',
              border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b',
              width: '36px', height: '36px', borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontWeight: '700'
            }}>×</button>

            {requestSent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px' }}>Request Sent!</h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  <strong style={{ color: '#e63329' }}>{selectedMechanic.name}</strong> will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0 0 6px', color: '#0f172a' }}>Request Service</h2>
                  <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                    Sending request to <span style={{ color: '#e63329', fontWeight: '700' }}>{selectedMechanic.workshopName || selectedMechanic.name}</span>
                  </p>
                </div>

                <form onSubmit={handleSendRequest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input required type="text" value={reqName} onChange={e => setReqName(e.target.value)}
                      placeholder="e.g. Haroon" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input required type="tel" value={reqPhone} onChange={e => setReqPhone(e.target.value)}
                      placeholder="+91 98987 67654" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={handleShareLocation} style={{
                      flex: 1, minWidth: '190px', padding: '14px', borderRadius: '10px', border: 'none',
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', color: '#fff',
                      fontWeight: '700', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 12px rgba(14,165,233,0.25)'
                    }}>
                      Share My Location
                    </button>
                    <span style={{ flex: 2, minWidth: '140px', color: locationShared ? '#16a34a' : '#64748b', fontSize: '13px' }}>
                      {geoStatus}
                    </span>
                  </div>
                  <div>
                    <label style={labelStyle}>Vehicle Make & Model</label>
                    <input required type="text" value={reqVehicle} onChange={e => setReqVehicle(e.target.value)}
                      placeholder="e.g. Maruti Suzuki Swift 2018" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div>
                    <label style={labelStyle}>Describe the Issue</label>
                    <textarea required rows="3" value={reqIssue} onChange={e => setReqIssue(e.target.value)}
                      placeholder="Engine won't start, flat tyre, etc..." style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                    <button type="button" onClick={() => setSelectedMechanic(null)} style={{
                      flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0',
                      background: '#f8fafc', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '14px'
                    }}>Cancel</button>
                    <button type="submit" style={{
                      flex: 2, padding: '14px', borderRadius: '10px', border: 'none',
                      background: 'linear-gradient(135deg, #e63329 0%, #c8261e 100%)',
                      color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(230,51,41,0.3)'
                    }}>Confirm Request →</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <Link to="/" style={{ marginTop: '60px', color: '#94a3b8', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
        ← Back to Home
      </Link>
    </div>
  );
}

export default SearchMechanic;
