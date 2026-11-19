import { SkillType } from '../types/assessment';
import { AssessmentResult, PracticeRecommendation, SkillScore } from '../types/scoring';

// Tie-breaker order: Grammar first, then Vocabulary, then Reading
const SKILL_TIE_BREAKER_PRIORITY: Record<SkillType, number> = {
  grammar: 1,
  vocabulary: 2,
  reading: 3,
};

// Curated topic recommendations mapping
const TOPIC_RECOMMENDATIONS: Record<
  string,
  { title: string; actionableAdvice: string; examples: string[] }
> = {
  'Food & Everyday Beverages': {
    title: 'Everyday Food & Shopping Vocabulary',
    actionableAdvice: 'Revise foundational food and drink terms along with their definite articles (der Kaffee, das Brot, das Wasser, der Tee). Practice ordering at a café or bakery.',
    examples: ['„Ich möchte einen Kaffee bitte.“', '„Haben Sie frisches Brot?“', '„Was kostet das Mineralwasser?“'],
  },
  'Professions & Workplaces': {
    title: 'Occupations & Workplace Expressions',
    actionableAdvice: 'Learn male and female forms of common jobs (der Arzt / die Ärztin, der Lehrer / die Lehrerin) and prepositions with workplaces (im Büro, im Krankenhaus, an der Schule).',
    examples: ['„Was sind Sie von Beruf?“', '„Ich arbeite als Ingenieurin bei Siemens.“', '„Mein Kollege arbeitet im Supermarkt.“'],
  },
  'Family Relations': {
    title: 'Family Members & Possessive Pronouns',
    actionableAdvice: 'Review family tree vocabulary (die Eltern, die Großmutter, die Geschwister, der Sohn) and basic possessives (mein Vater, meine Mutter).',
    examples: ['„Das ist mein Bruder und das ist meine Schwester.“', '„Wie alt sind Ihre Kinder?“', '„Meine Großeltern wohnen in Köln.“'],
  },
  'Time Expressions & Daily Questions': {
    title: 'Clock Times & Everyday Courtesies',
    actionableAdvice: 'Master official and colloquial time expressions (halb drei = 14:30, Viertel vor vier = 15:45) as well as key question formulas.',
    examples: ['„Wie viel Uhr ist es, bitte?“ / „Wie spät ist es?“', '„Der Zug fährt um Viertel nach acht.“', '„Haben Sie heute Zeit?“'],
  },
  'Verb Conjugation (Regular & Essential Verbs)': {
    title: 'Verb Conjugation Drills (sein, haben, wohnen)',
    actionableAdvice: 'Practice present tense endings for regular verbs (-e, -st, -t, -en, -t, -en) and memorize irregular forms for „sein“ (bin, bist, ist, sind, seid, sind) and „haben“ (habe, hast, hat, haben, habt, haben).',
    examples: ['„Ich wohne in Berlin, aber meine Eltern wohnen in Wien.“', '„Du bist sehr freundlich.“', '„Wir haben heute Deutschunterricht.“'],
  },
  'Articles in the Nominative (der / die / das / ein)': {
    title: 'Grammatical Genders & Nominative Articles',
    actionableAdvice: 'Always memorize German nouns with their definite article (der/die/das). Practice identifying subject nouns in the nominative case with indefinite articles (ein/eine).',
    examples: ['„Der Tisch ist groß.“ (maskulin)', '„Die Lampe ist neu.“ (feminin)', '„Das Buch ist interessant.“ (neutral)'],
  },
  'Accusative Case (Direct Objects)': {
    title: 'Accusative Direct Objects (den / einen)',
    actionableAdvice: 'Review verbs that take accusative objects (haben, suchen, kaufen, essen, trinken, brauchen). Note that only masculine changes: der -> den, ein -> einen.',
    examples: ['„Ich habe einen Bruder und eine Schwester.“', '„Er sucht den Autoschlüssel.“', '„Wir möchten einen Tisch reservieren.“'],
  },
  'Modal Verbs & Word Order': {
    title: 'Modal Verbs & Sentence Bracket (Satzklammer)',
    actionableAdvice: 'Practice modal verb structures (können, müssen, möchten, wollen). The conjugated modal sits in Position 2, while the base infinitive verb is pushed to the very end of the sentence.',
    examples: ['„Ich kann morgen leider nicht kommen.“', '„Möchten Sie einen Kaffee trinken?“', '„Wir müssen heute noch einkaufen.“'],
  },
  'Short Invitations & Personal Notes': {
    title: 'Extracting Key Details from Personal Invitations',
    actionableAdvice: 'Practice scanning short notes for 4 critical questions: Wer? (Who), Wann? (When), Wo? (Where), and Was mitbringen? (What to bring).',
    examples: ['Look for time markers: „ab 19:00 Uhr“, „am Samstag“', 'Look for addresses: „in meinem Garten, Goethestraße 12“', 'Look for requests: „Bitte bringt etwas mit!“'],
  },
  'Public Notices & Opening Hours': {
    title: 'Reading Operating Hours & Service Notices',
    actionableAdvice: 'Focus on days of the week, abbreviations (Mo–Fr), morning/afternoon split hours, and terms like „geschlossen“ (closed) or „geöffnet“ (open).',
    examples: ['„Montag bis Freitag: 08:00 – 13:00 Uhr“', '„Samstag und Sonntag: Geschlossen“', '„Außerhalb der Sprechzeiten: Notdienst“'],
  },
  'Public Transportation Announcements': {
    title: 'Station & Train Announcements (Gleise & Verspätung)',
    actionableAdvice: 'Familiarize yourself with train station notices: Gleis (platform), Verspätung (delay), fällt aus (cancelled), and ausnahmsweise (exceptionally).',
    examples: ['„fährt heute von Gleis 7 statt Gleis 4“', '„Zug hat ca. 15 Minuten Verspätung“', '„Bitte auf Lautsprecherdurchsagen achten“'],
  },
  'Everyday SMS & Meeting Arrangements': {
    title: 'Informal Messages & Rescheduling',
    actionableAdvice: 'Read informal SMS/WhatsApp-style texts focusing on cancellations, delays, and counter-proposals („stattdessen“, „früher“, „später“).',
    examples: ['„Mein Bus hat Verspätung.“', '„Treffen wir uns stattdessen um 18:00 Uhr?“', '„Ich schaffe es nicht pünktlich.“'],
  },
};

// Skill-level fallback recommendations when specific topic recommendations are exhausted
const SKILL_FALLBACK_RECOMMENDATIONS: Record<SkillType, { title: string; advice: string; examples: string[] }> = {
  grammar: {
    title: 'Consolidate Essential A1 Grammar Patterns',
    advice: 'Review foundational sentence structures: verb in position 2, question formation (W-Fragen and Ja/Nein-Fragen), and personal pronouns.',
    examples: ['„Wo wohnen Sie?“ (W-Frage)', '„Lernen Sie Deutsch?“ (Ja/Nein-Frage)', '„Ich lerne seit drei Monaten Deutsch.“'],
  },
  vocabulary: {
    title: 'Expand Everyday High-Frequency A1 Vocabulary',
    advice: 'Build flashcard decks for essential Goethe A1 word lists: numbers 1-100, days, months, directions, housing, and clothing.',
    examples: ['Themenbereich: Wohnen (die Wohnung, das Zimmer, die Küche)', 'Themenbereich: Einkaufen (kaufen, bezahlen, der Preis)'],
  },
  reading: {
    title: 'Practice Reading Authentic A1 Notices & Short Texts',
    advice: 'Read genuine German short texts: shop signs, grocery receipts, email confirmations, and flyer notices to build scanning speed.',
    examples: ['Practice skimming for specific numbers, dates, and names.', 'Do not translate word-for-word; identify the main message first.'],
  },
};

/**
 * Generates up to 3 prioritized, deterministic recommendations based on assessment results.
 */
export function generateRecommendations(result: AssessmentResult): PracticeRecommendation[] {
  const recommendations: PracticeRecommendation[] = [];
  const addedTopics = new Set<string>();

  // Sort skills by score ascending; tie-break using SKILL_TIE_BREAKER_PRIORITY
  const sortedSkills: SkillScore[] = Object.values(result.skillScores).sort((a, b) => {
    if (a.scorePercent !== b.scorePercent) {
      return a.scorePercent - b.scorePercent;
    }
    return SKILL_TIE_BREAKER_PRIORITY[a.skill] - SKILL_TIE_BREAKER_PRIORITY[b.skill];
  });

  // Step 1: For each sorted skill, inspect incorrect questions and map to topic recommendations
  for (const skillScore of sortedSkills) {
    if (recommendations.length >= 3) break;

    const missedQuestionsInSkill = result.questionResults.filter(
      (q) => q.skill === skillScore.skill && !q.isCorrect
    );

    for (const missed of missedQuestionsInSkill) {
      if (recommendations.length >= 3) break;
      if (addedTopics.has(missed.topic)) continue;

      const topicConfig = TOPIC_RECOMMENDATIONS[missed.topic];
      if (topicConfig) {
        addedTopics.add(missed.topic);
        recommendations.push({
          id: `rec-${missed.skill}-${recommendations.length + 1}`,
          skill: missed.skill,
          priority: recommendations.length + 1,
          topic: missed.topic,
          title: topicConfig.title,
          actionableAdvice: topicConfig.actionableAdvice,
          examples: topicConfig.examples,
        });
      }
    }

    // If skill is weak (< 60%) but no specific topic was added yet, add skill fallback
    if (skillScore.needsCriticalFocus && recommendations.length < 3 && !recommendations.some((r) => r.skill === skillScore.skill)) {
      const fallback = SKILL_FALLBACK_RECOMMENDATIONS[skillScore.skill];
      recommendations.push({
        id: `rec-${skillScore.skill}-fallback`,
        skill: skillScore.skill,
        priority: recommendations.length + 1,
        topic: `${skillScore.skillLabel} Foundations`,
        title: fallback.title,
        actionableAdvice: fallback.advice,
        examples: fallback.examples,
      });
    }
  }

  // Step 2: If the learner had very few errors or scored 100% across all questions
  if (recommendations.length < 2) {
    if (result.overallScore >= 80) {
      // Strong learner suggestions
      recommendations.push({
        id: 'rec-exam-prep-1',
        skill: 'reading',
        priority: recommendations.length + 1,
        topic: 'Full Goethe / ÖSD Mock Exam Practice',
        title: 'Complete a Full-Length Timed Model Examination',
        actionableAdvice: 'Your foundational score is strong. Now download official sample papers from Goethe-Institut or ÖSD and practice all four modules (Hören, Lesen, Schreiben, Sprechen) under strict examination time limits.',
        examples: ['Goethe-Zertifikat A1: Start Deutsch 1 Übungssatz', 'ÖSD Zertifikat A1 Modellsatz'],
      });

      if (recommendations.length < 3) {
        recommendations.push({
          id: 'rec-exam-prep-2',
          skill: 'grammar',
          priority: recommendations.length + 1,
          topic: 'Untested Exam Modules: Listening & Speaking',
          title: 'Dedicate Focus to Listening Comprehension & Speaking',
          actionableAdvice: 'This diagnostic only tested reading, vocabulary, and grammar. The official A1 exam allocates 25% of points each to Hören (listening) and Sprechen (speaking). Practice short audio dialogues and introducing yourself verbally.',
          examples: ['Practice speaking: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobbys.', 'Practice spelling your name and reciting phone numbers in German.'],
        });
      }
    } else {
      // Add general fallback from lowest skill
      const lowestSkill = sortedSkills[0];
      const fallback = SKILL_FALLBACK_RECOMMENDATIONS[lowestSkill.skill];
      recommendations.push({
        id: `rec-${lowestSkill.skill}-reinforce`,
        skill: lowestSkill.skill,
        priority: recommendations.length + 1,
        topic: `${lowestSkill.skillLabel} Reinforcement`,
        title: fallback.title,
        actionableAdvice: fallback.advice,
        examples: fallback.examples,
      });
    }
  }

  return recommendations.slice(0, 3);
}

/**
 * Decorates assessment result with generated recommendations.
 */
export function attachRecommendations(result: AssessmentResult): AssessmentResult {
  return {
    ...result,
    recommendations: generateRecommendations(result),
  };
}
