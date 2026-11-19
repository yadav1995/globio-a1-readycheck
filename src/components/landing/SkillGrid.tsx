import React from 'react';
import { BookMarked, Layers, FileText } from 'lucide-react';

export const SkillGrid: React.FC = () => {
  const skills = [
    {
      title: 'Vocabulary (Wortschatz)',
      count: '4 Questions',
      icon: BookMarked,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description:
        'Recognition and precise use of essential everyday A1 vocabulary: food, family members, occupations, daily routines, and polite courtesies.',
      examples: ['Food & Beverages', 'Workplaces & Professions', 'Clock Times & Numbers'],
    },
    {
      title: 'Grammar (Grammatik)',
      count: '4 Questions',
      icon: Layers,
      color: 'text-forest-700 bg-forest-50 border-forest-200',
      description:
        'Understanding of foundational German sentence structures: regular verb conjugations, irregular sein/haben, articles (der/die/das), and direct accusative objects.',
      examples: ['Verb Endings (-e, -st, -t, -en)', 'Nominative vs. Accusative', 'Modal Verb Bracket (Satzklammer)'],
    },
    {
      title: 'Reading (Leseverstehen)',
      count: '4 Questions',
      icon: FileText,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      description:
        'Comprehension of authentic, short everyday texts such as personal party invitations, doctor’s office notices, train platform changes, and urgent SMS notes.',
      examples: ['Opening Hours & Schedules', 'Station Announcements', 'Personal Messages & Notes'],
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 my-10">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
          Three Foundational Skill Areas
        </h2>
        <p className="text-stone-600 text-sm mt-1">
          A balanced 12-question diagnostic designed to spot specific gaps before they cost you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-subtle hover:shadow-elevated transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border ${skill.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    {skill.count}
                  </span>
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">{skill.title}</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-medium text-stone-700 mb-1.5">Assessed topics:</p>
                <div className="flex flex-wrap gap-1">
                  {skill.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-stone-50 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200/60"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
