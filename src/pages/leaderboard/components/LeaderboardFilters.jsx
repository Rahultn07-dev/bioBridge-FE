import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaderboardFilters = ({
  selectedPeriod,
  setSelectedPeriod,
  selectedExam,
  setSelectedExam,
  selectedSubject,
  setSelectedSubject,
  activeTab
}) => {
  const periods = [
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'all-time', label: 'All Time' }
  ];

  const exams = [
    { value: 'all', label: 'All Exams' },
    { value: 'neet', label: 'NEET' },
    { value: 'jee', label: 'JEE' }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'biology', label: 'Biology' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      <div className="relative">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e?.target?.value)}
          className="appearance-none bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-2 pr-8 text-xs md:text-sm font-caption cursor-pointer hover:bg-secondary/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {periods?.map((period) => (
            <option key={period?.value} value={period?.value}>
              {period?.label}
            </option>
          ))}
        </select>
        <Icon
          name="ChevronDown"
          size={16}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
      <div className="relative">
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e?.target?.value)}
          className="appearance-none bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-2 pr-8 text-xs md:text-sm font-caption cursor-pointer hover:bg-secondary/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {exams?.map((exam) => (
            <option key={exam?.value} value={exam?.value}>
              {exam?.label}
            </option>
          ))}
        </select>
        <Icon
          name="ChevronDown"
          size={16}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
      {activeTab === 'subject' && (
        <div className="relative">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e?.target?.value)}
            className="appearance-none bg-secondary text-secondary-foreground border border-border rounded-lg px-3 py-2 pr-8 text-xs md:text-sm font-caption cursor-pointer hover:bg-secondary/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {subjects?.map((subject) => (
              <option key={subject?.value} value={subject?.value}>
                {subject?.label}
              </option>
            ))}
          </select>
          <Icon
            name="ChevronDown"
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      )}
    </div>
  );
};

export default LeaderboardFilters;