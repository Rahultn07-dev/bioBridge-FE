import React from 'react';
import Icon from '../../../components/AppIcon';

const LearningAnalytics = ({ detailed = false }) => {
  const subjectData = [
    { subject: 'Physics', mastery: 82, questionsAttempted: 345, accuracy: 85, color: 'bg-blue-500' },
    { subject: 'Chemistry', mastery: 78, questionsAttempted: 298, accuracy: 88, color: 'bg-green-500' },
    { subject: 'Mathematics', mastery: 75, questionsAttempted: 312, accuracy: 80, color: 'bg-purple-500' },
    { subject: 'Biology', mastery: 85, questionsAttempted: 292, accuracy: 92, color: 'bg-red-500' }
  ];

  const weakAreas = [
    { topic: 'Thermodynamics', subject: 'Physics', accuracy: 62, priority: 'high' },
    { topic: 'Organic Chemistry', subject: 'Chemistry', accuracy: 68, priority: 'high' },
    { topic: 'Calculus', subject: 'Mathematics', accuracy: 71, priority: 'medium' },
    { topic: 'Genetics', subject: 'Biology', accuracy: 75, priority: 'medium' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-success/10 text-success';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="LineChart" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Subject-wise Performance
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              Track your progress across subjects
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {subjectData?.map((subject) => (
            <div key={subject?.subject} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${subject?.color}`} />
                  <span className="text-sm md:text-base font-caption font-medium text-foreground">
                    {subject?.subject}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground font-caption">
                  <span>{subject?.questionsAttempted} questions</span>
                  <span className="font-semibold text-foreground">{subject?.mastery}% mastery</span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`${subject?.color} h-2 rounded-full transition-smooth`}
                  style={{ width: `${subject?.mastery}%` }}
                />
              </div>
              {detailed && (
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-caption pl-6">
                  <span>Accuracy: {subject?.accuracy}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-warning/10 flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Areas for Improvement
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              Focus on these topics to boost your score
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {weakAreas?.map((area, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-smooth"
            >
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-caption font-medium text-foreground mb-1">
                  {area?.topic}
                </h3>
                <p className="text-xs text-muted-foreground font-caption">{area?.subject}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-caption font-semibold text-foreground">{area?.accuracy}%</p>
                  <p className="text-xs text-muted-foreground font-caption">Accuracy</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-caption font-medium ${getPriorityColor(area?.priority)}`}>
                  {area?.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningAnalytics;