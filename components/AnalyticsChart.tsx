'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SkillAnalysis, LocationAnalysis } from '@/types/torre';

interface AnalyticsChartProps {
  data: SkillAnalysis[] | LocationAnalysis[];
  type: 'skills' | 'locations';
  title: string;
}

const COLORS = ['#cddc39', '#d4e34a', '#b8c72a', '#a0ae20', '#8a9924', '#76861a', '#627310', '#4e6006', '#3a4a02', '#2a3a00'];

export default function AnalyticsChart({ data, type, title }: AnalyticsChartProps) {
  const chartData = data.map((item, index) => ({
    name: type === 'skills' ? (item as SkillAnalysis).skill : (item as LocationAnalysis).location,
    value: type === 'skills' ? (item as SkillAnalysis).count : (item as LocationAnalysis).count,
    percentage: type === 'skills' ? (item as SkillAnalysis).percentage : (item as LocationAnalysis).percentage,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cddc39" opacity={0.2} />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
              tick={{ fill: '#cddc39' }}
            />
            <YAxis tick={{ fill: '#cddc39' }} />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#2f3135',
                border: '1px solid #cddc39',
                borderRadius: '8px',
                color: '#cddc39'
              }}
              formatter={(value: any, name: string) => [
                `${value} people (${chartData.find(d => d.value === value)?.percentage.toFixed(1)}%)`,
                name
              ]}
            />
            <Bar dataKey="value" fill="#cddc39" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 