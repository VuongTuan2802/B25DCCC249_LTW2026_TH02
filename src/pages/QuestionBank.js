import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const QuestionBank = ({ questions }) => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = questions.filter((q) => {
    const matchesLevel = selectedLevel === 'All' || q.level === Number(selectedLevel);
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
        <div>
          <label>Mức độ: </label>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
            <option value="All">Tất cả</option>
            <option value="1">Dễ</option>
            <option value="2">Trung bình</option>
            <option value="3">Khó</option>
          </select>
        </div>
        <div>
          <label>Tìm kiếm: </label>
          <input
            type="text"
            placeholder="Nhập nội dung câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <p><strong>Có {filteredQuestions.length} câu hỏi</strong></p>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;