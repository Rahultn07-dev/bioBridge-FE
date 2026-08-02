import React from 'react';
import InstitutionTeacherSidebar from '../../components/ui/InstitutionTeacherSidebar';
import Icon from '../../components/AppIcon';

const todayPOD = {
  subject: 'Biology',
  chapter: 'Photosynthesis',
  questions: 5,
  timeLimit: '20 min',
  setBy: 'Institution Admin',
  completionRate: 73.7,
  completed: 28,
  total: 38,
};

const weekSchedule = [
  { day: 'Mon', date: 'Jul 28', subject: 'Biology', chapter: 'Cell Division', completion: 89 },
  { day: 'Tue', date: 'Jul 29', subject: 'Chemistry', chapter: 'Equilibrium', completion: 76 },
  { day: 'Wed', date: 'Jul 30', subject: 'Physics', chapter: 'Waves', completion: 82 },
  { day: 'Thu', date: 'Jul 31', subject: 'Biology', chapter: 'Genetics', completion: 71 },
  { day: 'Fri', date: 'Aug 1', subject: 'Chemistry', chapter: 'Electrochemistry', completion: 68 },
  { day: 'Sat', date: 'Aug 2', subject: 'Biology', chapter: 'Photosynthesis', completion: 73.7, isToday: true },
  { day: 'Sun', date: 'Aug 3', subject: 'Physics', chapter: 'Optics', completion: null },
];

const subjectColor = { Biology: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', Chemistry: 'text-amber-400 bg-amber-500/10 border-amber-500/20', Physics: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };

const InstitutionTeacherPOD = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <InstitutionTeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-5 md:p-7">

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 uppercase tracking-wide">Read Only</span>
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground">POD Schedule</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Daily Problem of the Day for NEET Batch B — set by your institution admin.</p>
            </div>

            {/* Read-only notice */}
            <div className="mb-5 flex items-start gap-3 p-3.5 bg-indigo-500/6 border border-indigo-500/15 rounded-xl">
              <Icon name="Lock" size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                The POD schedule is set by your institution admin at <span className="font-semibold text-foreground">Allen Kota</span>. You can view completion rates and monitor student progress. To request changes to the schedule, contact your admin.
              </p>
            </div>

            {/* Today's POD */}
            <div className="bg-card border border-teal-500/20 rounded-xl p-5 mb-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-bold text-teal-400 uppercase tracking-wide mb-1">{"Today's POD"}</div>
                  <h2 className="text-lg font-heading font-bold text-foreground">{todayPOD.chapter}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${subjectColor[todayPOD.subject]}`}>{todayPOD.subject}</span>
                    <span className="text-xs text-muted-foreground">{todayPOD.questions} questions · {todayPOD.timeLimit}</span>
                    <span className="text-xs text-muted-foreground">Set by: {todayPOD.setBy}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-heading font-bold text-teal-400">{todayPOD.completionRate}%</div>
                  <div className="text-xs text-muted-foreground">{todayPOD.completed}/{todayPOD.total} students</div>
                </div>
              </div>
              <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${todayPOD.completionRate}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { value: todayPOD.completed, label: 'Completed', color: 'text-emerald-400' },
                  { value: todayPOD.total - todayPOD.completed - 3, label: 'In Progress', color: 'text-amber-400' },
                  { value: 3, label: 'Not Started', color: 'text-muted-foreground' },
                ].map((s, i) => (
                  <div key={i} className="bg-secondary rounded-lg py-2.5 text-center">
                    <div className={`text-xl font-heading font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-[11px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Week schedule */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3.5 border-b border-border">
                <h3 className="font-heading font-semibold text-foreground text-sm flex items-center gap-2">
                  <Icon name="Calendar" size={14} className="text-teal-400" />
                  This Week
                </h3>
              </div>
              <div className="divide-y divide-border/50">
                {weekSchedule.map((d, i) => (
                  <div key={i} className={`flex items-center gap-4 px-4 py-3 ${d.isToday ? 'bg-teal-500/5' : 'hover:bg-secondary/20 transition-colors'}`}>
                    <div className={`w-12 flex-shrink-0 text-center ${d.isToday ? 'text-teal-400' : 'text-muted-foreground'}`}>
                      <div className="text-[11px] font-bold uppercase">{d.day}</div>
                      <div className="text-xs">{d.date}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${subjectColor[d.subject]}`}>{d.subject}</span>
                        <span className="text-sm text-foreground">{d.chapter}</span>
                        {d.isToday && <span className="text-[10px] font-bold bg-teal-500/20 text-teal-400 px-1.5 rounded">TODAY</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {d.completion !== null ? (
                        <>
                          <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${d.completion >= 75 ? 'bg-emerald-500' : d.completion >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${d.completion}%` }}
                            />
                          </div>
                          <span className="text-sm font-mono text-foreground w-12 text-right">{d.completion}%</span>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground italic w-32 text-right">Scheduled</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionTeacherPOD;
