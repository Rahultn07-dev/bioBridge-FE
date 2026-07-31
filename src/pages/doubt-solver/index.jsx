import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import DoubtSubmissionForm from './components/DoubtSubmissionForm';
import DoubtHistoryTable from './components/DoubtHistoryTable';
import DoubtFilters from './components/DoubtFilters';
import DoubtStats from './components/DoubtStats';
import Icon from '../../components/AppIcon';

const DoubtSolver = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [doubts, setDoubts] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    status: '',
    sort: 'newest'
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const mockDoubts = [
  {
    id: 1,
    question: "I'm having trouble understanding the concept of electromagnetic induction. Specifically, how does Lenz's law determine the direction of induced current? Can you explain with a practical example?",
    subject: "physics",
    concept: "Electromagnetism",
    priority: "urgent",
    status: "answered",
    submittedAt: new Date("2025-12-24T10:30:00"),
    respondedAt: new Date("2025-12-24T14:20:00"),
    expertName: "Dr. Rajesh Kumar",
    response: `Lenz's law states that the direction of induced current is such that it opposes the change in magnetic flux that produced it.\n\nPractical Example:\nImagine a bar magnet approaching a conducting loop:\n1. As the north pole approaches, magnetic flux through the loop increases\n2. By Lenz's law, induced current creates a magnetic field to oppose this increase\n3. The induced current flows in a direction that creates a north pole facing the approaching magnet\n4. This opposition is nature's way of conserving energy\n\nKey Point: The induced current always acts to maintain the status quo of magnetic flux.`,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_133c91765-1766743182206.png",
    imageAlt: "Physics textbook page showing electromagnetic induction diagram with coil and magnet illustration on white background",
    rating: 4.8,
    followUps: [
    {
      author: "You",
      message: "Thank you! Can you explain how this relates to energy conservation?",
      timestamp: new Date("2025-12-24T15:10:00")
    },
    {
      author: "Dr. Rajesh Kumar",
      message: "Great question! If the induced current aided the change instead of opposing it, we could create energy from nothing, violating conservation laws. The opposition ensures energy is conserved.",
      timestamp: new Date("2025-12-24T15:45:00")
    }]

  },
  {
    id: 2,
    question: "In organic chemistry, how do I identify the major product in an elimination reaction? I'm confused between Saytzeff's rule and Hofmann's rule.",
    subject: "chemistry",
    concept: "Organic Chemistry",
    priority: "normal",
    status: "answered",
    submittedAt: new Date("2025-12-23T16:45:00"),
    respondedAt: new Date("2025-12-23T18:30:00"),
    expertName: "Prof. Meera Sharma",
    response: `The choice between Saytzeff and Hofmann depends on the base and leaving group:\n\n**Saytzeff's Rule (Zaitsev):**\n- Used with small, strong bases (OH⁻, OR⁻)\n- Major product: More substituted alkene (more stable)\n- Example: 2-bromobutane + KOH → 2-butene (major)\n\n**Hofmann's Rule:**\n- Used with bulky bases or poor leaving groups\n- Major product: Less substituted alkene\n- Example: Quaternary ammonium salts\n\nMemory Tip: "Small base = Saytzeff, Bulky base = Hofmann"`,
    rating: 4.9,
    followUps: []
  },
  {
    id: 3,
    question: "Can someone explain the difference between mitosis and meiosis? I keep getting confused about the number of divisions and chromosome count.",
    subject: "biology",
    concept: "Genetics",
    priority: "normal",
    status: "resolved",
    submittedAt: new Date("2025-12-22T09:15:00"),
    respondedAt: new Date("2025-12-22T11:00:00"),
    expertName: "Dr. Priya Nair",
    response: `Here's a clear comparison:\n\n**Mitosis:**\n- One division\n- Produces 2 daughter cells\n- Diploid → Diploid (2n → 2n)\n- Identical to parent cell\n- Purpose: Growth and repair\n\n**Meiosis:**\n- Two divisions (Meiosis I and II)\n- Produces 4 daughter cells\n- Diploid → Haploid (2n → n)\n- Genetically different (crossing over)\n- Purpose: Gamete formation\n\nKey Difference: Mitosis maintains chromosome number, meiosis halves it for sexual reproduction.`,
    rating: 5.0,
    followUps: [
    {
      author: "You",
      message: "Perfect explanation! This makes so much sense now.",
      timestamp: new Date("2025-12-22T11:30:00")
    }]

  },
  {
    id: 4,
    question: "I'm stuck on integration by parts. When should I use it versus substitution method? Also, how do I choose u and dv in the ILATE rule?",
    subject: "mathematics",
    concept: "Calculus",
    priority: "urgent",
    status: "pending",
    submittedAt: new Date("2025-12-26T08:30:00"),
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_153ce28aa-1764673437478.png",
    imageAlt: "Mathematics notebook showing calculus integration formulas and worked examples with blue pen on white paper"
  },
  {
    id: 5,
    question: "What is the mechanism of SN1 and SN2 reactions? How do I predict which mechanism will occur based on substrate structure?",
    subject: "chemistry",
    concept: "Organic Chemistry",
    priority: "normal",
    status: "pending",
    submittedAt: new Date("2025-12-25T14:20:00")
  },
  {
    id: 6,
    question: "In thermodynamics, why is entropy always increasing in the universe? Can you explain with real-world examples?",
    subject: "physics",
    concept: "Thermodynamics",
    priority: "normal",
    status: "answered",
    submittedAt: new Date("2025-12-21T11:00:00"),
    respondedAt: new Date("2025-12-21T13:45:00"),
    expertName: "Dr. Amit Verma",
    response: `The Second Law of Thermodynamics states that entropy (disorder) of an isolated system always increases.\n\n**Real-world Examples:**\n\n1. **Ice Melting:** Ordered ice crystals → Disordered liquid water (entropy increases)\n\n2. **Perfume Diffusion:** Concentrated perfume → Spreads throughout room (molecules become more randomly distributed)\n\n3. **Hot Coffee Cooling:** Heat flows from hot coffee to cooler surroundings until equilibrium (energy becomes more evenly distributed)\n\n**Why it happens:**\nThere are vastly more ways for energy and matter to be disordered than ordered. Nature favors the most probable state, which is higher entropy.\n\n**Important:** Entropy can decrease locally (like freezing water), but the total entropy of the system + surroundings always increases.`,
    rating: 4.7,
    followUps: []
  }];


  useEffect(() => {
    setDoubts(mockDoubts);
    setFilteredDoubts(mockDoubts);
  }, []);

  useEffect(() => {
    let result = [...doubts];

    if (filters?.search) {
      result = result?.filter((doubt) =>
      doubt?.question?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      doubt?.concept?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.subject) {
      result = result?.filter((doubt) => doubt?.subject === filters?.subject);
    }

    if (filters?.status) {
      result = result?.filter((doubt) => doubt?.status === filters?.status);
    }

    switch (filters?.sort) {
      case 'newest':
        result?.sort((a, b) => b?.submittedAt - a?.submittedAt);
        break;
      case 'oldest':
        result?.sort((a, b) => a?.submittedAt - b?.submittedAt);
        break;
      case 'priority':
        result?.sort((a, b) => {
          if (a?.priority === 'urgent' && b?.priority !== 'urgent') return -1;
          if (a?.priority !== 'urgent' && b?.priority === 'urgent') return 1;
          return b?.submittedAt - a?.submittedAt;
        });
        break;
      default:
        break;
    }

    setFilteredDoubts(result);
  }, [filters, doubts]);

  const handleSubmitDoubt = (formData) => {
    const newDoubt = {
      id: doubts?.length + 1,
      question: formData?.question,
      subject: formData?.subject,
      concept: formData?.concept,
      priority: formData?.priority,
      status: 'pending',
      submittedAt: new Date(),
      image: formData?.image ? URL.createObjectURL(formData?.image) : null,
      imageAlt: formData?.image ? "Student submitted doubt image showing question or diagram for expert clarification" : null
    };

    setDoubts((prev) => [newDoubt, ...prev]);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      subject: '',
      status: '',
      sort: 'newest'
    });
  };

  const calculateStats = () => {
    return {
      total: doubts?.length,
      pending: doubts?.filter((d) => d?.status === 'pending')?.length,
      answered: doubts?.filter((d) => d?.status === 'answered')?.length,
      resolved: doubts?.filter((d) => d?.status === 'resolved')?.length
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar isCollapsed={sidebarCollapsed} />
      <div className="ml-0 lg:ml-60 transition-smooth">
        <div className="p-4 md:p-6 lg:p-8">
          <BreadcrumbTrail />

          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="MessageCircleQuestion" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Doubt Solver
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  Get expert clarification on challenging concepts and questions
                </p>
              </div>
            </div>
          </div>

          {showSuccessMessage &&
          <div className="mb-6 bg-success/10 border border-success/20 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
              <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
              <div className="flex-1">
                <p className="text-sm font-caption font-medium text-success">
                  Doubt submitted successfully!
                </p>
                <p className="text-xs text-success/80 mt-1">
                  Our experts will respond within 24 hours
                </p>
              </div>
              <button
              onClick={() => setShowSuccessMessage(false)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-success/20 transition-smooth">

                <Icon name="X" size={16} color="var(--color-success)" />
              </button>
            </div>
          }

          <div className="space-y-6 md:space-y-8">
            <DoubtStats stats={calculateStats()} />

            <DoubtSubmissionForm onSubmit={handleSubmitDoubt} />

            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                  Your Doubt History
                </h2>
                <span className="text-sm text-muted-foreground font-caption">
                  {filteredDoubts?.length} {filteredDoubts?.length === 1 ? 'doubt' : 'doubts'}
                </span>
              </div>

              <div className="space-y-4 md:space-y-6">
                <DoubtFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters} />


                <DoubtHistoryTable doubts={filteredDoubts} onViewDetails={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default DoubtSolver;