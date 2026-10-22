import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '../data';
import { calcPrize } from '../utils';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';
import Lifelines from '../components/Lifelines';
import AudienceChart from '../components/AudienceChart';

const Play = ({ questions, playerName, addHistory }) => {
  const navigate = useNavigate();

  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState('answering'); // answering | locked | revealed
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  
  // Trạng thái trợ giúp
  const [usedLifelines, setUsedLifelines] = useState({ '5050': false, audience: false });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [chartData, setChartData] = useState(null);

  const currentQuestion = questions[currentIndex];

  // Quản lý tiêu đề tab document.title
  useEffect(() => {
    document.title = `Câu ${currentIndex + 1}/15 – ${playerName}`;
    return () => {
      document.title = 'Ai là triệu phú';
    };
  }, [currentIndex, playerName]);

  // Reset ẩn đáp án và biểu đồ khi sang câu mới
  useEffect(() => {
    setHiddenOptions([]);
    setChartData(null);
  }, [currentIndex]);

  // Xử lý đồng hồ đếm ngược
  useEffect(() => {
    if (status !== 'answering') return;

    if (timeLeft <= 0) {
      handleFinishGame('Hết giờ!', currentIndex, 'wrong');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status, timeLeft]);

  // Xử lý phím tắt A, B, C, D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status !== 'answering') return;
      const key = e.key.toUpperCase();
      const mapKeyToIdx = { A: 0, B: 1, C: 2, D: 3 };
      if (key in mapKeyToIdx) {
        const idx = mapKeyToIdx[key];
        if (!hiddenOptions.includes(idx)) {
          handleSelectAnswer(idx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, hiddenOptions]);

  // Xử lý hiệu ứng chờ chốt và lộ kết quả
  useEffect(() => {
    let timeoutId;

    if (status === 'locked') {
      timeoutId = setTimeout(() => {
        setStatus('revealed');
      }, 1000);
    } else if (status === 'revealed') {
      timeoutId = setTimeout(() => {
        const isCorrect = selectedAnswer === currentQuestion.answer;
        if (isCorrect) {
          if (currentIndex === 14) {
            handleFinishGame('Chúc mừng! Bạn đã trở thành triệu phú', 15, 'win');
          } else {
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else {
          handleFinishGame('Rất tiếc, bạn đã trả lời sai', currentIndex, 'wrong');
        }
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [status]);

  const handleSelectAnswer = (idx) => {
    if (status !== 'answering') return;
    setSelectedAnswer(idx);
    setStatus('locked');
  };

  // Quyền 50:50
  const handleUse5050 = () => {
    if (usedLifelines['5050'] || status !== 'answering') return;
    const correctIdx = currentQuestion.answer;
    const wrongIndices = [0, 1, 2, 3].filter((idx) => idx !== correctIdx);
    // Chọn ngẫu nhiên 2 đáp án sai để ẩn
    const shuffledWrong = wrongIndices.sort(() => Math.random() - 0.5);
    const toHide = shuffledWrong.slice(0, 2);

    setHiddenOptions(toHide);
    setUsedLifelines((prev) => ({ ...prev, '5050': true }));
  };

  // Quyền Hỏi khán giả
  const handleUseAudience = () => {
    if (usedLifelines['audience'] || status !== 'answering') return;
    const correctIdx = currentQuestion.answer;
    const available = [0, 1, 2, 3].filter((idx) => !hiddenOptions.includes(idx));

    // Đáp án đúng nhận 40-70%
    const correctPercent = Math.floor(Math.random() * 31) + 40;
    let remaining = 100 - correctPercent;

    const percents = [0, 0, 0, 0];
    percents[correctIdx] = correctPercent;

    const otherAvailable = available.filter((idx) => idx !== correctIdx);
    otherAvailable.forEach((idx, i) => {
      if (i === otherAvailable.length - 1) {
        percents[idx] = remaining;
      } else {
        const p = Math.floor(Math.random() * (remaining + 1));
        percents[idx] = p;
        remaining -= p;
      }
    });

    setChartData(percents);
    setUsedLifelines((prev) => ({ ...prev, audience: true }));
  };

  // Quyền Dừng cuộc chơi
  const handleStopGame = () => {
    if (status !== 'answering') return;
    handleFinishGame('Bạn đã dừng cuộc chơi', currentIndex, 'stop');
  };

  const handleFinishGame = (reasonText, correctCount, type) => {
    let prize = 0;
    if (type === 'win') {
      prize = 250000000;
    } else {
      prize = calcPrize(correctCount, type);
    }

    const record = {
      id: Date.now(),
      name: playerName,
      prize,
      correctCount,
      playedAt: new Date().toLocaleString('vi-VN'),
    };

    addHistory(record);

    navigate('/result', {
      replace: true,
      state: {
        name: playerName,
        prize,
        correctCount,
        reason: reasonText,
      },
    });
  };

  return (
    <div style={{ display: 'flex', gap: '30px' }}>
      <div style={{ flex: 1 }}>
        <Lifelines
          usedLifelines={usedLifelines}
          onUse5050={handleUse5050}
          onUseAudience={handleUseAudience}
          onStopGame={handleStopGame}
          disabled={status !== 'answering'}
        />
        <Timer timeLeft={timeLeft} />
        <QuestionCard
          questionData={currentQuestion}
          currentQuestionIndex={currentIndex}
          selectedAnswer={selectedAnswer}
          status={status}
          onSelectAnswer={handleSelectAnswer}
          hiddenOptions={hiddenOptions}
        />
        <AudienceChart chartData={chartData} />
      </div>
      <div>
        <MoneyLadder currentQuestionIndex={currentIndex} />
      </div>
    </div>
  );
};

export default Play;