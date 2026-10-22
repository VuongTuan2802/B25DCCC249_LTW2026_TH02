import React from 'react';
import { PRIZES, MILESTONES, formatMoney } from '../data';

const MoneyLadder = ({ currentQuestionIndex }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', width: '250px' }}>
      <h4>Thang tiền thưởng</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {PRIZES.map((prize, idx) => {
          const questionNum = idx + 1;
          const isCurrent = questionNum === currentQuestionIndex + 1;
          const isMilestone = MILESTONES.includes(questionNum);

          return (
            <li
              key={questionNum}
              style={{
                padding: '4px 8px',
                backgroundColor: isCurrent ? 'gold' : 'transparent',
                fontWeight: isMilestone ? 'bold' : 'normal',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>{questionNum}</span>
              <span>{formatMoney(prize)}</span>
            </li>
          ); // <-- Thêm dấu đóng ngoặc ở đây
        })}
      </ul>
    </div>
  );
};

export default MoneyLadder;