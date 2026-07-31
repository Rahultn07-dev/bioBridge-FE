import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Icon from '../../../components/AppIcon';

const ActivityHeatmap = ({ activityData }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const getIntensityColor = (count) => {
    if (count === 0) return 'bg-slate-800';
    if (count <= 5) return 'bg-emerald-900/40';
    if (count <= 10) return 'bg-emerald-700/60';
    if (count <= 20) return 'bg-emerald-600/80';
    return 'bg-emerald-500';
  };

  const getTooltipContent = (day) => {
    if (day?.count === 0) {
      return `<div class="text-sm">
        <div class="font-semibold mb-1">${day?.date}</div>
        <div class="text-slate-400">No questions solved</div>
      </div>`;
    }

    return `<div class="text-sm">
      <div class="font-semibold mb-2">${day?.date}</div>
      <div class="text-emerald-400 font-medium mb-2">${day?.count} questions solved</div>
      <div class="space-y-1">
        <div class="flex justify-between gap-4">
          <span class="text-slate-400">Physics:</span>
          <span class="text-white font-medium">${day?.subjects?.physics}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-slate-400">Chemistry:</span>
          <span class="text-white font-medium">${day?.subjects?.chemistry}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-slate-400">Mathematics:</span>
          <span class="text-white font-medium">${day?.subjects?.mathematics}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-slate-400">Biology:</span>
          <span class="text-white font-medium">${day?.subjects?.biology}</span>
        </div>
      </div>
    </div>`;
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-1 md:mb-2">
            365-Day Activity Overview
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Track your daily question-solving progress throughout the year
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
          <span className="text-xs md:text-sm font-caption text-muted-foreground">
            Last 365 days
          </span>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
        <div className="mb-4 md:mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-xs md:text-sm font-caption text-muted-foreground">Less</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-slate-800 rounded-sm border border-border"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-900/40 rounded-sm border border-border"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-700/60 rounded-sm border border-border"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-600/80 rounded-sm border border-border"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-sm border border-border"></div>
            </div>
            <span className="text-xs md:text-sm font-caption text-muted-foreground">More</span>
          </div>
        </div>

        <div className="overflow-x-auto scroll-smooth">
          <div className="min-w-max">
            <div className="flex gap-1 mb-2">
              <div className="w-8 md:w-10"></div>
              {months?.map((month, idx) => (
                <div
                  key={idx}
                  className="text-xs md:text-sm font-caption text-muted-foreground"
                  style={{ width: `${(365 / 12) * 3}px` }}
                >
                  {month}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              <div className="flex flex-col gap-1 justify-between py-1">
                {weekDays?.map((day, idx) => (
                  <div
                    key={idx}
                    className="text-xs md:text-sm font-caption text-muted-foreground h-3 md:h-4 flex items-center"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}>
                {activityData?.map((day, idx) => (
                  <div
                    key={idx}
                    data-tooltip-id="activity-tooltip"
                    data-tooltip-html={getTooltipContent(day)}
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-sm border border-border cursor-pointer transition-smooth hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background ${getIntensityColor(day?.count)}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Tooltip
          id="activity-tooltip"
          place="top"
          className="!bg-popover !text-popover-foreground !border !border-border !rounded-md !shadow-lg !px-3 !py-2 !z-50"
          style={{ maxWidth: '280px' }}
        />
      </div>
    </div>
  );
};

export default ActivityHeatmap;