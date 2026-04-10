import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewDraft, setReviewDraft] = useState({});
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [activeTab, setActiveTab] = useState('pending');
  const [chatReqId, setChatReqId] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [chatText, setChatText] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const userRaw = localStorage.getItem('mechafind_user');
  const user = userRaw ? JSON.parse(userRaw) : null;

  useEffect(() => {
    // Basic auth check
    const token = localStorage.getItem('mechafind_token');

    if (!token || !user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'Customer') {
      navigate('/');
      return;
    }

    const fetchRequests = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/requests/customer/${user.id}`);
        if (!res.ok) throw new Error("Failed to load requests.");
        const data = await res.json();
        setRequests(data.requests);
      } catch (err) {
        setError(err.message || "Failed to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const updateReviewDraft = (requestId, field, value) => {
    setReviewDraft(prev => ({
      ...prev,
      [requestId]: {
        ...prev[requestId],
        [field]: value,
      }
    }));
  };

  const filteredRequests = activeTab === 'completed'
    ? requests.filter(req => req.status === 'Completed')
    : requests.filter(req => req.status !== 'Completed');

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
        body: JSON.stringify({ sender: 'Customer', text: chatText })
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

  const completedCount = requests.filter(req => req.status === 'Completed').length;
  const pendingCount = requests.length - completedCount;

  const submitReview = async (request) => {
    const draft = reviewDraft[request.id] || {};
    const rating = draft.rating || 5;
    const review = (draft.review || '').trim();

    if (!review) {
      setError('Please provide a short review before submitting.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/requests/${request.id}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, review })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save review.');
      }

      setReviewSuccess('Thank you! Your review has been saved.');
      setReviewDraft(prev => {
        const next = { ...prev };
        delete next[request.id];
        return next;
      });
      setError("");
      setTimeout(() => setReviewSuccess(''), 3000);

      const refresh = await fetch(`http://localhost:5000/api/requests/customer/${user.id}`);
      if (refresh.ok) {
        const data = await refresh.json();
        setRequests(data.requests);
      }
    } catch (err) {
      setError(err.message || 'Unable to save review.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', padding: '100px 20px', background: '#f8fafc',
      color: '#0f172a', fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '32px', flexWrap: 'wrap', gap: '20px'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 8px', color: '#0f172a' }}>
              My <span style={{ color: '#e63329' }}>Service Requests</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>
              Track the status of your active and past requested mechanics.
            </p>
          </div>
          <Link to="/search" style={{
            background: 'linear-gradient(135deg, #e63329 0%, #c8261e 100%)',
            color: '#fff', textDecoration: 'none', padding: '12px 24px',
            borderRadius: '12px', fontWeight: '700', fontSize: '15px',
            boxShadow: '0 4px 14px rgba(230,51,41,0.3)', transition: 'transform 0.2s',
            display: 'inline-flex', alignItems: 'center', gap: '8px'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            ➕ New Request
          </Link>
        </div>

        {/* Content Section */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              width: '40px', height: '40px', border: '3px solid #e2e8f0',
              borderTopColor: '#e63329', borderRadius: '50%', margin: '0 auto 20px',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#64748b', fontWeight: '600' }}>Loading your requests...</p>
          </div>
        ) : error ? (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
            padding: '20px', borderRadius: '16px', fontWeight: '500'
          }}>
            ⚠️ {error}
          </div>
        ) : requests.length === 0 ? (
          <div style={{
            background: '#fff', borderRadius: '24px', padding: '80px 40px',
            textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>Empty</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 10px' }}>No requests history found.</h3>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 auto 30px', maxWidth: '400px' }}>
              Whenever you book a mechanic from our live search, the request's status will show up here.
            </p>
            <Link to="/search" style={{
              background: '#f1f5f9', color: '#0f172a', textDecoration: 'none',
              padding: '12px 28px', borderRadius: '12px', fontWeight: '700',
              border: '1px solid #e2e8f0'
            }}>Find a Mechanic</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <button type="button" onClick={() => setActiveTab('pending')} style={{
                background: activeTab === 'pending' ? '#e63329' : '#fff',
                color: activeTab === 'pending' ? '#fff' : '#0f172a',
                border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px 20px',
                fontWeight: '700', cursor: 'pointer'
              }}>
                Active & Pending ({pendingCount})
              </button>
              <button type="button" onClick={() => setActiveTab('completed')} style={{
                background: activeTab === 'completed' ? '#10b981' : '#fff',
                color: activeTab === 'completed' ? '#fff' : '#0f172a',
                border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px 20px',
                fontWeight: '700', cursor: 'pointer'
              }}>
                Completed Jobs ({completedCount})
              </button>
            </div>

            {reviewSuccess && (
              <div style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '18px 20px', marginBottom: '16px' }}>
                {reviewSuccess}
              </div>
            )}

            {filteredRequests.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: '20px', padding: '60px 40px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✓</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 12px' }}>
                  {activeTab === 'completed' ? 'No completed jobs yet.' : 'No active jobs in this view.'}
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0, maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {activeTab === 'completed'
                    ? 'Once a job is finished, it will appear here for you to review.'
                    : 'Your current requests and accepted jobs will appear here once they are active.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredRequests.map(req => (
                  <div key={req.id} style={{
                    background: '#fff', borderRadius: '20px', padding: '24px 30px',
                    border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
                    gap: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s', position: 'relative', overflow: 'hidden'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>

                    {/* Status indicator bar */}
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px',
                      background: req.status === 'Completed' ? '#10b981' 
                                 : req.status === 'Accepted' ? '#3b82f6'
                                 : req.status === 'Declined' ? '#ef4444'
                                 : '#f59e0b'
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '48px', height: '48px', borderRadius: '12px',
                          background: '#f1f5f9', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '20px'
                        }}>
                          🔧
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 4px', color: '#0f172a' }}>
                            {req.mechanicName}
                          </h4>
                          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                            Requested on {req.date} at {req.time}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        padding: '6px 16px', borderRadius: '20px', fontWeight: '700', fontSize: '13px',
                        background: req.status === 'Completed' ? '#d1fae5' 
                                   : req.status === 'Accepted' ? '#dbeafe'
                                   : req.status === 'Declined' ? '#fee2e2'
                                   : '#fef3c7',
                        color: req.status === 'Completed' ? '#059669'
                              : req.status === 'Accepted' ? '#2563eb'
                              : req.status === 'Declined' ? '#dc2626'
                              : '#d97706',
                        border: `1px solid ${
                               req.status === 'Completed' ? '#a7f3d0' 
                             : req.status === 'Accepted' ? '#bfdbfe'
                             : req.status === 'Declined' ? '#fecaca'
                             : '#fde68a'}`
                      }}>
                        {req.status.toUpperCase()}
                      </div>
                    </div>

                    <div style={{
                      background: '#f8fafc', borderRadius: '12px', padding: '16px 20px',
                      marginTop: '4px', border: '1px dashed #cbd5e1'
                    }}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#0f172a', fontSize: '14px' }}>🚘 Vehicle: </strong>
                        <span style={{ color: '#475569', fontSize: '14px' }}>{req.vehicle}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0f172a', fontSize: '14px' }}>⚠️ Issue: </strong>
                        <span style={{ color: '#475569', fontSize: '14px' }}>{req.issue}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      <button onClick={() => setChatReqId(req.id)} style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>💬 Chat & Call Mechanic</button>
                    </div>

                    {req.status === 'Completed' && !req.review ? (
                      <div style={{ background: '#fff', borderRadius: '18px', padding: '18px 20px', border: '1px solid #d1fae5' }}>
                        <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontSize: '1rem' }}>Share a review for {req.mechanicName}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                          {[1, 2, 3, 4, 5].map(value => {
                            const draft = reviewDraft[req.id] || {};
                            const ratingValue = draft.rating || 5;
                            return (
                              <button key={value} type="button" onClick={() => updateReviewDraft(req.id, 'rating', value)}
                                style={{
                                  width: '34px', height: '34px', borderRadius: '50%', border: 'none',
                                  background: value <= ratingValue ? '#facc15' : '#e2e8f0',
                                  color: value <= ratingValue ? '#0f172a' : '#64748b',
                                  cursor: 'pointer', fontSize: '16px', fontWeight: '700'
                                }}>
                                ★
                              </button>
                            );
                          })}
                        </div>
                        <textarea
                          value={(reviewDraft[req.id]?.review || '')}
                          onChange={e => updateReviewDraft(req.id, 'review', e.target.value)}
                          placeholder="Write a short review for your mechanic..."
                          style={{ width: '100%', minHeight: '90px', borderRadius: '12px', border: '1px solid #cbd5e1', padding: '12px', outline: 'none', fontSize: '14px', resize: 'vertical', marginBottom: '12px' }}
                        />
                        <button onClick={() => submitReview(req)} style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: '#fff', border: 'none', padding: '12px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer'
                        }}>Submit Review</button>
                        {reviewSuccess && req.id && <p style={{ color: '#059669', marginTop: '12px', fontWeight: '600' }}>{reviewSuccess}</p>}
                      </div>
                    ) : req.status === 'Completed' && req.review ? (
                      <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '18px 20px', border: '1px solid #d1fae5' }}>
                        <div style={{ marginBottom: '8px', color: '#0f172a', fontWeight: '700' }}>Your review</div>
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                          {Array.from({ length: req.rating || 5 }, (_, i) => (
                            <span key={i} style={{ color: '#facc15', fontSize: '18px' }}>★</span>
                          ))}
                        </div>
                        <p style={{ margin: 0, color: '#475569', fontSize: '14px' }}>{req.review}</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CHAT MODAL */}
      {chatReqId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }} onClick={(e) => { if (e.target === e.currentTarget) setChatReqId(null); }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '600px', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
            
            {/* Chat Header */}
            <div style={{ padding: '20px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Chat with Mechanic</h3>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Status: {chatData?.status || 'Loading...'}</div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`tel:${chatData?.mechanicPhone || ''}`} style={{ background: '#10b981', color: '#fff', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', pointerEvents: chatData?.mechanicPhone ? 'auto' : 'none', opacity: chatData?.mechanicPhone ? 1 : 0.5 }}>📞 Call</a>
                <button onClick={() => setChatReqId(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', fontWeight: '700' }}>✕</button>
              </div>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chatData?.messages?.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', marginTop: 'auto', marginBottom: 'auto' }}>No messages yet. Send your mechanic a message!</div>
              ) : (
                chatData?.messages?.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.sender === 'Customer' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', textAlign: msg.sender === 'Customer' ? 'right' : 'left' }}>{msg.sender === 'Customer' ? 'You' : msg.sender}</div>
                    <div style={{ background: msg.sender === 'Customer' ? '#e63329' : '#fff', color: msg.sender === 'Customer' ? '#fff' : '#0f172a', padding: '12px 16px', borderRadius: '16px', borderBottomRightRadius: msg.sender === 'Customer' ? '4px' : '16px', borderBottomLeftRadius: msg.sender === 'Customer' ? '16px' : '4px', border: msg.sender === 'Customer' ? 'none' : '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '14px', lineHeight: 1.5 }}>
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

export default CustomerDashboard;
