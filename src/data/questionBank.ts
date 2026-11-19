import { Question } from '../types/assessment';

export const QUESTION_BANK: Question[] = [
  // --- VOCABULARY (4 questions) ---
  {
    id: 'vocab-1',
    skill: 'vocabulary',
    topic: 'Food & Everyday Beverages',
    difficulty: 'A1.1',
    questionType: 'multiple-choice',
    questionText: 'Was trinkt man typischerweise zum Frühstück?',
    options: [
      { id: 'v1-a', text: 'Der Stuhl' },
      { id: 'v1-b', text: 'Der Kaffee' },
      { id: 'v1-c', text: 'Das Buch' },
      { id: 'v1-d', text: 'Die Lampe' },
    ],
    correctOptionId: 'v1-b',
    explanation: '„Der Kaffee“ (coffee) is a common breakfast beverage. „Der Stuhl“ is a chair, „das Buch“ is a book, and „die Lampe“ is a lamp.',
  },
  {
    id: 'vocab-2',
    skill: 'vocabulary',
    topic: 'Professions & Workplaces',
    difficulty: 'A1.1',
    questionType: 'multiple-choice',
    questionText: 'Frau Weber arbeitet in einem Krankenhaus und untersucht kranke Menschen. Sie ist ...',
    options: [
      { id: 'v2-a', text: 'Ärztin' },
      { id: 'v2-b', text: 'Kellnerin' },
      { id: 'v2-c', text: 'Lehrerin' },
      { id: 'v2-d', text: 'Verkäuferin' },
    ],
    correctOptionId: 'v2-a',
    explanation: '„Ärztin“ (female doctor) works in a hospital („Krankenhaus“). „Kellnerin“ is a waitress, „Lehrerin“ is a teacher, and „Verkäuferin“ is a sales clerk.',
  },
  {
    id: 'vocab-3',
    skill: 'vocabulary',
    topic: 'Family Relations',
    difficulty: 'A1.1',
    questionType: 'multiple-choice',
    questionText: 'Die Mutter von meinem Vater ist meine ...',
    options: [
      { id: 'v3-a', text: 'Tante' },
      { id: 'v3-b', text: 'Schwester' },
      { id: 'v3-c', text: 'Großmutter' },
      { id: 'v3-d', text: 'Tochter' },
    ],
    correctOptionId: 'v3-c',
    explanation: 'The mother of one\'s father is the grandmother („Großmutter“ or „Oma“). „Tante“ is aunt, „Schwester“ is sister, and „Tochter“ is daughter.',
  },
  {
    id: 'vocab-4',
    skill: 'vocabulary',
    topic: 'Time Expressions & Daily Questions',
    difficulty: 'A1.2',
    questionType: 'multiple-choice',
    questionText: 'Wie fragt man höflich nach der Uhrzeit auf Deutsch?',
    options: [
      { id: 'v4-a', text: 'Wie viel Uhr ist es, bitte?' },
      { id: 'v4-b', text: 'Wie geht es Ihnen?' },
      { id: 'v4-c', text: 'Woher kommen Sie?' },
      { id: 'v4-d', text: 'Was machen Sie beruflich?' },
    ],
    correctOptionId: 'v4-a',
    explanation: '„Wie viel Uhr ist es, bitte?“ (or „Wie spät ist es?“) means „What time is it, please?“. „Wie geht es Ihnen?“ means „How are you?“, and „Woher kommen Sie?“ asks where you come from.',
  },

  // --- GRAMMAR (4 questions) ---
  {
    id: 'grammar-1',
    skill: 'grammar',
    topic: 'Verb Conjugation (Regular & Essential Verbs)',
    difficulty: 'A1.1',
    questionType: 'multiple-choice',
    questionText: 'Welche Verbform passt in die Lücke?\n„Wir _____ seit zwei Jahren in München und lernen fleißig Deutsch.“',
    options: [
      { id: 'g1-a', text: 'wohne' },
      { id: 'g1-b', text: 'wohnen' },
      { id: 'g1-c', text: 'wohnt' },
      { id: 'g1-d', text: 'wohnst' },
    ],
    correctOptionId: 'g1-b',
    explanation: 'The subject pronoun „wir“ (we) takes the 1st person plural verb ending „-en“: „wir wohnen“.',
  },
  {
    id: 'grammar-2',
    skill: 'grammar',
    topic: 'Articles in the Nominative (der / die / das / ein)',
    difficulty: 'A1.1',
    questionType: 'multiple-choice',
    questionText: 'Welcher unbestimmte Artikel ist richtig?\n„Hier auf dem Tisch liegt _____ Apfel. Er ist rot und frisch.“',
    options: [
      { id: 'g2-a', text: 'ein' },
      { id: 'g2-b', text: 'eine' },
      { id: 'g2-c', text: 'einen' },
      { id: 'g2-d', text: 'einem' },
    ],
    correctOptionId: 'g2-a',
    explanation: '„Apfel“ is masculine („der Apfel“). In the nominative subject position with „liegt“, the masculine indefinite article is „ein“. „Einen“ would be used in the accusative case.',
  },
  {
    id: 'grammar-3',
    skill: 'grammar',
    topic: 'Accusative Case (Direct Objects)',
    difficulty: 'A1.2',
    questionType: 'multiple-choice',
    questionText: 'Welcher bestimmte Artikel passt im Akkusativ?\n„Herr Meier sucht _____ Schlüssel für seine Wohnung.“ (maskulin: der Schlüssel)',
    options: [
      { id: 'g3-a', text: 'der' },
      { id: 'g3-b', text: 'den' },
      { id: 'g3-c', text: 'dem' },
      { id: 'g3-d', text: 'des' },
    ],
    correctOptionId: 'g3-b',
    explanation: 'The verb „suchen“ requires an accusative direct object. The masculine definite article „der“ changes to „den“ in the accusative case: „Er sucht den Schlüssel“.',
  },
  {
    id: 'grammar-4',
    skill: 'grammar',
    topic: 'Modal Verbs & Word Order',
    difficulty: 'A1.2',
    questionType: 'multiple-choice',
    questionText: 'Welcher Satz hat die grammatikalisch korrekte Wortstellung?',
    options: [
      { id: 'g4-a', text: 'Ich kann morgen leider nicht kommen.' },
      { id: 'g4-b', text: 'Ich kann kommen morgen leider nicht.' },
      { id: 'g4-c', text: 'Morgen ich kann leider nicht kommen.' },
      { id: 'g4-d', text: 'Ich kommen kann leider nicht morgen.' },
    ],
    correctOptionId: 'g4-a',
    explanation: 'In German main clauses with a modal verb (können), the conjugated modal verb stands in position 2, and the infinitive verb („kommen“) stands at the end of the sentence (Satzklammer).',
  },

  // --- READING (4 questions with short passages) ---
  {
    id: 'reading-1',
    skill: 'reading',
    topic: 'Short Invitations & Personal Notes',
    difficulty: 'A1.1',
    questionType: 'multiple-choice',
    passage: `Liebe Freunde,

ich feiere meinen 30. Geburtstag am kommenden Samstag ab 19:00 Uhr in meinem Garten (Goethestraße 12). 
Für kalte Getränke und gute Musik ist gesorgt. Bitte bringt etwas Leckeres zum Essen für das gemeinsame Buffet mit!

Liebe Grüße,
Stefan`,
    questionText: 'Was sollen die Gäste zur Geburtstagsfeier mitbringen?',
    options: [
      { id: 'r1-a', text: 'Lautsprecher und Musik' },
      { id: 'r1-b', text: 'Kalte Getränke' },
      { id: 'r1-c', text: 'Etwas zu essen für das Buffet' },
      { id: 'r1-d', text: 'Eigene Gartenstühle' },
    ],
    correctOptionId: 'r1-c',
    explanation: 'Stefan writes: „Für kalte Getränke und gute Musik ist gesorgt. Bitte bringt etwas Leckeres zum Essen für das gemeinsame Buffet mit!“ Therefore, guests are asked to bring food for the buffet.',
  },
  {
    id: 'reading-2',
    skill: 'reading',
    topic: 'Public Notices & Opening Hours',
    difficulty: 'A1.1',
    questionType: 'multiple-choice',
    passage: `Hausarztpraxis Dr. med. Thomas Becker

Öffnungs- und Sprechzeiten:
Montag – Donnerstag: 08:00 – 12:00 Uhr und 14:00 – 17:00 Uhr
Freitag: 08:00 – 13:00 Uhr
Samstag & Sonntag: Geschlossen

Außerhalb der Sprechzeiten wenden Sie sich bitte an den ärztlichen Notdienst: Tel. 116 117.`,
    questionText: 'Kann ein Patient am Freitagnachmittag um 15:00 Uhr in die Praxis kommen?',
    options: [
      { id: 'r2-a', text: 'Nein, die Praxis schließt am Freitag bereits um 13:00 Uhr.' },
      { id: 'r2-b', text: 'Ja, am Freitag ist die Praxis bis 17:00 Uhr geöffnet.' },
      { id: 'r2-c', text: 'Ja, aber nur für Notfälle mit Termin.' },
      { id: 'r2-d', text: 'Nein, freitags ist die Praxis ganztägig geschlossen.' },
    ],
    correctOptionId: 'r2-a',
    explanation: 'According to the schedule, Friday hours are „Freitag: 08:00 – 13:00 Uhr“. At 15:00 on Friday, the clinic is closed.',
  },
  {
    id: 'reading-3',
    skill: 'reading',
    topic: 'Public Transportation Announcements',
    difficulty: 'A1.2',
    questionType: 'multiple-choice',
    passage: `Gleisansage am Hauptbahnhof:

„Achtung an Gleis 4: Der Regionalexpress RE 7 nach Köln Messe/Deutz, planmäßige Abfahrt um 11:24 Uhr, fährt heute ausnahmsweise von Gleis 9 ab. Grund dafür ist eine Gleisbauarbeit. 
Bitte beachten Sie die geänderte Abfahrt von Gleis 9.“`,
    questionText: 'Von welchem Gleis fährt der Zug nach Köln heute tatsächlich ab?',
    options: [
      { id: 'r3-a', text: 'Von Gleis 4' },
      { id: 'r3-b', text: 'Von Gleis 7' },
      { id: 'r3-c', text: 'Von Gleis 9' },
      { id: 'r3-d', text: 'Der Zug fällt heute komplett aus' },
    ],
    correctOptionId: 'r3-c',
    explanation: 'The announcement says: „fährt heute ausnahmsweise von Gleis 9 ab“ (departs exceptionally from Platform 9).',
  },
  {
    id: 'reading-4',
    skill: 'reading',
    topic: 'Everyday SMS & Meeting Arrangements',
    difficulty: 'A1.2',
    questionType: 'multiple-choice',
    passage: `Hallo Miriam!

Mein Bus steht im Stau und hat leider 25 Minuten Verspätung. 
Ich schaffe es nicht pünktlich um 17:30 Uhr ins Café Stern. 
Können wir uns stattdessen um 18:00 Uhr direkt am Eingang des Kinos treffen?

Bis gleich, Jonas`,
    questionText: 'Wo und um wie viel Uhr möchte Jonas Miriam jetzt treffen?',
    options: [
      { id: 'r4-a', text: 'Um 17:30 Uhr im Café Stern' },
      { id: 'r4-b', text: 'Um 18:00 Uhr direkt am Kinoeingang' },
      { id: 'r4-c', text: 'Um 17:55 Uhr an der Bushaltestelle' },
      { id: 'r4-d', text: 'Um 18:00 Uhr im Bus' },
    ],
    correctOptionId: 'r4-b',
    explanation: 'Jonas proposes the alternative: „Können wir uns stattdessen um 18:00 Uhr direkt am Eingang des Kinos treffen?“, because his bus is delayed.',
  },
];
