import React from 'react';
import { LETTERS } from '../data';

const AudienceChart = ({ chartData }) => {
  if (!chartData) return null;

  return (
    <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h4>Ý kiến khán giả:</h4>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '120px', gap: '20px', paddingTops: '10px' }}>
        {chartData.map((percent, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <span style={{ fontSize: '12px', marginBottom: '5px' }}>{percent}%</span>
            <div
              style={{
                width: '30px',
                height: `${percent * 1}px`,
                backgroundColor: 'dodgerblue',
                transition: 'height 0.3s',
              }}
            ></div>
            <strong style={{ marginTop: '5px' }}>{LETTERS[idx]}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudienceChart;