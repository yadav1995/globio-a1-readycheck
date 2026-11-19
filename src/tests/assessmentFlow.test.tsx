import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { QUESTION_BANK } from '../data/questionBank';

describe('Assessment Flow Integration Tests', () => {
  it('renders landing page with headline, diagnostic limitations, and start button', () => {
    render(<App />);

    expect(screen.getByText(/Know where you stand before you book your/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Assessment/i })).toBeInTheDocument();
    expect(screen.getByText(/Diagnostic Purpose & Scope Limitations/i)).toBeInTheDocument();
  });

  it('starts assessment and preserves answers across previous and next navigation', () => {
    render(<App />);

    // Start assessment
    const startBtn = screen.getByRole('button', { name: /Start Assessment/i });
    fireEvent.click(startBtn);

    // Verify first question rendered
    expect(screen.getAllByText(/Question 1 of 12/i).length).toBeGreaterThanOrEqual(1);
    const firstQ = QUESTION_BANK[0];
    expect(screen.getByText(firstQ.questionText)).toBeInTheDocument();

    // Select option B for question 1
    const optionB = screen.getByText(firstQ.options[1].text);
    fireEvent.click(optionB);

    // Verify radio is checked
    const radioBtn = screen.getByRole('radio', { name: new RegExp(firstQ.options[1].text, 'i') });
    expect(radioBtn).toHaveAttribute('aria-checked', 'true');

    // Click Next
    const nextBtn = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextBtn);

    // Now on Question 2
    expect(screen.getAllByText(/Question 2 of 12/i).length).toBeGreaterThanOrEqual(1);

    // Select option A for question 2
    const secondQ = QUESTION_BANK[1];
    const secondOptionA = screen.getByText(secondQ.options[0].text);
    fireEvent.click(secondOptionA);

    // Click Previous to return to Question 1
    const prevBtn = screen.getByRole('button', { name: /Previous/i });
    fireEvent.click(prevBtn);

    // Verify we are back on Question 1 and option B is still selected!
    expect(screen.getAllByText(/Question 1 of 12/i).length).toBeGreaterThanOrEqual(1);
    const radioBtnAgain = screen.getByRole('radio', { name: new RegExp(firstQ.options[1].text, 'i') });
    expect(radioBtnAgain).toHaveAttribute('aria-checked', 'true');
  });

  it('prevents submission on Review screen when answers are incomplete', () => {
    render(<App />);

    // Start assessment
    fireEvent.click(screen.getByRole('button', { name: /Start Assessment/i }));

    // Only answer Question 1
    const firstQ = QUESTION_BANK[0];
    fireEvent.click(screen.getByText(firstQ.options[0].text));

    // Open Review
    const reviewBtn = screen.getByRole('button', { name: /Review All/i });
    fireEvent.click(reviewBtn);

    // Review screen should show 1 of 12 answered
    expect(screen.getByText(/1 of 12 questions completed/i)).toBeInTheDocument();

    // Submit button should be disabled
    const submitBtn = screen.getByRole('button', { name: /Submit Assessment/i });
    expect(submitBtn).toBeDisabled();
  });

  it('allows complete 12-question submission and resets cleanly on Retake', () => {
    render(<App />);

    // Start assessment
    fireEvent.click(screen.getByRole('button', { name: /Start Assessment/i }));

    // Answer all 12 questions
    for (let i = 0; i < QUESTION_BANK.length; i++) {
      const q = QUESTION_BANK[i];
      // Pick the correct option
      const opt = q.options.find((o) => o.id === q.correctOptionId)!;
      fireEvent.click(screen.getByText(opt.text));

      if (i < QUESTION_BANK.length - 1) {
        fireEvent.click(screen.getByRole('button', { name: /Next/i }));
      }
    }

    // Go to Review
    fireEvent.click(screen.getByRole('button', { name: /Go to Review/i }));

    // Submit button should now be enabled
    const submitBtn = screen.getByRole('button', { name: /Submit Assessment/i });
    expect(submitBtn).not.toBeDisabled();

    // Click submit to open confirmation modal
    fireEvent.click(submitBtn);

    // Confirm submission
    const confirmBtn = screen.getByRole('button', { name: /Confirm & Submit/i });
    fireEvent.click(confirmBtn);

    // Results screen should be visible
    expect(screen.getByText(/Diagnostic Assessment Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Overall Score/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance by Skill Area/i)).toBeInTheDocument();
    expect(screen.getByText(/Question-by-Question Review/i)).toBeInTheDocument();

    // Click Retake Diagnostic Assessment
    const retakeBtn = screen.getByRole('button', { name: /Retake Diagnostic Assessment/i });
    fireEvent.click(retakeBtn);

    // Should return to Landing Page
    expect(screen.getByText(/Know where you stand before you book your/i)).toBeInTheDocument();
  });
});
