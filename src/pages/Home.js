
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const Home = ({ playerName, setPlayerName, history }) => {
  const [inputName, setInputName] = useState(playerName);
  const navigate = useNavigate();

  // Tìm lượt chơi có tiền thưởng cao nhất làm kỷ lục
  const bestRecord = history.length > 0 
    ? [...history].sort((a, b) => b.prize - a.prize)[0] 
    : null;

  const handleStart = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
      navigate('/play');
    }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2>Ai là triệu phú - Phiên bản Lập trình Web</h2>
      <p>Luật chơi: Trả lời 15 câu hỏi trắc nghiệm kiến thức. Mỗi câu có 30 giây. Có các mốc an toàn ở câu 5, 10, 15.</p>

      {bestRecord && (
        <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#fffbcc', border: '1px solid #e6db55' }}>
          <strong>Kỷ lục:</strong> {formatMoney(bestRecord.prize)} – {bestRecord.name}
        </div>
      )}

      <form onSubmit={handleStart} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Tên người chơi: </label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Nhập tên của bạn..."
            style={{ padding: '6px', width: '250px' }}
          />
        </div>
        <button type="submit" disabled={!inputName.trim()} style={{ padding: '8px 16px' }}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;