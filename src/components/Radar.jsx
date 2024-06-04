import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

function RadarChart({ chartData }) {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: 'center' }}>Abilities</h2> */}
      <Radar
        data={chartData}
        options={{
          scales: {
            r: {
              suggestedMin: 10,
              suggestedMax: 100,
            },
          },

          plugins: {
            title: {
              display: false,
              text: 'Habilidades',
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
export default RadarChart;
