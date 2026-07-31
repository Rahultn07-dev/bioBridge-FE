import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityTable = ({ activities }) => {
  const getSubjectColor = (subject) => {
    const colors = {
      Physics: 'text-blue-400 bg-blue-400/10',
      Chemistry: 'text-purple-400 bg-purple-400/10',
      Mathematics: 'text-amber-400 bg-amber-400/10',
      Biology: 'text-green-400 bg-green-400/10'
    };
    return colors?.[subject] || 'text-slate-400 bg-slate-400/10';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-1 md:mb-2">
            Recent Activity
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Your latest question-solving sessions
          </p>
        </div>
        <Icon name="Activity" size={20} color="var(--color-primary)" />
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-caption font-medium text-muted-foreground">
                  Date & Time
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-caption font-medium text-muted-foreground">
                  Subject
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-caption font-medium text-muted-foreground">
                  Topic
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-caption font-medium text-muted-foreground">
                  Questions
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-caption font-medium text-muted-foreground">
                  Accuracy
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {activities?.map((activity) => (
                <tr key={activity?.id} className="hover:bg-secondary/50 transition-smooth">
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm md:text-base font-caption text-foreground">
                        {formatDate(activity?.date)}
                      </span>
                      <span className="text-xs md:text-sm font-caption text-muted-foreground">
                        {formatTime(activity?.date)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className={`inline-flex items-center gap-2 px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-caption font-medium ${getSubjectColor(activity?.subject)}`}>
                      {activity?.subject}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="text-sm md:text-base font-caption text-foreground line-clamp-2">
                      {activity?.topic}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                    <span className="text-sm md:text-base font-caption font-medium text-foreground whitespace-nowrap">
                      {activity?.questionsCount}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-sm md:text-base font-caption font-medium whitespace-nowrap ${
                        activity?.accuracy >= 80 ? 'text-success' :
                        activity?.accuracy >= 60 ? 'text-warning': 'text-error'
                      }`}>
                        {activity?.accuracy}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTable;