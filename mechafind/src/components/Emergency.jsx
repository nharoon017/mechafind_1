import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Emergency() {
  const [isLocating, setIsLocating] = useState(false);
  const navigate = useNavigate();

  const handleShareLocation = () => {
    setIsLocating(true);
    // Simulate a brief "GPS loading" delay before sending the emergency broadcast
    setTimeout(() => {
      setIsLocating(false);
      alert("📍 EMERGENCY BROADCAST SENT! \n\nAll mechanics within a 5-mile radius have been pinged with your exact GPS coordinates. Stay safe, help is on the way!");
      navigate('/');
    }, 2500);
  };

  const handleCall = () => {
    // In a real mobile browser, this would open their phone dialer
    alert("Opening phone dialer to call 1800-MECHA-SOS...");
    window.location.href = "tel:180063242767";
  };

  return (
    <div style={{
      minHeight: '100vh', 
      background: '#f8fafc', /* clean off-white background */
      color: '#0f172a', 
      paddingTop: '100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Blinking/Glowing Emergency Icon */}
      <div style={{
        width: '140px', height: '140px', 
        background: 'rgba(230, 51, 41, 0.15)', 
        borderRadius: '50%', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', margin: '0 auto 30px',
        boxShadow: isLocating ? '0 0 40px rgba(230, 51, 41, 0.4)' : 'none',
        transition: 'box-shadow 0.5s ease-in-out'
      }}>
        <div style={{
          width: '90px', height: '90px', background: '#e63329', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', fontSize: '45px',
          boxShadow: '0 10px 20px rgba(230, 51, 41, 0.3)'
        }}>
          {isLocating ? "⏳" : "🚨"}
        </div>
      </div>

      <h1 style={{fontSize: '3.5rem', fontWeight: '900', margin: '0 0 10px', color: '#0f172a'}}>Emergency SOS</h1>
      <p style={{color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6}}>
        {isLocating 
          ? "Accessing GPS... Broadcasting your exact coordinates to nearby rescue mechanics." 
          : "Are you in immediate danger or stuck in a remote area? Share your live location immediately or call our toll-free rescue line."}
      </p>
      
      <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
        <button onClick={handleShareLocation} disabled={isLocating} style={{
          background: isLocating ? '#94a3b8' : '#e63329', 
          color: '#fff', border: 'none', padding: '18px 40px', 
          borderRadius: '12px', fontWeight: '800', fontSize: '18px', 
          cursor: isLocating ? 'not-allowed' : 'pointer', 
          boxShadow: isLocating ? 'none' : '0 10px 25px rgba(230, 51, 41, 0.3)',
          transition: 'transform 0.2s, background 0.2s'
        }} onMouseOver={e => {if(!isLocating) e.target.style.transform = 'translateY(-2px)'}} 
           onMouseOut={e => {if(!isLocating) e.target.style.transform = 'translateY(0)'}}>
          {isLocating ? "Locating..." : "Share Current Location"}
        </button>
        
        <button onClick={handleCall} disabled={isLocating} style={{
          background: 'transparent', color: '#0f172a', border: '2px solid #cbd5e1', 
          padding: '18px 40px', borderRadius: '12px', fontWeight: '800', 
          fontSize: '18px', cursor: isLocating ? 'not-allowed' : 'pointer',
          transition: 'border 0.2s, background 0.2s'
        }} onMouseOver={e => {if(!isLocating){ e.target.style.borderColor = '#0f172a'; e.target.style.background = 'rgba(15,23,42,0.05)'}}} 
           onMouseOut={e => {if(!isLocating){ e.target.style.borderColor = '#cbd5e1'; e.target.style.background = 'transparent'}}}>
          Call 1800-MECHA-SOS
        </button>
      </div>

      <Link to="/" style={{marginTop: '60px', color: '#94a3b8', textDecoration: 'none', fontWeight: '600', padding: '10px 20px'}}>
        ← Cancel Request & Return Home
      </Link>
    </div>
  );
}

export default Emergency;
