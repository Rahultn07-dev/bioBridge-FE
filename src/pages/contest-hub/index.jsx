import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContestCard from './components/ContestCard';
import ContestFilters from './components/ContestFilters';
import LeaderboardSection from './components/LeaderboardSection';
import ContestStats from './components/ContestStats';

const ContestHub = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    subject: 'all',
    difficulty: 'all',
    duration: 'all',
    status: 'upcoming'
  });

  const mockContests = [
    {
      id: 1,
      title: 'NEET Mock Test - Full Syllabus',
      subjects: ['physics', 'chemistry', 'biology'],
      difficulty: 'hard',
      duration: 180,
      totalQuestions: 180,
      participants: 2847,
      startDate: new Date('2025-12-30T10:00:00'),
      registrationDeadline: new Date('2025-12-30T09:00:00'),
      status: 'upcoming',
      isPremium: true,
      maxMarks: 720,
      description: 'Complete NEET pattern mock test covering entire syllabus with previous year questions'
    },
    {
      id: 2,
      title: 'JEE Advanced Physics Challenge',
      subjects: ['physics'],
      difficulty: 'hard',
      duration: 120,
      totalQuestions: 60,
      participants: 1523,
      startDate: new Date('2025-12-31T14:00:00'),
      registrationDeadline: new Date('2025-12-31T13:00:00'),
      status: 'upcoming',
      isPremium: false,
      maxMarks: 240,
      description: 'Advanced level physics problems focusing on mechanics, electromagnetism, and modern physics'
    },
    {
      id: 3,
      title: 'Organic Chemistry Speed Test',
      subjects: ['chemistry'],
      difficulty: 'medium',
      duration: 45,
      totalQuestions: 30,
      participants: 3421,
      startDate: new Date('2026-01-02T16:00:00'),
      registrationDeadline: new Date('2026-01-02T15:30:00'),
      status: 'upcoming',
      isPremium: false,
      maxMarks: 120,
      description: 'Rapid-fire organic chemistry questions testing reaction mechanisms and nomenclature'
    },
    {
      id: 4,
      title: 'Biology Topic Test - Genetics',
      subjects: ['biology'],
      difficulty: 'easy',
      duration: 60,
      totalQuestions: 40,
      participants: 4156,
      startDate: new Date('2026-01-03T11:00:00'),
      registrationDeadline: new Date('2026-01-03T10:30:00'),
      status: 'upcoming',
      isPremium: false,
      maxMarks: 160,
      description: 'Focused test on genetics covering Mendelian inheritance, molecular genetics, and evolution'
    },
    {
      id: 5,
      title: 'JEE Main Mathematics Marathon',
      subjects: ['mathematics'],
      difficulty: 'medium',
      duration: 90,
      totalQuestions: 50,
      participants: 2934,
      startDate: new Date('2026-01-04T09:00:00'),
      registrationDeadline: new Date('2026-01-04T08:30:00'),
      status: 'upcoming',
      isPremium: true,
      maxMarks: 200,
      description: 'Comprehensive mathematics test covering calculus, algebra, and coordinate geometry'
    },
    {
      id: 6,
      title: 'NEET Biology Revision Test',
      subjects: ['biology'],
      difficulty: 'medium',
      duration: 75,
      totalQuestions: 50,
      participants: 5234,
      startDate: new Date('2025-12-28T10:00:00'),
      endDate: new Date('2025-12-28T11:15:00'),
      status: 'live',
      isPremium: false,
      maxMarks: 200,
      description: 'Live biology test covering plant and animal physiology'
    }
  ];

  useEffect(() => {
    setContests(mockContests);
    setFilteredContests(mockContests);
  }, []);

  useEffect(() => {
    let result = [...contests];

    if (filters?.search) {
      result = result?.filter((contest) =>
        contest?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        contest?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.subject !== 'all') {
      result = result?.filter((contest) =>
        contest?.subjects?.includes(filters?.subject)
      );
    }

    if (filters?.difficulty !== 'all') {
      result = result?.filter((contest) => contest?.difficulty === filters?.difficulty);
    }

    if (filters?.duration !== 'all') {
      result = result?.filter((contest) => {
        if (filters?.duration === 'short') return contest?.duration <= 60;
        if (filters?.duration === 'medium') return contest?.duration > 60 && contest?.duration <= 120;
        if (filters?.duration === 'long') return contest?.duration > 120;
        return true;
      });
    }

    if (filters?.status !== 'all') {
      result = result?.filter((contest) => contest?.status === filters?.status);
    }

    setFilteredContests(result);
  }, [filters, contests]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      subject: 'all',
      difficulty: 'all',
      duration: 'all',
      status: 'upcoming'
    });
  };

  const calculateStats = () => {
    return {
      total: contests?.length,
      upcoming: contests?.filter((c) => c?.status === 'upcoming')?.length,
      live: contests?.filter((c) => c?.status === 'live')?.length,
      completed: contests?.filter((c) => c?.status === 'completed')?.length
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar isCollapsed={sidebarCollapsed} />
      <div className={`transition-smooth ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="p-4 md:p-6 lg:p-8 pt-16 lg:pt-8">
          <BreadcrumbTrail />

          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="Trophy" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Contest Hub
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  Compete with thousands of students in mock tests and live competitions
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <ContestStats stats={calculateStats()} />

            <ContestFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                  {filters?.status === 'live' ? 'Live Contests' : filters?.status === 'upcoming' ? 'Upcoming Contests' : 'All Contests'}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredContests?.length} {filteredContests?.length === 1 ? 'contest' : 'contests'}
                </span>
              </div>

              {filteredContests?.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                    <Icon name="Trophy" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
                    No Contests Found
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try adjusting your filters to see more contests
                  </p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  {filteredContests?.map((contest) => (
                    <ContestCard key={contest?.id} contest={contest} />
                  ))}
                </div>
              )}
            </div>

            <LeaderboardSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestHub;