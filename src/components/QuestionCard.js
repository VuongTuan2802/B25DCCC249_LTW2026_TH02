import React from 'react';
import { LETTERS } from '../data';

const QuestionCard = ({ questionData, currentQuestionIndex, selectedAnswer, status, onSelectAnswer }) => {
  if (!questionData) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Câu {currentQuestionIndex + 1}/15 (Mức độ: {questionData.level})</h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{questionData.question}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {questionData.options.map((option, idx) => {
          let backgroundColor = 'white';
          if (status === 'locked' && selectedAnswer === idx) {
            backgroundColor = 'orange'; // Đang chốt
          } else if (status === 'revealed') {
            if (idx === questionData.answer) {
              backgroundColor = 'lightgreen'; // Đáp án đúng
            } else if (selectedAnswer === idx) {
              backgroundColor = 'lightcoral'; // Đáp án sai đã chọn
            }
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectAnswer(idx)}
              disabled={status !== 'answering'}
              style={{
                padding: '12px',
                textAlign: 'left',
                backgroundColor,
                cursor: status === 'answering' ? 'pointer' : 'default',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            >
              <strong>{LETTERS[idx]}.</strong> {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;