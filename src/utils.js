import { MILESTONES, PRIZES } from './data';

export const calcPrize = (correctCount, reason) => {
  if (correctCount === 0) return 0;
  
  // Nếu dừng cuộc chơi, nhận tiền của câu vừa trả lời đúng gần nhất (PRIZES[correctCount - 1])
  if (reason === 'stop') {
    return PRIZES[correctCount - 1];
  }

  // Lọc các mốc an toàn không lớn hơn số câu trả lời đúng
  const passedMilestones = MILESTONES.filter((m) => m <= correctCount);
  
  if (passedMilestones.length === 0) {
    return 0; // Chưa qua mốc an toàn nào và trả lời sai hoặc hết giờ
  }

  // Lấy mốc an toàn cao nhất đã vượt qua
  const highestMilestone = Math.max(...passedMilestones);
  return PRIZES[highestMilestone - 1];
};