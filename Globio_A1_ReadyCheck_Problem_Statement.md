# Globio A1 ReadyCheck — Problem Statement

**Product:** Globio A1 ReadyCheck  
**Document type:** Product problem statement  
**Version:** 1.0  
**Status:** MVP definition  
**Target users:** Learners preparing for the German A1 proficiency exam

---

## 1. Background

Learners preparing for a German A1 exam need to decide when they are sufficiently prepared to book and attempt the exam. Completing an A1 course, finishing a textbook, or feeling confident in class does not necessarily mean a learner can independently apply the language skills assessed in an exam.

In practice, learners may use informal quizzes, course completion, advice from classmates, or their own confidence to judge readiness. These signals can be incomplete or difficult to compare across skill areas. A learner may feel generally prepared while having a significant gap in grammar, vocabulary, or reading comprehension.

This creates an opportunity for a simple diagnostic experience that gives learners a clearer view of their current foundational skills and helps them decide what to practise next.

## 2. Problem statement

**German A1 learners who are preparing to book or take a proficiency exam often lack a quick, structured, and actionable way to understand how prepared they are across foundational language skills.**

Existing signals such as course completion, subjective confidence, or isolated practice questions may not reveal which skill areas are strong and which need more work. As a result, learners may:

- Book an exam before they have identified important knowledge gaps.
- Delay booking because they are unsure whether they are ready.
- Overestimate or underestimate their preparation based on an overall feeling rather than skill-level evidence.
- Receive a score from a practice quiz without understanding what to work on next.

The core problem is not simply that learners need another quiz. They need a concise diagnostic that turns their answers into an understandable skill breakdown and a small number of practical next steps.

## 3. Target user

### Primary persona

A learner who:

- Has completed, or is close to completing, a beginner German A1 course.
- Is considering booking or attempting an A1 proficiency exam.
- Has some familiarity with basic German vocabulary, grammar, and everyday written material.
- Is uncertain about their current level of preparation.
- Wants to identify knowledge gaps and decide what to practise before taking the exam.

### User need

> “I have studied German A1, but I am not sure whether I am ready for the exam. Help me understand which foundational areas I know well and what I should practise before I decide to book.”

## 4. User pain points

| Pain point | Why it matters |
|---|---|
| No clear view by skill | An overall sense of confidence can hide gaps in a specific area. |
| Uncertainty about exam readiness | Learners may struggle to decide whether to book now or continue preparing. |
| Generic quiz results | A raw score does not explain what the learner should do next. |
| Unfocused revision | Without identifying weak areas, learners may spend time practising topics they already understand. |
| Risk of overconfidence | Completing a course or doing well on a small quiz can be mistaken for proof of exam readiness. |

## 5. Product opportunity

Build **Globio A1 ReadyCheck**, a short, browser-based diagnostic assessment that helps learners understand their performance across three foundational areas:

1. **Vocabulary** — recognition and use of common A1 words and everyday expressions.
2. **Grammar** — understanding of basic sentence structures and foundational grammar rules.
3. **Reading** — comprehension of short, simple written content such as notices, messages, and everyday instructions.

The experience should do more than report a total score. It should show performance by skill, highlight the learner's weaker areas, and recommend a small set of focused practice priorities.

## 6. Product objective

Help German A1 learners make a more informed preparation decision by giving them:

- A quick diagnostic assessment.
- An overall indicative score.
- A separate score for vocabulary, grammar, and reading.
- Two or three prioritised areas to practise.
- A clear explanation of what the result means and what to do next.

The product should support a learner's preparation decision; it must **not** claim to certify proficiency or guarantee a pass in a Goethe, ÖSD, or other external examination.

## 7. MVP scope

### In scope

- A simple landing page explaining the purpose, format, and limitations of the assessment.
- A 12-question assessment with four questions per skill:
  - 4 vocabulary questions
  - 4 grammar questions
  - 4 reading questions
- Multiple-choice questions with four answer options.
- One question displayed at a time.
- Progress indication and previous/next navigation.
- Answer persistence while navigating between questions.
- A review step before submission.
- Automatic scoring after all questions are answered.
- Overall score and individual skill scores.
- Two or three prioritised practice recommendations.
- A result explanation and a clear next action.
- Ability to retake the assessment.
- Responsive layout for desktop and mobile.

### Out of scope for the first MVP

- Listening assessment.
- Speaking assessment.
- Writing assessment.
- Adaptive question difficulty.
- User accounts, login, or saved learner history.
- Teacher or administrator dashboards.
- Official exam registration or booking.
- Claims that the score predicts an official exam result.
- AI-generated questions or personalised tutoring.

These features may be considered for later versions after the core diagnostic experience has been tested with learners and instructors.

## 8. Key assumptions to validate

The MVP is based on assumptions that must be tested rather than treated as established facts:

1. Learners preparing for A1 experience uncertainty about their readiness.
2. A short diagnostic is useful enough that learners will complete it.
3. A breakdown by vocabulary, grammar, and reading is more actionable than a single total score.
4. Learners understand and value topic-level practice recommendations.
5. The assessment questions are appropriate in language level, coverage, and difficulty.
6. The proposed score bands are understandable and useful when clearly labelled as indicative.

## 9. Success measures

The first release should measure whether learners can complete the diagnostic and use its output.

| Metric | What it tells us |
|---|---|
| Assessment start rate | Whether the landing page communicates enough value to begin. |
| Assessment completion rate | Whether the assessment length and experience are manageable. |
| Question-level accuracy | Which questions may be too easy, too difficult, or unclear. |
| Skill-level score distribution | Whether the assessment differentiates performance across the three skills. |
| Recommendation engagement | Whether learners find the suggested practice priorities relevant. |
| Retake rate | Whether learners return after practising. |
| Score change on retake | Whether learners show improvement on a comparable assessment; interpret cautiously because repeated questions can create a practice effect. |
| Learner-reported usefulness | Whether the result helped learners decide what to practise or whether to seek further assessment. |

A later validation phase should compare ReadyCheck results with instructor-reviewed mock assessments and, where learners voluntarily provide the information, subsequent external exam outcomes. The MVP's small question set is not sufficient to establish predictive validity on its own.

## 10. Readiness score: intended interpretation

For the MVP, each skill contains four questions. Each correct answer earns one point.

**Skill score**

`Skill score = (Correct answers in that skill / 4) × 100`

**Overall score**

`Overall score = (Vocabulary score + Grammar score + Reading score) / 3`

The initial result bands are product hypotheses for communicating diagnostic feedback:

| Score | Suggested label | Meaning |
|---:|---|---|
| 80–100 | Strong foundation | The learner answered most questions correctly in this short diagnostic. |
| 65–79 | Getting close | The learner shows some foundational understanding, with areas to review. |
| 0–64 | More practice recommended | The learner may benefit from additional foundational practice. |

These bands are **not official A1 pass thresholds** and must not be presented as a prediction of passing an external exam. Since the assessment contains only 12 questions and covers only three skill areas, the result is a directional learning signal, not a comprehensive proficiency measurement.

The results page should display skill-level gaps alongside the overall score so that a high overall score does not conceal a weaker skill.

## 11. Product principles

1. **Be diagnostic, not authoritative.** Explain what the assessment measures and what it does not measure.
2. **Make results actionable.** Every identified weakness should connect to a practical practice recommendation.
3. **Show the detail behind the score.** Learners should be able to understand their skill-level performance.
4. **Keep the experience focused.** The first assessment should be short and easy to complete.
5. **Avoid false confidence.** Never describe an MVP score as an official readiness certification or pass guarantee.
6. **Design for learning.** The result should help the learner take a useful next step, not simply label their ability.

## 12. Key risks and mitigations

| Risk | Potential impact | Mitigation |
|---|---|---|
| Too few questions per skill | Scores may be unstable and overly sensitive to individual questions. | Label results as indicative; expand and validate the question bank in later versions. |
| Uneven question difficulty | A skill score may reflect question selection more than learner ability. | Have German instructors review level, clarity, topic coverage, and difficulty. |
| Missing exam components | Learners may mistake the result for complete A1 readiness. | Clearly disclose that listening, writing, and speaking are not assessed. |
| Arbitrary score bands | Learners may make booking decisions based on unvalidated thresholds. | Treat bands as hypotheses and validate them against mock assessments and learner outcomes. |
| Generic recommendations | Learners may not know what to practise. | Map incorrect answers to specific topics and recommend focused actions. |
| Repeated questions on retake | Score improvement may reflect memory rather than learning. | Introduce equivalent question variants and interpret retake changes cautiously. |

## 13. What we need to learn before V2

Speak with at least five learners who are preparing for, or have recently taken, a German A1 exam. Explore:

1. How do they currently decide whether they are ready to book an exam?
2. Which parts of A1 preparation feel most difficult, and why?
3. What practice tests or readiness checks have they already used, and what was missing?
4. What kind of feedback would help them turn a low score into a useful study plan?
5. What evidence would they need before trusting a readiness score when making a booking decision?

Where possible, also ask German instructors to review the question bank and recommendations. Learner interviews can validate usefulness and comprehension; instructor review can help assess content quality. Neither alone proves that the score predicts an official exam outcome.

## 14. MVP definition of done

The MVP is ready for a learner test when:

- A learner can start and complete all 12 questions.
- The learner can navigate backwards and forwards without losing selected answers.
- The learner cannot submit an incomplete assessment.
- The application calculates the overall score and all three skill scores correctly.
- The results page displays the learner's weaker skill areas and up to three practice priorities.
- The score explanation clearly states the assessment's limitations.
- The assessment works on common desktop and mobile screen sizes.
- Core scoring and recommendation logic has automated tests.
- The application can be accessed through a public deployment URL.

---

**Product positioning statement**

Globio A1 ReadyCheck is a short German A1 diagnostic that helps learners see how they are doing across vocabulary, grammar, and reading—and understand what to practise next before making an exam-preparation decision.
