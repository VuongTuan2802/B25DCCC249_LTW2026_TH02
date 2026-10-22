import React from 'react';

const Lifelines = ({ usedLifelines, onUse5050, onUseAudience, onStopGame, disabled }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      <button
        onClick={onUse5050}
        disabled={usedLifelines['5050'] || disabled}
        style={{ padding: '6px 12px' }}
      >
        50:50
      </button>
      <button
        onClick={onUseAudience}
        disabled={usedLifelines['audience'] || disabled}
        style={{ padding: '6px 12px' }}
      >
        Hỏi khán giả
      </button>
      <button
        onClick={onStopGame}
        disabled={disabled}
        style={{ padding: '6px 12px', backgroundColor: '#ffcccc' }}
      >
        Dừng cuộc chơi
      </button>
    </div>
  );
};

export default Lifelines;