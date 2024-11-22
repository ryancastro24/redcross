'use client'
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = () => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleDownload = () => {
    const input = document.getElementById('certificate');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'letter');
      pdf.addImage(imgData, 'PNG', 20, 20, 770, 570);
      pdf.save('certificate.pdf');
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={handleChange}
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
      />
      <div
        id="certificate"
        style={{
          width: '770px',
          height: '570px',
          margin: '0 auto',
          padding: '20px',
          border: '10px solid #ddd',
          boxShadow: '0 0 20px rgba(0,0,0,0.15)',
          textAlign: 'center',
          backgroundColor: 'white',
          position: 'absolute',
          fontFamily: 'serif',
          top:-1000
        }}
      >
        <div
          style={{
            width: 'calc(100% - 40px)',
            height: 'calc(100% - 40px)',
            border: '5px solid #aaa',
            padding: '20px',
            position: 'absolute',
            top: '20px',
            left: '20px',
            boxSizing: 'border-box',
          }}
        >
          <h1 style={{ fontSize: '2.5em', margin: '0' }}>Certificate of Achievement</h1>
          <p style={{ fontSize: '1.25em', marginTop: '40px' }}>This certifies that</p>
          <h2 style={{ fontSize: '2em', margin: '20px 0' }}>{name || 'Your Name Here'}</h2>
          <p style={{ fontSize: '1.25em' }}>has successfully completed the course</p>
          <p style={{ fontSize: '1.5em', fontStyle: 'italic', margin: '40px 0' }}>React Development</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px' }}>
            <div>
              <p>__________________________</p>
              <p>Dr. Juan Dela Cruz</p>
            </div>
            <div>
              <p>__________________________</p>
              <p>Dr. Jane Doe</p>
            </div>
          </div>
        </div>
      </div>

      
      <button
        onClick={handleDownload}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
