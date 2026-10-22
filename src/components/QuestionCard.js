import React from 'react';
import { LETTERS } from '../data';

const QuestionCard = ({
  questionData,
  currentQuestionIndex,
  selectedAnswer,
  status,
  onSelectAnswer,
  hiddenOptions,
}) => {
  if (!questionData) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Câu {currentQuestionIndex + 1}/15 (Mức độ: {questionData.level})</h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{questionData.question}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {questionData.options.map((option, idx) => {
          const isHidden = hiddenOptions.includes(idx);
          let backgroundColor = 'white';

          if (isHidden) {
            backgroundColor = '#e0e0e0';
          } else if (status === 'locked' && selectedAnswer === idx) {
            backgroundColor = 'orange';
          } else if (status === 'revealed') {
            if (idx === questionData.answer) {
              backgroundColor = 'lightgreen';
            } else if (selectedAnswer === idx) {
              backgroundColor = 'lightcoral';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => !isHidden && onSelectAnswer(idx)}
              disabled={status !== 'answering' || isHidden}
              style={{
                padding: '12px',
                textAlign: 'left',
                backgroundColor,
                cursor: status === 'answering' && !isHidden ? 'pointer' : 'default',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                visibility: isHidden ? 'hidden' : 'visible',
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