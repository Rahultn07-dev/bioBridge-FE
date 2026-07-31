import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  questionCount,
  onApplyFilters,
  onResetFilters 
}) => {
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

  const chapterOptions = [
    { value: 'all', label: 'All Chapters' },
    { value: 'mechanics', label: 'Mechanics' },
    { value: 'thermodynamics', label: 'Thermodynamics' },
    { value: 'optics', label: 'Optics' },
    { value: 'organic', label: 'Organic Chemistry' },
    { value: 'inorganic', label: 'Inorganic Chemistry' },
    { value: 'cell-biology', label: 'Cell Biology' },
    { value: 'genetics', label: 'Genetics' },
    { value: 'calculus', label: 'Calculus' },
    { value: 'algebra', label: 'Algebra' }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          fixed lg:relative top-0 right-0 h-full bg-card border-l border-border z-50
          w-80 transition-smooth overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Filter Questions
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary transition-smooth"
            aria-label="Close filters"
          >
            <Icon name="X" size={20} color="var(--color-foreground)" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <Select
              label="Subject"
              options={subjectOptions}
              value={filters?.subject}
              onChange={(value) => onFilterChange('subject', value)}
            />
          </div>

          <div>
            <Select
              label="Chapter/Topic"
              options={chapterOptions}
              value={filters?.chapter}
              onChange={(value) => onFilterChange('chapter', value)}
              searchable
            />
          </div>

          <div>
            <Select
              label="Difficulty Level"
              options={difficultyOptions}
              value={filters?.difficulty}
              onChange={(value) => onFilterChange('difficulty', value)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-caption font-medium text-foreground">
              Question Status
            </label>
            <Checkbox
              label="Show unattempted only"
              checked={filters?.unattempted}
              onChange={(e) => onFilterChange('unattempted', e?.target?.checked)}
            />
            <Checkbox
              label="Show incorrect only"
              checked={filters?.incorrect}
              onChange={(e) => onFilterChange('incorrect', e?.target?.checked)}
            />
            <Checkbox
              label="Show bookmarked"
              checked={filters?.bookmarked}
              onChange={(e) => onFilterChange('bookmarked', e?.target?.checked)}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-caption text-muted-foreground">
                Available Questions
              </span>
              <span className="text-lg font-heading font-semibold text-primary">
                {questionCount}
              </span>
            </div>

            <div className="space-y-2">
              <Button
                variant="default"
                fullWidth
                onClick={onApplyFilters}
                iconName="Filter"
                iconPosition="left"
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={onResetFilters}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;