import React from 'react';
import ConceptCell from './ConceptCell';

const ChapterRow = ({ chapter }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 transition-smooth hover:elevation-1">
      <h3 className="text-sm md:text-base font-heading font-semibold text-foreground mb-3 md:mb-4">
        {chapter?.name}
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3">
        {chapter?.concepts?.map((concept) => (
          <ConceptCell
            key={concept?.id}
            concept={concept}
            chapterName={chapter?.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterRow;