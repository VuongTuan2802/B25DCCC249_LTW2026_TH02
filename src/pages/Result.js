import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { formatMoney } from '../data';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state;

  if (!stateData) {
    return <Navigate to="/" replace />;
  }

  const { name, prize, correctCount, reason } = stateData;

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2>{reason}</h2>
      <p><strong>Người chơi:</strong> {name}</p>
      <p><strong>Số câu trả lời đúng:</strong> {correctCount}/15</p>
      <p><strong>Tiền thưởng:</strong> {formatMoney(prize)}</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={() => navigate('/play')} style={{ padding: '8px 16px' }}>
          Chơi lại
        </button>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;