import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import { AssessmentAction, AssessmentState, Question } from '../types/assessment';
import { AssessmentResult } from '../types/scoring';
import { QUESTION_BANK } from '../data/questionBank';
import { calculateAssessmentResult } from '../services/scoringEngine';
import { attachRecommendations } from '../services/recommendationEngine';

function generateSessionId(): string {
  return `readycheck-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

const initialState: AssessmentState = {
  status: 'NOT_STARTED',
  sessionId: generateSessionId(),
  currentQuestionIndex: 0,
  answers: {},
  startTime: null,
  completedTime: null,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'START_ASSESSMENT':
      return {
        status: 'IN_PROGRESS',
        sessionId: generateSessionId(),
        currentQuestionIndex: 0,
        answers: {},
        startTime: Date.now(),
        completedTime: null,
      };

    case 'SELECT_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.optionId,
        },
      };

    case 'NEXT_QUESTION':
      if (state.currentQuestionIndex < QUESTION_BANK.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      }
      return state;

    case 'PREV_QUESTION':
      if (state.currentQuestionIndex > 0) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex - 1,
        };
      }
      return state;

    case 'GO_TO_QUESTION':
      if (action.payload.index >= 0 && action.payload.index < QUESTION_BANK.length) {
        return {
          ...state,
          currentQuestionIndex: action.payload.index,
          status: 'IN_PROGRESS',
        };
      }
      return state;

    case 'OPEN_REVIEW':
      return {
        ...state,
        status: 'REVIEW',
      };

    case 'RETURN_TO_QUESTION':
      return {
        ...state,
        status: 'IN_PROGRESS',
        currentQuestionIndex: action.payload.index,
      };

    case 'SUBMIT_ASSESSMENT': {
      // Prevent submission if not all questions are answered or if already completed
      if (state.status === 'COMPLETED') return state;
      const answeredTotal = Object.keys(state.answers).length;
      if (answeredTotal < QUESTION_BANK.length) {
        return state;
      }
      return {
        ...state,
        status: 'COMPLETED',
        completedTime: Date.now(),
      };
    }

    case 'RETAKE_ASSESSMENT':
      return {
        status: 'NOT_STARTED',
        sessionId: generateSessionId(),
        currentQuestionIndex: 0,
        answers: {},
        startTime: null,
        completedTime: null,
      };

    default:
      return state;
  }
}

interface AssessmentContextValue {
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
  questions: Question[];
  currentQuestion: Question;
  isAllAnswered: boolean;
  answeredCount: number;
  totalQuestions: number;
  result: AssessmentResult | null;
}

const AssessmentContext = createContext<AssessmentContextValue | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  const questions = QUESTION_BANK;
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(state.answers).length;
  const isAllAnswered = answeredCount === totalQuestions;
  const currentQuestion = questions[state.currentQuestionIndex] || questions[0];

  const result: AssessmentResult | null = useMemo(() => {
    if (state.status !== 'COMPLETED') return null;
    const baseResult = calculateAssessmentResult(
      state.answers,
      questions,
      state.sessionId,
      state.startTime,
      state.completedTime
    );
    return attachRecommendations(baseResult);
  }, [state.status, state.answers, state.sessionId, state.startTime, state.completedTime, questions]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      questions,
      currentQuestion,
      isAllAnswered,
      answeredCount,
      totalQuestions,
      result,
    }),
    [state, questions, currentQuestion, isAllAnswered, answeredCount, totalQuestions, result]
  );

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment(): AssessmentContextValue {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
