import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SubjectFilter from './components/SubjectFilter';
import MasteryLegend from './components/MasteryLegend';
import SummaryStatistics from './components/SummaryStatistics';
import ChapterRow from './components/ChapterRow';
import MobileChapterAccordion from './components/MobileChapterAccordion';
import Icon from '../../components/AppIcon';

const ConceptMasteryHeatmap = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSubject, setActiveSubject] = useState('physics');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const subjects = [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'mathematics', name: 'Mathematics' }
  ];

  const mockData = {
    physics: {
      chapters: [
        {
          id: 'ph1',
          name: 'Mechanics - Laws of Motion',
          concepts: [
            { id: 'ph1c1', name: "Newton\'s First Law", masteryPercentage: 85, questionsAttempted: 45, accuracy: 88, timeSpent: '2h 15m' },
            { id: 'ph1c2', name: "Newton\'s Second Law", masteryPercentage: 72, questionsAttempted: 38, accuracy: 76, timeSpent: '1h 50m' },
            { id: 'ph1c3', name: "Newton\'s Third Law", masteryPercentage: 28, questionsAttempted: 22, accuracy: 45, timeSpent: '1h 10m' },
            { id: 'ph1c4', name: 'Free Body Diagrams', masteryPercentage: 65, questionsAttempted: 30, accuracy: 70, timeSpent: '1h 30m' },
            { id: 'ph1c5', name: 'Friction', masteryPercentage: 18, questionsAttempted: 15, accuracy: 33, timeSpent: '45m' },
            { id: 'ph1c6', name: 'Circular Motion', masteryPercentage: 92, questionsAttempted: 50, accuracy: 94, timeSpent: '2h 40m' },
            { id: 'ph1c7', name: 'Work-Energy Theorem', masteryPercentage: 55, questionsAttempted: 28, accuracy: 64, timeSpent: '1h 20m' },
            { id: 'ph1c8', name: 'Conservation of Momentum', masteryPercentage: 78, questionsAttempted: 42, accuracy: 81, timeSpent: '2h 5m' }
          ]
        },
        {
          id: 'ph2',
          name: 'Electrostatics',
          concepts: [
            { id: 'ph2c1', name: "Coulomb\'s Law", masteryPercentage: 88, questionsAttempted: 48, accuracy: 90, timeSpent: '2h 20m' },
            { id: 'ph2c2', name: 'Electric Field', masteryPercentage: 25, questionsAttempted: 18, accuracy: 39, timeSpent: '55m' },
            { id: 'ph2c3', name: 'Electric Potential', masteryPercentage: 70, questionsAttempted: 35, accuracy: 74, timeSpent: '1h 45m' },
            { id: 'ph2c4', name: 'Capacitance', masteryPercentage: 15, questionsAttempted: 12, accuracy: 25, timeSpent: '40m' },
            { id: 'ph2c5', name: "Gauss\'s Law", masteryPercentage: 82, questionsAttempted: 44, accuracy: 85, timeSpent: '2h 10m' },
            { id: 'ph2c6', name: 'Dielectrics', masteryPercentage: 58, questionsAttempted: 26, accuracy: 65, timeSpent: '1h 15m' },
            { id: 'ph2c7', name: 'Energy Stored in Capacitor', masteryPercentage: 30, questionsAttempted: 20, accuracy: 50, timeSpent: '1h' },
            { id: 'ph2c8', name: 'Combination of Capacitors', masteryPercentage: 75, questionsAttempted: 40, accuracy: 78, timeSpent: '1h 55m' }
          ]
        },
        {
          id: 'ph3',
          name: 'Thermodynamics',
          concepts: [
            { id: 'ph3c1', name: 'Zeroth Law', masteryPercentage: 95, questionsAttempted: 52, accuracy: 96, timeSpent: '2h 30m' },
            { id: 'ph3c2', name: 'First Law', masteryPercentage: 68, questionsAttempted: 32, accuracy: 72, timeSpent: '1h 40m' },
            { id: 'ph3c3', name: 'Second Law', masteryPercentage: 22, questionsAttempted: 16, accuracy: 38, timeSpent: '50m' },
            { id: 'ph3c4', name: 'Carnot Engine', masteryPercentage: 80, questionsAttempted: 43, accuracy: 83, timeSpent: '2h 8m' },
            { id: 'ph3c5', name: 'Entropy', masteryPercentage: 12, questionsAttempted: 10, accuracy: 20, timeSpent: '35m' },
            { id: 'ph3c6', name: 'Heat Transfer', masteryPercentage: 85, questionsAttempted: 46, accuracy: 87, timeSpent: '2h 18m' },
            { id: 'ph3c7', name: 'Specific Heat', masteryPercentage: 62, questionsAttempted: 29, accuracy: 69, timeSpent: '1h 25m' },
            { id: 'ph3c8', name: 'Phase Transitions', masteryPercentage: 45, questionsAttempted: 24, accuracy: 58, timeSpent: '1h 12m' }
          ]
        },
        {
          id: 'ph4',
          name: 'Optics',
          concepts: [
            { id: 'ph4c1', name: 'Reflection', masteryPercentage: 90, questionsAttempted: 49, accuracy: 92, timeSpent: '2h 25m' },
            { id: 'ph4c2', name: 'Refraction', masteryPercentage: 28, questionsAttempted: 19, accuracy: 42, timeSpent: '58m' },
            { id: 'ph4c3', name: 'Total Internal Reflection', masteryPercentage: 75, questionsAttempted: 38, accuracy: 79, timeSpent: '1h 52m' },
            { id: 'ph4c4', name: 'Lens Formula', masteryPercentage: 20, questionsAttempted: 14, accuracy: 36, timeSpent: '48m' },
            { id: 'ph4c5', name: 'Interference', masteryPercentage: 88, questionsAttempted: 47, accuracy: 89, timeSpent: '2h 22m' },
            { id: 'ph4c6', name: 'Diffraction', masteryPercentage: 52, questionsAttempted: 27, accuracy: 63, timeSpent: '1h 18m' },
            { id: 'ph4c7', name: 'Polarization', masteryPercentage: 32, questionsAttempted: 21, accuracy: 48, timeSpent: '1h 5m' },
            { id: 'ph4c8', name: 'Optical Instruments', masteryPercentage: 78, questionsAttempted: 41, accuracy: 80, timeSpent: '2h 2m' }
          ]
        }
      ],
      statistics: {
        overallMastery: 58,
        strongConcepts: 14,
        moderateConcepts: 10,
        weakConcepts: 8
      }
    },
    chemistry: {
      chapters: [
        {
          id: 'ch1',
          name: 'Atomic Structure',
          concepts: [
            { id: 'ch1c1', name: 'Bohr Model', masteryPercentage: 82, questionsAttempted: 44, accuracy: 85, timeSpent: '2h 12m' },
            { id: 'ch1c2', name: 'Quantum Numbers', masteryPercentage: 25, questionsAttempted: 17, accuracy: 41, timeSpent: '52m' },
            { id: 'ch1c3', name: 'Electronic Configuration', masteryPercentage: 90, questionsAttempted: 50, accuracy: 92, timeSpent: '2h 28m' },
            { id: 'ch1c4', name: 'Aufbau Principle', masteryPercentage: 68, questionsAttempted: 33, accuracy: 73, timeSpent: '1h 42m' },
            { id: 'ch1c5', name: "Hund\'s Rule", masteryPercentage: 18, questionsAttempted: 13, accuracy: 31, timeSpent: '42m' },
            { id: 'ch1c6', name: "Pauli\'s Exclusion", masteryPercentage: 75, questionsAttempted: 39, accuracy: 77, timeSpent: '1h 58m' },
            { id: 'ch1c7', name: 'Orbital Shapes', masteryPercentage: 55, questionsAttempted: 28, accuracy: 64, timeSpent: '1h 22m' },
            { id: 'ch1c8', name: 'Ionization Energy', masteryPercentage: 88, questionsAttempted: 46, accuracy: 90, timeSpent: '2h 20m' }
          ]
        },
        {
          id: 'ch2',
          name: 'Chemical Bonding',
          concepts: [
            { id: 'ch2c1', name: 'Ionic Bonding', masteryPercentage: 92, questionsAttempted: 51, accuracy: 94, timeSpent: '2h 32m' },
            { id: 'ch2c2', name: 'Covalent Bonding', masteryPercentage: 30, questionsAttempted: 20, accuracy: 45, timeSpent: '1h 2m' },
            { id: 'ch2c3', name: 'Metallic Bonding', masteryPercentage: 78, questionsAttempted: 41, accuracy: 81, timeSpent: '2h 5m' },
            { id: 'ch2c4', name: 'VSEPR Theory', masteryPercentage: 22, questionsAttempted: 15, accuracy: 37, timeSpent: '48m' },
            { id: 'ch2c5', name: 'Hybridization', masteryPercentage: 85, questionsAttempted: 45, accuracy: 87, timeSpent: '2h 15m' },
            { id: 'ch2c6', name: 'Molecular Orbital Theory', masteryPercentage: 15, questionsAttempted: 11, accuracy: 27, timeSpent: '38m' },
            { id: 'ch2c7', name: 'Hydrogen Bonding', masteryPercentage: 70, questionsAttempted: 35, accuracy: 74, timeSpent: '1h 48m' },
            { id: 'ch2c8', name: 'Van der Waals Forces', masteryPercentage: 62, questionsAttempted: 30, accuracy: 68, timeSpent: '1h 32m' }
          ]
        },
        {
          id: 'ch3',
          name: 'Thermochemistry',
          concepts: [
            { id: 'ch3c1', name: 'Enthalpy', masteryPercentage: 88, questionsAttempted: 47, accuracy: 89, timeSpent: '2h 22m' },
            { id: 'ch3c2', name: 'Entropy', masteryPercentage: 28, questionsAttempted: 18, accuracy: 44, timeSpent: '55m' },
            { id: 'ch3c3', name: 'Gibbs Free Energy', masteryPercentage: 20, questionsAttempted: 14, accuracy: 36, timeSpent: '45m' },
            { id: 'ch3c4', name: "Hess\'s Law", masteryPercentage: 75, questionsAttempted: 38, accuracy: 78, timeSpent: '1h 55m' },
            { id: 'ch3c5', name: 'Calorimetry', masteryPercentage: 82, questionsAttempted: 43, accuracy: 84, timeSpent: '2h 10m' },
            { id: 'ch3c6', name: 'Bond Energy', masteryPercentage: 58, questionsAttempted: 29, accuracy: 66, timeSpent: '1h 28m' },
            { id: 'ch3c7', name: 'Heat of Formation', masteryPercentage: 32, questionsAttempted: 21, accuracy: 49, timeSpent: '1h 8m' },
            { id: 'ch3c8', name: 'Spontaneity', masteryPercentage: 68, questionsAttempted: 34, accuracy: 72, timeSpent: '1h 45m' }
          ]
        }
      ],
      statistics: {
        overallMastery: 55,
        strongConcepts: 11,
        moderateConcepts: 8,
        weakConcepts: 5
      }
    },
    biology: {
      chapters: [
        {
          id: 'bi1',
          name: 'Cell Biology',
          concepts: [
            { id: 'bi1c1', name: 'Cell Structure', masteryPercentage: 95, questionsAttempted: 52, accuracy: 96, timeSpent: '2h 35m' },
            { id: 'bi1c2', name: 'Cell Membrane', masteryPercentage: 72, questionsAttempted: 36, accuracy: 75, timeSpent: '1h 50m' },
            { id: 'bi1c3', name: 'Cell Division', masteryPercentage: 25, questionsAttempted: 17, accuracy: 41, timeSpent: '52m' },
            { id: 'bi1c4', name: 'Mitosis', masteryPercentage: 88, questionsAttempted: 46, accuracy: 90, timeSpent: '2h 20m' },
            { id: 'bi1c5', name: 'Meiosis', masteryPercentage: 18, questionsAttempted: 13, accuracy: 31, timeSpent: '42m' },
            { id: 'bi1c6', name: 'Cell Cycle', masteryPercentage: 80, questionsAttempted: 42, accuracy: 83, timeSpent: '2h 8m' },
            { id: 'bi1c7', name: 'Organelles', masteryPercentage: 65, questionsAttempted: 32, accuracy: 70, timeSpent: '1h 38m' },
            { id: 'bi1c8', name: 'Transport Mechanisms', masteryPercentage: 30, questionsAttempted: 19, accuracy: 47, timeSpent: '58m' }
          ]
        },
        {
          id: 'bi2',
          name: 'Genetics',
          concepts: [
            { id: 'bi2c1', name: "Mendel\'s Laws", masteryPercentage: 90, questionsAttempted: 49, accuracy: 92, timeSpent: '2h 28m' },
            { id: 'bi2c2', name: 'DNA Structure', masteryPercentage: 22, questionsAttempted: 15, accuracy: 37, timeSpent: '48m' },
            { id: 'bi2c3', name: 'DNA Replication', masteryPercentage: 78, questionsAttempted: 40, accuracy: 80, timeSpent: '2h 2m' },
            { id: 'bi2c4', name: 'Transcription', masteryPercentage: 15, questionsAttempted: 11, accuracy: 27, timeSpent: '38m' },
            { id: 'bi2c5', name: 'Translation', masteryPercentage: 85, questionsAttempted: 44, accuracy: 87, timeSpent: '2h 15m' },
            { id: 'bi2c6', name: 'Mutations', masteryPercentage: 58, questionsAttempted: 28, accuracy: 65, timeSpent: '1h 25m' },
            { id: 'bi2c7', name: 'Genetic Disorders', masteryPercentage: 32, questionsAttempted: 20, accuracy: 50, timeSpent: '1h 5m' },
            { id: 'bi2c8', name: 'Pedigree Analysis', masteryPercentage: 70, questionsAttempted: 35, accuracy: 73, timeSpent: '1h 48m' }
          ]
        },
        {
          id: 'bi3',
          name: 'Ecology',
          concepts: [
            { id: 'bi3c1', name: 'Ecosystems', masteryPercentage: 88, questionsAttempted: 47, accuracy: 89, timeSpent: '2h 22m' },
            { id: 'bi3c2', name: 'Food Chains', masteryPercentage: 92, questionsAttempted: 50, accuracy: 94, timeSpent: '2h 30m' },
            { id: 'bi3c3', name: 'Energy Flow', masteryPercentage: 28, questionsAttempted: 18, accuracy: 44, timeSpent: '55m' },
            { id: 'bi3c4', name: 'Nutrient Cycles', masteryPercentage: 75, questionsAttempted: 38, accuracy: 78, timeSpent: '1h 58m' },
            { id: 'bi3c5', name: 'Population Dynamics', masteryPercentage: 20, questionsAttempted: 14, accuracy: 36, timeSpent: '45m' },
            { id: 'bi3c6', name: 'Biodiversity', masteryPercentage: 82, questionsAttempted: 43, accuracy: 84, timeSpent: '2h 12m' },
            { id: 'bi3c7', name: 'Conservation', masteryPercentage: 62, questionsAttempted: 30, accuracy: 68, timeSpent: '1h 32m' },
            { id: 'bi3c8', name: 'Pollution', masteryPercentage: 68, questionsAttempted: 34, accuracy: 72, timeSpent: '1h 45m' }
          ]
        }
      ],
      statistics: {
        overallMastery: 60,
        strongConcepts: 13,
        moderateConcepts: 7,
        weakConcepts: 4
      }
    },
    mathematics: {
      chapters: [
        {
          id: 'ma1',
          name: 'Calculus - Differentiation',
          concepts: [
            { id: 'ma1c1', name: 'Limits', masteryPercentage: 90, questionsAttempted: 50, accuracy: 92, timeSpent: '2h 28m' },
            { id: 'ma1c2', name: 'Continuity', masteryPercentage: 75, questionsAttempted: 38, accuracy: 78, timeSpent: '1h 58m' },
            { id: 'ma1c3', name: 'Derivatives', masteryPercentage: 22, questionsAttempted: 15, accuracy: 37, timeSpent: '48m' },
            { id: 'ma1c4', name: 'Chain Rule', masteryPercentage: 85, questionsAttempted: 45, accuracy: 87, timeSpent: '2h 18m' },
            { id: 'ma1c5', name: 'Product Rule', masteryPercentage: 18, questionsAttempted: 12, accuracy: 33, timeSpent: '40m' },
            { id: 'ma1c6', name: 'Quotient Rule', masteryPercentage: 68, questionsAttempted: 33, accuracy: 72, timeSpent: '1h 42m' },
            { id: 'ma1c7', name: 'Implicit Differentiation', masteryPercentage: 28, questionsAttempted: 18, accuracy: 44, timeSpent: '55m' },
            { id: 'ma1c8', name: 'Higher Order Derivatives', masteryPercentage: 82, questionsAttempted: 43, accuracy: 84, timeSpent: '2h 12m' }
          ]
        },
        {
          id: 'ma2',
          name: 'Algebra',
          concepts: [
            { id: 'ma2c1', name: 'Quadratic Equations', masteryPercentage: 95, questionsAttempted: 52, accuracy: 96, timeSpent: '2h 35m' },
            { id: 'ma2c2', name: 'Complex Numbers', masteryPercentage: 30, questionsAttempted: 19, accuracy: 47, timeSpent: '58m' },
            { id: 'ma2c3', name: 'Sequences & Series', masteryPercentage: 88, questionsAttempted: 46, accuracy: 90, timeSpent: '2h 22m' },
            { id: 'ma2c4', name: 'Binomial Theorem', masteryPercentage: 15, questionsAttempted: 11, accuracy: 27, timeSpent: '38m' },
            { id: 'ma2c5', name: 'Permutations', masteryPercentage: 78, questionsAttempted: 40, accuracy: 80, timeSpent: '2h 5m' },
            { id: 'ma2c6', name: 'Combinations', masteryPercentage: 62, questionsAttempted: 30, accuracy: 68, timeSpent: '1h 32m' },
            { id: 'ma2c7', name: 'Probability', masteryPercentage: 25, questionsAttempted: 16, accuracy: 40, timeSpent: '50m' },
            { id: 'ma2c8', name: 'Matrices', masteryPercentage: 72, questionsAttempted: 36, accuracy: 75, timeSpent: '1h 52m' }
          ]
        },
        {
          id: 'ma3',
          name: 'Coordinate Geometry',
          concepts: [
            { id: 'ma3c1', name: 'Straight Lines', masteryPercentage: 92, questionsAttempted: 50, accuracy: 94, timeSpent: '2h 30m' },
            { id: 'ma3c2', name: 'Circles', masteryPercentage: 20, questionsAttempted: 14, accuracy: 36, timeSpent: '45m' },
            { id: 'ma3c3', name: 'Parabola', masteryPercentage: 80, questionsAttempted: 42, accuracy: 82, timeSpent: '2h 10m' },
            { id: 'ma3c4', name: 'Ellipse', masteryPercentage: 28, questionsAttempted: 17, accuracy: 44, timeSpent: '52m' },
            { id: 'ma3c5', name: 'Hyperbola', masteryPercentage: 85, questionsAttempted: 44, accuracy: 87, timeSpent: '2h 18m' },
            { id: 'ma3c6', name: '3D Geometry', masteryPercentage: 58, questionsAttempted: 28, accuracy: 65, timeSpent: '1h 28m' },
            { id: 'ma3c7', name: 'Direction Cosines', masteryPercentage: 32, questionsAttempted: 20, accuracy: 50, timeSpent: '1h 5m' },
            { id: 'ma3c8', name: 'Planes', masteryPercentage: 70, questionsAttempted: 35, accuracy: 73, timeSpent: '1h 48m' }
          ]
        }
      ],
      statistics: {
        overallMastery: 57,
        strongConcepts: 12,
        moderateConcepts: 8,
        weakConcepts: 4
      }
    }
  };

  const currentData = mockData?.[activeSubject];

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar isCollapsed={isSidebarCollapsed} />
      <main className="ml-0 lg:ml-56 pb-16 lg:pb-0 transition-smooth">
        <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
          <div className="mb-6 md:mb-8">
            <BreadcrumbTrail />
            
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                  Concept Mastery Heatmap
                </h1>
                <p className="text-sm md:text-base text-muted-foreground font-caption">
                  Identify knowledge gaps and track learning progress across NCERT chapters
                </p>
              </div>
              
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:flex w-10 h-10 items-center justify-center bg-card border border-border rounded-md transition-smooth hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <Icon
                  name={isSidebarCollapsed ? 'PanelLeftOpen' : 'PanelLeftClose'}
                  size={20}
                  color="var(--color-foreground)"
                />
              </button>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6 md:mb-8">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm md:text-base text-foreground font-caption">
                    <span className="font-semibold">Pro Tip:</span> Click on any red cell (weak mastery) to automatically open Practice Lab with pre-filtered questions for that specific topic.
                  </p>
                </div>
              </div>
            </div>

            <SummaryStatistics statistics={currentData?.statistics} />
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                  Subject Analysis
                </h2>
                <SubjectFilter
                  subjects={subjects}
                  activeSubject={activeSubject}
                  onSubjectChange={setActiveSubject}
                />
              </div>

              {isMobile ? (
                <div className="space-y-3">
                  {currentData?.chapters?.map((chapter) => (
                    <MobileChapterAccordion key={chapter?.id} chapter={chapter} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 md:space-y-5">
                  {currentData?.chapters?.map((chapter) => (
                    <ChapterRow key={chapter?.id} chapter={chapter} />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-8 h-fit">
              <MasteryLegend />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                  How to Use This Heatmap
                </h3>
                <ul className="space-y-2 text-sm md:text-base text-muted-foreground font-caption">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 flex-shrink-0">•</span>
                    <span>Hover over any cell to view detailed performance metrics including questions attempted, accuracy rate, and time spent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 flex-shrink-0">•</span>
                    <span>Red cells indicate weak concepts (&lt;34%) that need immediate attention and focused practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 flex-shrink-0">•</span>
                    <span>Yellow cells show moderate understanding (34-66%) requiring additional practice for mastery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 flex-shrink-0">•</span>
                    <span>Green cells represent strong concepts (&gt;67%) where you have demonstrated good understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 flex-shrink-0">•</span>
                    <span>Click on red cells to instantly navigate to Practice Lab with pre-filtered questions for targeted improvement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConceptMasteryHeatmap;