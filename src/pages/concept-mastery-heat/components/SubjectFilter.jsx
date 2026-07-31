import React from 'react';
import Button from '../../../components/ui/Button';

const SubjectFilter = ({ subjects, activeSubject, onSubjectChange }) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {subjects?.map((subject) => (
        <Button
          key={subject?.id}
          variant={activeSubject === subject?.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSubjectChange(subject?.id)}
          className="transition-smooth"
        >
          {subject?.name}
        </Button>
      ))}
    </div>
  );
};

export default SubjectFilter;