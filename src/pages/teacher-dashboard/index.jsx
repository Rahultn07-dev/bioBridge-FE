import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../../components/ui/TeacherSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const stats = [
  { label: 'Total Students', value: '34', trend: '+3 this week', icon: 'Users', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: "Today's POD", value: '22/34', trend: '64.7% completion', icon: 'Calendar', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Batch Accuracy', value: '71.2%', trend: '+2.1% vs last week', icon: 'Target', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'At-Risk Students', value: '5', trend: 'Need attention', icon: 'AlertTriangle', color: 'text-rose-400', bg: 'bg-rose-500/10' },
];

const atRiskStudents = [
  { id: 1, name: 'Arjun Singh', accuracy: 45, streak: 0, predicted: 380, trend: 'down', urgentChapter: 'Human Physiology', lastActive: '3 days ago' },
  { id: 2, name: 'Priya Nair', accuracy: 51, streak: 2, predicted: 412, trend: 'stable', urgentChapter: 'Organic Chemistry', lastActive: '1 day ago' },
  { id: 3, name: 'Riya Sharma', accuracy: 48, streak: 0, predicted: 395, trend: 'down', urgentChapter: 'Mechanics', lastActive: '4 days ago' },
];

const recentActivity = [
  { student: 'Kabir Mehta', action: 'Completed POD', subject: 'Physics', score: '5/5', time: '10 min ago' },
  { student: 'Deepa Pillai', action: 'Asked AI doubt', subject: 'Biology', score: '', time: '25 min ago' },
  { student: 'Rohan Verma', action: 'Practice session', subject: 'Chemistry', score: '14/18', time: '1 hr ago' },
  { student: 'Sanya Gupta', action: 'Test completed', subject: 'Full Mock', score: '487/720', time: '2 hrs ago' },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Teacher Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">NEET Batch A · Jul 16, 2026 · 34 students</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/teacher/pod')} iconName="Calendar" iconPosition="left">
                  Configure POD
                </Button>
                <Button size="sm" onClick={() => navigate('/teacher/questions')} iconName="Plus" iconPosition="left">
                  Add Question
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                    <Icon name={s.icon} size={18} className={s.color} />
                  </div>
                  <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  <div className={`text-xs mt-1 ${s.color}`}>{s.trend}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* At-risk students */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} className="text-rose-400" />
                    At-Risk Students
                  </h3>
                  <Button size="xs" variant="ghost" onClick={() => navigate('/teacher/students')}>View All →</Button>
                </div>
                <div className="space-y-3">
                  {atRiskStudents.map(s => (
                    <div key={s.id} className="flex items-center gap-3 p-3 bg-secondary rounded-xl cursor-pointer hover:bg-secondary/80 transition-colors" onClick={() => navigate(`/teacher/students/${s.id}`)}>
                      <div className="w-9 h-9 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-rose-400 flex-shrink-0">
                        {s.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{s.name}</span>
                          <Icon name={s.trend === 'down' ? 'TrendingDown' : 'Minus'} size={12} className={s.trend === 'down' ? 'text-rose-400' : 'text-muted-foreground'} />
                        </div>
                        <div className="text-xs text-muted-foreground">{s.urgentChapter} · {s.accuracy}% accuracy</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-rose-400">{s.predicted}</div>
                        <div className="text-xs text-muted-foreground">pred. score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Activity" size={16} className="text-primary" />
                  Recent Student Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">{a.student[0]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-foreground">
                          <span className="font-medium">{a.student}</span>
                          <span className="text-muted-foreground"> · {a.action}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{a.subject} {a.score && `· ${a.score}`}</div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* POD completion */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  Today's POD Status
                </h3>
                <span className="text-sm text-primary font-medium">22/34 complete (64.7%)</span>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mb-3">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: '64.7%' }} />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="bg-secondary rounded-lg p-3">
                  <div className="text-lg font-bold text-emerald-400">22</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="text-lg font-bold text-amber-400">8</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="text-lg font-bold text-muted-foreground">4</div>
                  <div className="text-xs text-muted-foreground">Not Started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
