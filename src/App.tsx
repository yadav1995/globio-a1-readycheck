import React from 'react';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { SkillGrid } from './components/landing/SkillGrid';
import { DisclaimerCard } from './components/landing/DisclaimerCard';
import { QuestionCard } from './components/assessment/QuestionCard';
import { NavigationBar } from './components/assessment/NavigationBar';
import { ReviewScreen } from './components/review/ReviewScreen';
import { ScoreOverview } from './components/results/ScoreOverview';
import { SkillBreakdown } from './components/results/SkillBreakdown';
import { RecommendationList } from './components/results/RecommendationList';
import { QuestionReview } from './components/results/QuestionReview';
import { NextStepsAdvice } from './components/results/NextStepsAdvice';
import { ProgressBar } from './components/common/ProgressBar';

const AssessmentFlow: React.FC = () => {
  const {
    state,
    dispatch,
    currentQuestion,
    answeredCount,
    totalQuestions,
    result,
  } = useAssessment();

  const handleSelectOption = (optionId: string) => {
    dispatch({
      type: 'SELECT_ANSWER',
      payload: { questionId: currentQuestion.id, optionId },
    });
  };

  const handlePrev = () => dispatch({ type: 'PREV_QUESTION' });
  const handleNext = () => dispatch({ type: 'NEXT_QUESTION' });
  const handleOpenReview = () => dispatch({ type: 'OPEN_REVIEW' });

  // 1. Landing View
  if (state.status === 'NOT_STARTED') {
    return (
      <main className="flex-1">
        <HeroSection />
        <SkillGrid />
        <DisclaimerCard />
      </main>
    );
  }

  // 2. Active Question View
  if (state.status === 'IN_PROGRESS') {
    const selectedOptionId = state.answers[currentQuestion.id];
    return (
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Top Assessment Progress Header */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex items-center justify-between text-xs text-stone-600 font-medium mb-2">
            <span>Progress: {answeredCount} of {totalQuestions} answered</span>
            <span>Question {state.currentQuestionIndex + 1} of {totalQuestions}</span>
          </div>
          <ProgressBar current={answeredCount} total={totalQuestions} color="forest" />
        </div>

        {/* Current Question */}
        <QuestionCard
          question={currentQuestion}
          currentIndex={state.currentQuestionIndex}
          totalQuestions={totalQuestions}
          selectedOptionId={selectedOptionId}
          onSelectOption={handleSelectOption}
        />

        {/* Navigation Bar */}
        <NavigationBar
          currentIndex={state.currentQuestionIndex}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          onPrev={handlePrev}
          onNext={handleNext}
          onOpenReview={handleOpenReview}
          hasCurrentAnswer={Boolean(selectedOptionId)}
        />
      </main>
    );
  }

  // 3. Review View
  if (state.status === 'REVIEW') {
    return (
      <main className="flex-1">
        <ReviewScreen />
      </main>
    );
  }

  // 4. Completed / Results View
  if (state.status === 'COMPLETED' && result) {
    return (
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <ScoreOverview result={result} />
        <SkillBreakdown result={result} />
        <RecommendationList recommendations={result.recommendations} />
        <QuestionReview questionResults={result.questionResults} />
        <NextStepsAdvice />
      </main>
    );
  }

  return null;
};

export function App() {
  return (
    <AssessmentProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 font-sans">
        <Header />
        <AssessmentFlow />
        <Footer />
      </div>
    </AssessmentProvider>
  );
}

export default App;
