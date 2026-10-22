
import React from 'react';
import { formatMoney } from '../data';

const History = ({ history, onClearHistory }) => {
  // Sắp xếp bản sao của mảng lịch sử theo tiền thưởng giảm dần
  const sortedHistory = [...history].sort((a, b) => b.prize - a.prize);

  const totalGames = history.length;
  const highestPrize = totalGames > 0 ? sortedHistory[0].prize : 0;
  const totalPrizeSum = history.reduce((sum, item) => sum + item.prize, 0);

  return (
    <div style={{ maxWidth: '700px' }}>
      <h2>Lịch sử các lượt chơi</h2>

      <div style={{ marginBottom: '15px', lineHeight: '1.6' }}>
        <p><strong>Số lượt chơi:</strong> {totalGames}</p>
        <p><strong>Tiền thưởng cao nhất:</strong> {formatMoney(highestPrize)}</p>
        <p><strong>Tổng tiền thưởng:</strong> {formatMoney(totalPrizeSum)}</p>
      </div>

      {totalGames > 0 && (
        <button onClick={onClearHistory} style={{ marginBottom: '15px', padding: '6px 12px' }}>
          Xóa lịch sử
        </button>
      )}

      {totalGames === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Người chơi</th>
              <th>Số câu đúng</th>
              <th>Tiền thưởng</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {sortedHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.correctCount}/15</td>
                <td>{formatMoney(item.prize)}</td>
                <td>{item.playedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;