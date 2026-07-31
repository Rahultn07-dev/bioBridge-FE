import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuestionCard = ({ 
  question, 
  onAnswerSelect, 
  onBookmark, 
  onSubmit,
  selectedAnswer,
  isSubmitted,
  showExplanation,
  onJustificationChange,
  justification
}) => {
  const [showJustificationBox, setShowJustificationBox] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'hard':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success/10 border-success/20';
      case 'medium':
        return 'bg-warning/10 border-warning/20';
      case 'hard':
        return 'bg-error/10 border-error/20';
      default:
        return 'bg-muted/10 border-border';
    }
  };

  const getOptionStyle = (optionId) => {
    if (!isSubmitted) {
      return selectedAnswer === optionId
        ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-secondary';
    }

    if (optionId === question?.correctAnswer) {
      return 'border-success bg-success/10';
    }

    if (selectedAnswer === optionId && optionId !== question?.correctAnswer) {
      return 'border-error bg-error/10';
    }

    return 'border-border opacity-60';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-caption font-medium border ${getDifficultyBg(question?.difficulty)} ${getDifficultyColor(question?.difficulty)}`}>
              {question?.difficulty?.charAt(0)?.toUpperCase() + question?.difficulty?.slice(1)}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-caption font-medium bg-muted/10 border border-border text-muted-foreground">
              {question?.subject}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-caption font-medium bg-muted/10 border border-border text-muted-foreground">
              {question?.chapter}
            </span>
          </div>
          <h3 className="text-base md:text-lg font-caption font-medium text-foreground">
            Question {question?.id}
          </h3>
        </div>
        <button
          onClick={() => onBookmark(question?.id)}
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-secondary transition-smooth"
          aria-label={question?.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon
            name={question?.isBookmarked ? 'Bookmark' : 'BookmarkPlus'}
            size={20}
            color={question?.isBookmarked ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
          />
        </button>
      </div>
      <div className="mb-6">
        <p className="text-sm md:text-base text-foreground leading-relaxed mb-4">
          {question?.text}
        </p>
        {question?.image && (
          <div className="w-full max-w-md mx-auto overflow-hidden rounded-lg border border-border">
            <Image
              src={question?.image}
              alt={question?.imageAlt}
              className="w-full h-48 md:h-56 lg:h-64 object-cover"
            />
          </div>
        )}
      </div>
      <div className="space-y-3 mb-6">
        {question?.options?.map((option) => (
          <button
            key={option?.id}
            onClick={() => !isSubmitted && onAnswerSelect(option?.id)}
            disabled={isSubmitted}
            className={`
              w-full p-4 rounded-lg border-2 transition-smooth text-left
              ${getOptionStyle(option?.id)}
              ${!isSubmitted ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-caption font-medium">
                {option?.id}
              </span>
              <span className="flex-1 text-sm md:text-base font-caption text-foreground">
                {option?.text}
              </span>
              {isSubmitted && option?.id === question?.correctAnswer && (
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
              )}
              {isSubmitted && selectedAnswer === option?.id && option?.id !== question?.correctAnswer && (
                <Icon name="XCircle" size={20} color="var(--color-error)" />
              )}
            </div>
          </button>
        ))}
      </div>
      {!isSubmitted && (
        <Button
          variant="default"
          fullWidth
          onClick={onSubmit}
          disabled={!selectedAnswer}
          iconName="Send"
          iconPosition="right"
        >
          Submit Answer
        </Button>
      )}

      <div className="mt-4">
        <button
          onClick={() => setShowJustificationBox(!showJustificationBox)}
          className="flex items-center gap-2 text-sm font-caption font-medium text-primary hover:text-primary/80 transition-smooth"
        >
          <Icon name={showJustificationBox ? 'ChevronUp' : 'ChevronDown'} size={16} />
          {showJustificationBox ? 'Hide' : 'Show'} Justification & AI Analysis
        </button>

        {showJustificationBox && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-caption font-medium text-foreground mb-2">
                Your Justification
              </label>
              <textarea
                value={justification || ''}
                onChange={(e) => onJustificationChange?.(question?.id, e?.target?.value)}
                placeholder="Explain your reasoning for selecting this answer. Why do you think this is correct? What concepts are you applying?"
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
              />
              <p className="mt-2 text-xs text-muted-foreground flex items-start gap-1">
                <Icon name="Lightbulb" size={12} className="mt-0.5" />
                <span>
                  AI will analyze your justification to understand your thought process and provide personalized feedback
                </span>
              </p>
            </div>

            {justification?.trim() && (
              <Button
                variant="outline"
                onClick={() => {
                  setIsAnalyzing(true);
                  setTimeout(() => {
                    setAiAnalysis({
                      understanding: justification?.length > 50 ? 'good' : 'needs-improvement',
                      feedback: justification?.length > 50
                        ? 'Your reasoning shows good understanding of the concept. You\'ve identified the key principles involved.'
                        : 'Try to elaborate more on your reasoning. Explain which concepts you\'re applying and why.',
                      suggestions: [
                        'Consider reviewing the fundamental principles',
                        'Practice similar problems to strengthen understanding',
                        'Connect this concept to real-world applications'
                      ]
                    });
                    setIsAnalyzing(false);
                  }, 1500);
                }}
                iconName="Sparkles"
                iconPosition="left"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Get AI Analysis'}
              </Button>
            )}

            {aiAnalysis && (
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3 mb-3">
                  <Icon name="Sparkles" size={20} color="var(--color-primary)" />
                  <div className="flex-1">
                    <h4 className="font-caption font-semibold text-foreground mb-1">
                      AI Analysis
                    </h4>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-caption font-medium text-muted-foreground">
                        Understanding Level:
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-caption font-medium ${
                          aiAnalysis?.understanding === 'good' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                        }`}
                      >
                        {aiAnalysis?.understanding === 'good' ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  {aiAnalysis?.feedback}
                </p>
                {aiAnalysis?.suggestions?.length > 0 && (
                  <div>
                    <p className="text-xs font-caption font-medium text-muted-foreground mb-2">
                      Suggestions:
                    </p>
                    <ul className="space-y-1">
                      {aiAnalysis?.suggestions?.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Icon name="CheckCircle2" size={12} className="mt-0.5" color="var(--color-success)" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      // This would navigate to doubt solver with pre-filled context
                      window.location.href = '/doubt-solver';
                    }}
                    className="text-sm font-caption font-medium text-primary hover:text-primary/80 transition-smooth flex items-center gap-2"
                  >
                    <Icon name="MessageCircleQuestion" size={16} />
                    Still confused? Submit to Doubt Solver
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isSubmitted && showExplanation && (
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3 mb-3">
            <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
            <h4 className="font-caption font-semibold text-foreground">
              Explanation
            </h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {question?.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;