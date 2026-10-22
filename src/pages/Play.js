import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '../data';
import { calcPrize } from '../utils';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';

const Play = ({ questions, playerName }) => {
  const navigate = useNavigate();

  // Chặn vào thẳng trang chơi nếu chưa có tên
  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState('answering'); // answering | locked | revealed
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const currentQuestion = questions[currentIndex];

  // Xử lý đồng hồ đếm ngược
  useEffect(() => {
    if (status !== 'answering') return;

    if (timeLeft <= 0) {
      // Hết giờ tính là trả lời sai
      handleGameOver('Hết giờ!', currentIndex);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status, timeLeft]);

  // Xử lý các bước chờ (1 giây chốt -> 2 giây lộ kết quả)
  useEffect(() => {
    let timeoutId;

    if (status === 'locked') {
      // Sau 1 giây chuyển sang revealed
      timeoutId = setTimeout(() => {
        setStatus('revealed');
      }, 1000);
    } else if (status === 'revealed') {
      // Sau 2 giây kiểm tra đúng/sai
      timeoutId = setTimeout(() => {
        const isCorrect = selectedAnswer === currentQuestion.answer;
        if (isCorrect) {
          if (currentIndex === 14) {
            // Thắng toàn bộ 15 câu
            handleGameWin();
          } else {
            // Sang câu tiếp theo
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else {
          // Trả lời sai
          const earnedMoney = calcPrize(currentIndex, 'wrong');
          handleGameOver('Rất tiếc, bạn đã trả lời sai', currentIndex, earnedMoney);
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

  const handleGameOver = (reasonText, correctCount, overridePrize) => {
    const prize = overridePrize !== undefined ? overridePrize : calcPrize(correctCount, 'wrong');
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

  const handleGameWin = () => {
    navigate('/result', {
      replace: true,
      state: {
        name: playerName,
        prize: 250000000,
        correctCount: 15,
        reason: 'Chúc mừng! Bạn đã trở thành triệu phú',
      },
    });
  };

  return (
    <div style={{ display: 'flex', gap: '30px' }}>
      <div style={{ flex: 1 }}>
        <Timer timeLeft={timeLeft} />
        <QuestionCard
          questionData={currentQuestion}
          currentQuestionIndex={currentIndex}
          selectedAnswer={selectedAnswer}
          status={status}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>
      <div>
        <MoneyLadder currentQuestionIndex={currentIndex} />
      </div>
    </div>
  );
};

export default Play;