import React from 'react';

const Timer = ({ timeLeft }) => {
  const isRed = timeLeft <= 10;

  return (
    <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
      Thời gian còn lại: <span style={{ color: isRed ? 'red' : 'black' }}>{timeLeft} giây</span>
    </div>
  );
};

export default Timer;