import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DoubtHistoryTable = ({ doubts, onViewDetails }) => {
  const [expandedDoubt, setExpandedDoubt] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'resolved':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getSubjectColor = (subject) => {
    switch (subject) {
      case 'physics':
        return 'text-blue-400 bg-blue-400/10';
      case 'chemistry':
        return 'text-purple-400 bg-purple-400/10';
      case 'biology':
        return 'text-green-400 bg-green-400/10';
      case 'mathematics':
        return 'text-orange-400 bg-orange-400/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getPriorityIcon = (priority) => {
    return priority === 'urgent' ? (
      <Icon name="AlertCircle" size={14} color="var(--color-destructive)" />
    ) : null;
  };

  const toggleExpand = (doubtId) => {
    setExpandedDoubt(expandedDoubt === doubtId ? null : doubtId);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (doubts?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
          <Icon name="MessageCircleQuestion" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
          No Doubts Yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Submit your first doubt to get expert assistance
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-muted/20 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-caption font-medium text-foreground">
                Question
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-caption font-medium text-foreground">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-caption font-medium text-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-caption font-medium text-foreground">
                Date
              </th>
              <th className="px-4 py-3 text-center text-xs md:text-sm font-caption font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {doubts?.map((doubt) => (
              <React.Fragment key={doubt?.id}>
                <tr className="hover:bg-muted/10 transition-smooth">
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      {getPriorityIcon(doubt?.priority)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground line-clamp-2 mb-1">
                          {doubt?.question}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {doubt?.concept}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-caption font-medium ${getSubjectColor(doubt?.subject)}`}>
                      {doubt?.subject?.charAt(0)?.toUpperCase() + doubt?.subject?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-caption font-medium ${getStatusColor(doubt?.status)}`}>
                      <Icon 
                        name={doubt?.status === 'answered' ? 'CheckCircle2' : doubt?.status === 'pending' ? 'Clock' : 'CheckCheck'} 
                        size={12} 
                      />
                      {doubt?.status?.charAt(0)?.toUpperCase() + doubt?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-foreground">
                      {formatDate(doubt?.submittedAt)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(doubt?.submittedAt)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleExpand(doubt?.id)}
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted/20 transition-smooth"
                        aria-label={expandedDoubt === doubt?.id ? 'Collapse details' : 'Expand details'}
                      >
                        <Icon 
                          name={expandedDoubt === doubt?.id ? 'ChevronUp' : 'ChevronDown'} 
                          size={16} 
                          color="var(--color-foreground)" 
                        />
                      </button>
                      {doubt?.rating && (
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} color="var(--color-warning)" />
                          <span className="text-xs font-caption text-foreground">
                            {doubt?.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedDoubt === doubt?.id && (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 bg-muted/5">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-caption font-semibold text-foreground mb-2">
                            Original Question
                          </h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {doubt?.question}
                          </p>
                          {doubt?.image && (
                            <div className="mt-3 w-full max-w-md h-48 border border-border rounded-lg overflow-hidden">
                              <Image
                                src={doubt?.image}
                                alt={doubt?.imageAlt}
                                className="w-full h-full object-contain bg-background"
                              />
                            </div>
                          )}
                        </div>

                        {doubt?.response && (
                          <div className="border-t border-border pt-4">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Icon name="UserCheck" size={16} color="var(--color-primary)" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-caption font-semibold text-foreground">
                                    {doubt?.expertName}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(doubt?.respondedAt)} at {formatTime(doubt?.respondedAt)}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {doubt?.response}
                                </p>
                              </div>
                            </div>

                            {doubt?.followUps && doubt?.followUps?.length > 0 && (
                              <div className="ml-11 space-y-3 mt-3 border-l-2 border-border pl-4">
                                {doubt?.followUps?.map((followUp, index) => (
                                  <div key={index} className="text-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-caption font-medium text-foreground">
                                        {followUp?.author}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatDate(followUp?.timestamp)}
                                      </span>
                                    </div>
                                    <p className="text-muted-foreground">
                                      {followUp?.message}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {doubt?.status === 'answered' && (
                              <div className="flex items-center gap-3 mt-4">
                                <Button variant="outline" size="sm" iconName="MessageCircle">
                                  Add Follow-up
                                </Button>
                                <Button variant="success" size="sm" iconName="CheckCheck">
                                  Mark as Resolved
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoubtHistoryTable;