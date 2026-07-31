import React from 'react';
import Icon from '../../../components/AppIcon';

const QuestionNavigator = ({ 
  questions, 
  currentIndex, 
  onQuestionSelect,
  answeredQuestions,
  bookmarkedQuestions 
}) => {
  const getQuestionStatus = (index) => {
    const questionId = questions?.[index]?.id;
    if (answeredQuestions?.includes(questionId)) {
      return 'answered';
    }
    if (bookmarkedQuestions?.includes(questionId)) {
      return 'bookmarked';
    }
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-success border-success text-white';
      case 'bookmarked':
        return 'bg-warning border-warning text-white';
      default:
        return 'bg-card border-border text-muted-foreground hover:border-primary hover:text-primary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Question Navigator
        </h3>
        <span className="text-sm font-caption text-muted-foreground">
          {currentIndex + 1} / {questions?.length}
        </span>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
        {questions?.map((question, index) => {
          const status = getQuestionStatus(index);
          const isActive = index === currentIndex;

          return (
            <button
              key={question?.id}
              onClick={() => onQuestionSelect(index)}
              className={`
                relative w-full aspect-square rounded-md border-2 transition-smooth
                flex items-center justify-center text-sm font-caption font-medium
                ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                ${getStatusColor(status)}
              `}
              aria-label={`Question ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {index + 1}
              {status === 'bookmarked' && (
                <Icon
                  name="Bookmark"
                  size={12}
                  color="currentColor"
                  className="absolute -top-1 -right-1"
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="space-y-2 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success border-2 border-success" />
          <span className="text-xs font-caption text-muted-foreground">
            Answered ({answeredQuestions?.length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning border-2 border-warning" />
          <span className="text-xs font-caption text-muted-foreground">
            Bookmarked ({bookmarkedQuestions?.length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-card border-2 border-border" />
          <span className="text-xs font-caption text-muted-foreground">
            Unanswered ({questions?.length - answeredQuestions?.length})
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;