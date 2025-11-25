import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface MetricsChartProps {
  scores: {
    logic: number;
    clarity: number;
    impact: number;
    flow: number;
  };
}

const MetricsChart: React.FC<MetricsChartProps> = ({ scores }) => {
  const data = [
    { subject: 'Logic', A: scores.logic, fullMark: 100 },
    { subject: 'Clarity', A: scores.clarity, fullMark: 100 },
    { subject: 'Impact', A: scores.impact, fullMark: 100 },
    { subject: 'Flow', A: scores.flow, fullMark: 100 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#475569" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="A"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="#8b5cf6"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
            itemStyle={{ color: '#c4b5fd' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;
