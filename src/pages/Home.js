
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName }) => {
  const [inputName, setInputName] = useState(playerName);
  const navigate = useNavigate();

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