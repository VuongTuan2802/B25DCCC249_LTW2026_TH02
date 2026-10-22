import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <h2>Không tìm thấy câu hỏi</h2>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Câu hỏi số {question.id} ({LEVELS[question.level]})</h2>
      <p><strong>{question.question}</strong></p>
      <ul>
        {question.options.map((option, idx) => {
          const isCorrect = idx === question.answer;
          return (
            <li
              key={idx}
              style={{
                backgroundColor: isCorrect ? 'lightgreen' : 'transparent',
                padding: '4px',
                marginBottom: '4px',
              }}
            >
              {LETTERS[idx]}. {option} {isCorrect && ' (Đáp án đúng)'}
            </li>
          );
        })}
      </ul>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default QuestionDetail;