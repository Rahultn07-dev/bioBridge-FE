import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ContestFilters = ({ filters, onFilterChange, onReset }) => {
  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'mathematics', label: 'Mathematics' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Short (≤60 min)' },
    { value: 'medium', label: 'Medium (60-120 min)' },
    { value: 'long', label: 'Long (>120 min)' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'live', label: 'Live' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon name="Filter" size={20} color="var(--color-primary)" />
        <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Filter Contests
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            Search
          </label>
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              color="var(--color-muted-foreground)"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              placeholder="Search contests..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Subject"
            options={subjectOptions}
            value={filters?.subject}
            onChange={(value) => onFilterChange('subject', value)}
          />

          <Select
            label="Difficulty"
            options={difficultyOptions}
            value={filters?.difficulty}
            onChange={(value) => onFilterChange('difficulty', value)}
          />

          <Select
            label="Duration"
            options={durationOptions}
            value={filters?.duration}
            onChange={(value) => onFilterChange('duration', value)}
          />

          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onReset} iconName="RotateCcw" iconPosition="left">
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContestFilters;