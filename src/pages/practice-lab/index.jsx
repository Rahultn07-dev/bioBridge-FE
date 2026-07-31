import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FilterSidebar from './components/FilterSidebar';
import QuestionCard from './components/QuestionCard';
import QuestionNavigator from './components/QuestionNavigator';
import SessionStats from './components/SessionStats';
import PracticeTimer from './components/PracticeTimer';

const PracticeLab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [timerActive, setTimerActive] = useState(true);
  const [justifications, setJustifications] = useState({});
  const [sessionStats, setSessionStats] = useState({
    totalAttempted: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalTime: 0
  });

  const [filters, setFilters] = useState({
    subject: location?.state?.prefilter?.subject || 'all',
    chapter: location?.state?.prefilter?.chapter || 'all',
    difficulty: 'all',
    unattempted: false,
    incorrect: false,
    bookmarked: false
  });

  const allQuestions = [
  {
    id: 1,
    subject: 'Physics',
    chapter: 'Mechanics',
    difficulty: 'medium',
    text: 'A block of mass 5 kg is placed on a rough horizontal surface with coefficient of friction μ = 0.4. What is the minimum force required to move the block? (Take g = 10 m/s²)',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aa9ecef1-1764660290166.png",
    imageAlt: 'Physics diagram showing a rectangular block on a horizontal surface with force vectors and friction arrows illustrated in blue and red',
    options: [
    { id: 'A', text: '10 N' },
    { id: 'B', text: '20 N' },
    { id: 'C', text: '30 N' },
    { id: 'D', text: '40 N' }],

    correctAnswer: 'B',
    explanation: 'The minimum force required to overcome friction is F = μN = μmg = 0.4 × 5 × 10 = 20 N. This is the static friction force that must be exceeded to initiate motion.',
    isBookmarked: false
  },
  {
    id: 2,
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    difficulty: 'hard',
    text: 'Which of the following compounds will undergo nucleophilic substitution reaction most readily?\n\nConsider the leaving group ability and steric factors in your answer.',
    options: [
    { id: 'A', text: 'CH₃-Cl' },
    { id: 'B', text: 'CH₃-Br' },
    { id: 'C', text: 'CH₃-I' },
    { id: 'D', text: 'CH₃-F' }],

    correctAnswer: 'C',
    explanation: 'CH₃-I undergoes nucleophilic substitution most readily because iodine is the best leaving group among the halogens. The C-I bond is the weakest and most polarizable, making it easier to break during the substitution reaction.',
    isBookmarked: false
  },
  {
    id: 3,
    subject: 'Biology',
    chapter: 'Cell Biology',
    difficulty: 'easy',
    text: 'Which organelle is known as the powerhouse of the cell and is responsible for ATP production through cellular respiration?',
    image: "https://images.unsplash.com/photo-1631048008444-cd48b97b5564",
    imageAlt: 'Microscopic view of cellular structures showing mitochondria as elongated bean-shaped organelles with visible cristae in purple and pink fluorescent staining',
    options: [
    { id: 'A', text: 'Nucleus' },
    { id: 'B', text: 'Mitochondria' },
    { id: 'C', text: 'Ribosome' },
    { id: 'D', text: 'Golgi Apparatus' }],

    correctAnswer: 'B',
    explanation: 'Mitochondria are called the powerhouse of the cell because they generate most of the cell\'s supply of ATP through oxidative phosphorylation during cellular respiration. The inner membrane contains the electron transport chain essential for this process.',
    isBookmarked: false
  },
  {
    id: 4,
    subject: 'Mathematics',
    chapter: 'Calculus',
    difficulty: 'medium',
    text: 'Find the derivative of f(x) = x³ + 2x² - 5x + 7 at x = 2.',
    options: [
    { id: 'A', text: '15' },
    { id: 'B', text: '17' },
    { id: 'C', text: '19' },
    { id: 'D', text: '21' }],

    correctAnswer: 'C',
    explanation: 'f\'(x) = 3x² + 4x - 5. At x = 2: f\'(2) = 3(2)² + 4(2) - 5 = 12 + 8 - 5 = 19. The derivative represents the instantaneous rate of change of the function at that point.',
    isBookmarked: false
  },
  {
    id: 5,
    subject: 'Physics',
    chapter: 'Thermodynamics',
    difficulty: 'hard',
    text: 'An ideal gas undergoes an isothermal expansion at 300 K. If the volume doubles, what is the change in entropy? (R = 8.314 J/mol·K)',
    options: [
    { id: 'A', text: '5.76 J/mol·K' },
    { id: 'B', text: '6.93 J/mol·K' },
    { id: 'C', text: '8.31 J/mol·K' },
    { id: 'D', text: '9.12 J/mol·K' }],

    correctAnswer: 'A',
    explanation: 'For isothermal expansion: ΔS = nR ln(V₂/V₁) = R ln(2) = 8.314 × 0.693 = 5.76 J/mol·K. Entropy increases during expansion as the system becomes more disordered.',
    isBookmarked: false
  },
  {
    id: 6,
    subject: 'Chemistry',
    chapter: 'Inorganic Chemistry',
    difficulty: 'easy',
    text: 'What is the oxidation state of chromium in K₂Cr₂O₇ (potassium dichromate)?',
    options: [
    { id: 'A', text: '+3' },
    { id: 'B', text: '+4' },
    { id: 'C', text: '+6' },
    { id: 'D', text: '+7' }],

    correctAnswer: 'C',
    explanation: 'In K₂Cr₂O₇: 2(+1) + 2x + 7(-2) = 0, where x is the oxidation state of Cr. Solving: 2 + 2x - 14 = 0, therefore 2x = 12, x = +6. Chromium exhibits +6 oxidation state in dichromate.',
    isBookmarked: false
  },
  {
    id: 7,
    subject: 'Biology',
    chapter: 'Genetics',
    difficulty: 'medium',
    text: 'In a dihybrid cross between two heterozygous parents (AaBb × AaBb), what is the phenotypic ratio of the offspring?',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16f770d90-1766135514584.png",
    imageAlt: 'Scientific illustration of DNA double helix structure with genetic markers and chromosome diagrams showing inheritance patterns in blue and green colors',
    options: [
    { id: 'A', text: '3:1' },
    { id: 'B', text: '1:2:1' },
    { id: 'C', text: '9:3:3:1' },
    { id: 'D', text: '1:1:1:1' }],

    correctAnswer: 'C',
    explanation: 'The classic dihybrid cross phenotypic ratio is 9:3:3:1, representing 9 dominant for both traits, 3 dominant for first trait only, 3 dominant for second trait only, and 1 recessive for both traits.',
    isBookmarked: false
  },
  {
    id: 8,
    subject: 'Mathematics',
    chapter: 'Algebra',
    difficulty: 'easy',
    text: 'Solve for x: 2x + 5 = 17',
    options: [
    { id: 'A', text: 'x = 4' },
    { id: 'B', text: 'x = 6' },
    { id: 'C', text: 'x = 8' },
    { id: 'D', text: 'x = 10' }],

    correctAnswer: 'B',
    explanation: '2x + 5 = 17. Subtract 5 from both sides: 2x = 12. Divide both sides by 2: x = 6. This is a simple linear equation solved using basic algebraic operations.',
    isBookmarked: false
  }];


  const [questions, setQuestions] = useState(allQuestions);

  useEffect(() => {
    if (location?.state?.prefilter) {
      applyFilters();
    }
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filtered = [...allQuestions];

    if (filters?.subject !== 'all') {
      filtered = filtered?.filter((q) => q?.subject?.toLowerCase() === filters?.subject);
    }

    if (filters?.chapter !== 'all') {
      filtered = filtered?.filter((q) => q?.chapter?.toLowerCase()?.includes(filters?.chapter));
    }

    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter((q) => q?.difficulty === filters?.difficulty);
    }

    if (filters?.unattempted) {
      filtered = filtered?.filter((q) => !answeredQuestions?.includes(q?.id));
    }

    if (filters?.incorrect) {
      filtered = filtered?.filter((q) => answeredQuestions?.includes(q?.id));
    }

    if (filters?.bookmarked) {
      filtered = filtered?.filter((q) => bookmarkedQuestions?.includes(q?.id));
    }

    setQuestions(filtered);
    setCurrentQuestionIndex(0);
    setFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      subject: 'all',
      chapter: 'all',
      difficulty: 'all',
      unattempted: false,
      incorrect: false,
      bookmarked: false
    });
    setQuestions(allQuestions);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions?.[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

    setIsSubmitted(true);
    setAnsweredQuestions((prev) => [...prev, currentQuestion?.id]);
    setSessionStats((prev) => ({
      ...prev,
      totalAttempted: prev?.totalAttempted + 1,
      correctAnswers: isCorrect ? prev?.correctAnswers + 1 : prev?.correctAnswers,
      incorrectAnswers: !isCorrect ? prev?.incorrectAnswers + 1 : prev?.incorrectAnswers,
      totalTime: prev?.totalTime + 120
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(null);
    setIsSubmitted(false);
  };

  const handleBookmark = (questionId) => {
    setBookmarkedQuestions((prev) =>
      prev?.includes(questionId)
        ? prev?.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleJustificationChange = (questionId, text) => {
    setJustifications((prev) => ({
      ...prev,
      [questionId]: text
    }));
  };

  const filteredQuestions = questions?.filter((q) => !answeredQuestions?.includes(q?.id));

  const currentQuestion = filteredQuestions?.[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar isCollapsed={sidebarCollapsed} />
      <div className="ml-0 lg:ml-60 transition-smooth">
        <div className="flex">
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <BreadcrumbTrail />
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                    Practice Lab
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Solve questions with intelligent filtering and real-time progress tracking
                  </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => navigate('/practice/session/demo-session/justify', { replace: true })}
                      iconName="Flag"
                      iconPosition="left"
                    >
                      End Session
                    </Button>
                  <button
                    onClick={() => setFilterOpen(true)}
                    className="lg:hidden w-11 h-11 flex items-center justify-center bg-card border border-border rounded-md hover:bg-secondary transition-smooth"
                    aria-label="Open filters"
                  >
                    <Icon name="SlidersHorizontal" size={20} color="var(--color-foreground)" />
                  </button>
                </div>
              </div>

              {/* ── Session Stats Bar (always visible) ─────────────── */}
              <div className="flex items-center gap-3 md:gap-6 bg-card border border-border rounded-xl px-4 py-3 mb-6 flex-wrap">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="CheckCircle" size={15} className="text-emerald-400" />
                  <span className="text-foreground font-bold">{sessionStats?.correctAnswers || 0}</span>
                  <span className="text-muted-foreground">correct</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="XCircle" size={15} className="text-rose-400" />
                  <span className="text-foreground font-bold">{sessionStats?.incorrectAnswers || 0}</span>
                  <span className="text-muted-foreground">wrong</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Target" size={15} className="text-blue-400" />
                  <span className="text-foreground font-bold">
                    {sessionStats?.totalAttempted > 0
                      ? Math.round((sessionStats?.correctAnswers / sessionStats?.totalAttempted) * 100)
                      : 0}%
                  </span>
                  <span className="text-muted-foreground">accuracy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="BookOpen" size={15} className="text-muted-foreground" />
                  <span className="text-foreground font-bold">{sessionStats?.totalAttempted || 0}/{questions?.length}</span>
                  <span className="text-muted-foreground">answered</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Physics · Mechanics · Practice</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => navigate('/practice/session/demo-session/justify', { replace: true })}
                    iconName="Flag"
                    iconPosition="left"
                  >
                    End Session
                  </Button>
                </div>
              </div>

              {questions?.length === 0 ?
              <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
                  <Icon name="FileQuestion" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                    No Questions Found
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to see more questions
                  </p>
                  <Button variant="default" onClick={resetFilters} iconName="RotateCcw" iconPosition="left">
                    Reset Filters
                  </Button>
                </div> :

              <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                    <div className="lg:col-span-2">
                      <QuestionCard
                      question={currentQuestion}
                      onAnswerSelect={handleAnswerSelect}
                      onBookmark={handleBookmark}
                      onSubmit={handleSubmit}
                      selectedAnswer={selectedAnswer}
                      isSubmitted={isSubmitted}
                      showExplanation={isSubmitted}
                      onJustificationChange={handleJustificationChange}
                      justification={justifications?.[currentQuestion?.id]}
                      />


                      <div className="flex items-center justify-between gap-4 mt-6">
                        <Button
                        variant="outline"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        iconName="ChevronLeft"
                        iconPosition="left">

                          Previous
                        </Button>

                        <span className="text-sm font-caption text-muted-foreground">
                          Question {currentQuestionIndex + 1} of {questions?.length}
                        </span>

                        <Button
                        variant="outline"
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === questions?.length - 1}
                        iconName="ChevronRight"
                        iconPosition="right">

                          Next
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <PracticeTimer
                      isActive={timerActive}
                      onPause={() => setTimerActive(false)}
                      onResume={() => setTimerActive(true)}
                      onReset={() => setTimerActive(true)} />


                      <SessionStats stats={sessionStats} />

                      <QuestionNavigator
                      questions={questions}
                      currentIndex={currentQuestionIndex}
                      onQuestionSelect={handleQuestionSelect}
                      answeredQuestions={answeredQuestions}
                      bookmarkedQuestions={bookmarkedQuestions} />

                    </div>
                  </div>
                </>
              }
            </div>
          </main>

          <FilterSidebar
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            questionCount={questions?.length}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters} />

        </div>
      </div>
    </div>);

};

export default PracticeLab;