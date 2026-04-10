import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function MechanicDashboard() {
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatReqId, setChatReqId] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [chatText, setChatText] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('mechafind_token');
  const mechanicRaw = localStorage.getItem('mechafind_mechanic');
  const mechanic = mechanicRaw ? JSON.parse(mechanicRaw) : null;

  useEffect(() => {
    if (!token || !mechanic) {
      navigate('/mechanic/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, requestsRes] = await Promise.all([
          fetch('http://localhost:5000/api/mechanic/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/mechanic/requests', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!profileRes.ok || !requestsRes.ok) throw new Error("Failed to load data.");

        const profileData = await profileRes.json();
        const requestsData = await requestsRes.json();

        if (profileData.success) setProfile(profileData.data);
        if (requestsData.success) setRequests(requestsData.data);
      } catch (err) {
        setError(err.message || "Failed to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token, mechanic]);

  const toggleOpenStatus = async () => {
    if (!profile) return;
    const currentStatus = profile.isOpen !== false; // defaults to true
    const newStatus = !currentStatus;
    
    try {
      const res = await fetch('http://localhost:5000/api/mechanic/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isOpen: newStatus })
      });
      
      const data = await res.json();
      if (res.ok) {
        setProfile({ ...profile, isOpen: newStatus });
      } else {
        alert("Failed to toggle shop status: " + (data.message || data.error));
      }
    } catch (e) {
      alert("Network error trying to toggle shop status.");
      console.error('Toggle status error', e);
    }
  };

  useEffect(() => {
    let interval;
    if (chatReqId) {
      const fetchReq = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/requests/single/${chatReqId}`);
          if (res.ok) {
            const data = await res.json();
            setChatData(data);
          }
        } catch(error) {
          console.error(error);
        }
      };
      fetchReq();
      interval = setInterval(fetchReq, 3000);
    } else {
      setChatData(null);
    }
    return () => clearInterval(interval);
  }, [chatReqId]);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatData?.messages]);

  const sendMessage = async () => {
    if (!chatText.trim() || !chatReqId) return;
    setSendingMsg(true);
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${chatReqId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'Mechanic', text: chatText })
      });
      if (res.ok) {
        const data = await res.json();
        setChatData(prev => ({ ...prev, messages: data.messages }));
        setChatText("");
      }
    } catch (error) {
      console.error(error);
    }
    setSendingMsg(false);
  };

  const updateStatus = async (requestId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/mechanic/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update status.');

      setRequests(prev => prev.map(req => req._id === requestId ? { ...req, status } : req));
    } catch (err) {
      setError(err.message || 'Unable to update status.');
    }
  };

  const handleAccept = (id) => updateStatus(id, 'Accepted');
  const handleReject = (id) => updateStatus(id, 'Declined');
  const handleComplete = (id) => updateStatus(id, 'Completed');

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', sans-serif", color: '#0f172a' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '20px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>Mechanic Dashboard</h1>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {profile && (
              <button 
                onClick={toggleOpenStatus}
                style={{ 
                  background: profile.isOpen !== false ? '#dcfce7' : '#fee2e2', 
                  color: profile.isOpen !== false ? '#16a34a' : '#dc2626', 
                  border: `1px solid ${profile.isOpen !== false ? '#bbf7d0' : '#fecaca'}`, 
                  padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '800',
                  display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', transition: 'all 0.2s'
                }}
                onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: profile.isOpen !== false ? '#16a34a' : '#dc2626' }}></div>
                {profile.isOpen !== false ? 'Shop is Open' : 'Shop is Closed'}
              </button>
            )}
            <Link to="/mechanic/profile" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: '600' }}>Edit Profile</Link>
            <button onClick={() => { localStorage.clear(); navigate('/mechanic/login'); }} style={{ background: '#e63329', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', marginBottom: '20px', fontWeight: '500' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Profile Summary */}
        {profile && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Your Profile</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div><strong>Name:</strong> {profile.name}</div>
              <div><strong>Email:</strong> {profile.email}</div>
              <div><strong>Contact:</strong> {profile.contact}</div>
              <div><strong>Location:</strong> {profile.location}</div>
              <div><strong>Services:</strong> {profile.services.join(', ')}</div>
            </div>
          </div>
        )}

        {/* Requests */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Service Requests</h2>
          {requests.length === 0 ? (
            <p style={{ color: '#64748b' }}>No requests yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {requests.map(req => {
                const mapUrl = (req.customerLatitude && req.customerLongitude) ? `https://www.google.com/maps/search/?api=1&query=${req.customerLatitude},${req.customerLongitude}` : null;
                const dateObj = new Date(req.createdAt || req.time);
                
                return (
                  <div key={req._id || req.id} style={{ 
                    background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)',
                    transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden'
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.01)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)'; }}>
                    
                    {/* Status Bar */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, bottom: 0, width: '6px',
                      background: req.status === 'Completed' ? '#10b981' : req.status === 'Accepted' ? '#3b82f6' : req.status === 'Declined' ? '#ef4444' : '#f59e0b'
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', paddingLeft: '8px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                          👤
                        </div>
                        <div>
                          <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                            {req.customerName || req.customer || req.userId?.name || 'Customer'}
                          </h3>
                          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            📞 {req.customerPhone || req.phone || req.userId?.email || 'No phone provided'}
                          </div>
                        </div>
                      </div>
                      <span style={{
                        padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '800',
                        background: req.status === 'Pending' ? '#fef3c7' : req.status === 'Accepted' ? '#dbeafe' : req.status === 'Declined' ? '#fee2e2' : '#d1fae5',
                        color: req.status === 'Pending' ? '#b45309' : req.status === 'Accepted' ? '#1d4ed8' : req.status === 'Declined' ? '#b91c1c' : '#047857',
                        border: `1px solid ${req.status === 'Pending' ? '#fde68a' : req.status === 'Accepted' ? '#bfdbfe' : req.status === 'Declined' ? '#fecaca' : '#a7f3d0'}`
                      }}>
                        {req.status.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px dashed #cbd5e1', marginLeft: '8px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ color: '#0f172a', fontWeight: '700', minWidth: '70px', fontSize: '14px' }}>🚘 Vehicle:</span>
                        <span style={{ color: '#475569', fontSize: '14px' }}>{req.vehicle || 'Unknown model'}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ color: '#0f172a', fontWeight: '700', minWidth: '70px', fontSize: '14px' }}>⚠️ Issue:</span>
                        <span style={{ color: '#475569', fontSize: '14px' }}>{req.issue || 'No details provided'}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ color: '#0f172a', fontWeight: '700', minWidth: '70px', fontSize: '14px' }}>📍 Location:</span>
                        <span style={{ color: '#475569', fontSize: '14px' }}>{req.customerLocation || req.distance || 'Location shared via GPS'}</span>
                        {mapUrl && (
                          <a href={mapUrl} target="_blank" rel="noreferrer" style={{
                            marginLeft: 'auto', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: '#fff', textDecoration: 'none', fontWeight: '700', padding: '6px 12px',
                            borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px',
                            boxShadow: '0 4px 6px rgba(59,130,246,0.25)'
                          }}>
                            🗺️ Open in Google Maps
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '8px', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>
                        🕒 Requested: {!isNaN(dateObj) ? dateObj.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Recently'}
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        {req.status === 'Pending' && (
                          <>
                            <button onClick={() => handleReject(req._id || req.id)} style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s' }} onMouseOver={e=>e.target.style.background='#e2e8f0'} onMouseOut={e=>e.target.style.background='#f1f5f9'}>Decline</button>
                            <button onClick={() => handleAccept(req._id || req.id)} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', transition: 'transform 0.2s' }} onMouseOver={e=>e.target.style.transform='translateY(-1px)'} onMouseOut={e=>e.target.style.transform='translateY(0)'}>Accept Job ✓</button>
                          </>
                        )}
                        {req.status === 'Accepted' && (
                          <button onClick={() => handleComplete(req._id || req.id)} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', transition: 'transform 0.2s' }} onMouseOver={e=>e.target.style.transform='translateY(-1px)'} onMouseOut={e=>e.target.style.transform='translateY(0)'}>Mark Complete ✨</button>
                        )}
                        {(req.status === 'Accepted' || req.status === 'Completed' || req.status === 'Pending') && (
                            <button onClick={() => setChatReqId(req._id || req.id)} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(15,23,42,0.3)', transition: 'transform 0.2s' }} onMouseOver={e=>e.target.style.transform='translateY(-1px)'} onMouseOut={e=>e.target.style.transform='translateY(0)'}>💬 Chat & Call</button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CHAT MODAL */}
      {chatReqId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }} onClick={(e) => { if (e.target === e.currentTarget) setChatReqId(null); }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '600px', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
            
            {/* Chat Header */}
            <div style={{ padding: '20px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Chat with Customer</h3>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Status: {chatData?.status || 'Loading...'}</div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`tel:${requests.find(r => (r.id || r._id) === chatReqId)?.customerPhone || ''}`} style={{ background: '#10b981', color: '#fff', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>📞 Call</a>
                <button onClick={() => setChatReqId(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', fontWeight: '700' }}>✕</button>
              </div>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chatData?.messages?.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', marginTop: 'auto', marginBottom: 'auto' }}>No messages yet. Say hello!</div>
              ) : (
                chatData?.messages?.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.sender === 'Mechanic' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', textAlign: msg.sender === 'Mechanic' ? 'right' : 'left' }}>{msg.sender === 'Mechanic' ? 'You' : msg.sender}</div>
                    <div style={{ background: msg.sender === 'Mechanic' ? '#e63329' : '#fff', color: msg.sender === 'Mechanic' ? '#fff' : '#0f172a', padding: '12px 16px', borderRadius: '16px', borderBottomRightRadius: msg.sender === 'Mechanic' ? '4px' : '16px', borderBottomLeftRadius: msg.sender === 'Mechanic' ? '16px' : '4px', border: msg.sender === 'Mechanic' ? 'none' : '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '14px', lineHeight: 1.5 }}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Footer */}
            <div style={{ padding: '16px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' }}>
              <input type="text" value={chatText} onChange={e => setChatText(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: '12px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', outline: 'none', background: '#f1f5f9', fontSize: '14px' }} disabled={sendingMsg} />
              <button onClick={sendMessage} disabled={sendingMsg || !chatText.trim()} style={{ background: '#e63329', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '20px', fontWeight: '700', cursor: (sendingMsg || !chatText.trim()) ? 'not-allowed' : 'pointer', opacity: (sendingMsg || !chatText.trim()) ? 0.6 : 1 }}>Send</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default MechanicDashboard;
