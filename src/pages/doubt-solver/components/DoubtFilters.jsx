import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DoubtFilters = ({ filters, onFilterChange, onReset }) => {
  const subjectOptions = [
    { value: '', label: 'All Subjects' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'mathematics', label: 'Mathematics' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'answered', label: 'Answered' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority First' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Filter Doubts
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search by keyword..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          options={subjectOptions}
          value={filters?.subject}
          onChange={(value) => onFilterChange('subject', value)}
          placeholder="Filter by subject"
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Filter by status"
        />

        <Select
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => onFilterChange('sort', value)}
        />
      </div>
    </div>
  );
};

export default DoubtFilters;