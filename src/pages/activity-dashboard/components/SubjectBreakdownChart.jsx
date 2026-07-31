import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const SubjectBreakdownChart = ({ data }) => {
  const COLORS = {
    Physics: '#3B82F6',
    Chemistry: '#A855F7',
    Mathematics: '#F59E0B',
    Biology: '#10B981'
  };

  const chartData = [
    { name: 'Physics', value: data?.physics, color: COLORS?.Physics },
    { name: 'Chemistry', value: data?.chemistry, color: COLORS?.Chemistry },
    { name: 'Mathematics', value: data?.mathematics, color: COLORS?.Mathematics },
    { name: 'Biology', value: data?.biology, color: COLORS?.Biology }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-md shadow-lg px-3 py-2">
          <p className="text-sm font-caption text-foreground font-medium">{payload?.[0]?.name}</p>
          <p className="text-sm font-caption text-primary font-semibold">
            {payload?.[0]?.value} questions
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 md:w-4 md:h-4 rounded-sm"
              style={{ backgroundColor: entry?.color }}
            ></div>
            <span className="text-xs md:text-sm font-caption text-foreground">
              {entry?.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-1 md:mb-2">
            Subject Distribution
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Questions solved by subject this month
          </p>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
        <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Subject Distribution Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100)?.toFixed(0)}%`}
                outerRadius="70%"
                fill="#8884d8"
                dataKey="value"
              >
                {chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubjectBreakdownChart;