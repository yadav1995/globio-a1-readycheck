import React from 'react';
import { ShieldAlert, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-stone-200 bg-stone-100/60 mt-16 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Core Disclaimer Box */}
        <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
          <div className="flex items-center text-stone-800 font-semibold space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Important Product Disclaimers & Exam Scope</span>
          </div>
          <p>
            <strong>Globio A1 ReadyCheck</strong> is an independent diagnostic learning tool created to help learners assess foundational reading, vocabulary, and grammar concepts before booking an exam.
          </p>
          <p>
            <strong>Untested Skills:</strong> This diagnostic assesses only <em>Vocabulary</em>, <em>Grammar</em>, and <em>Reading</em>. Listening comprehension (Hören), writing (Schreiben), and speaking (Sprechen) are <strong>not assessed</strong> by this tool.
          </p>
          <p>
            <strong>No Guarantee:</strong> This application is not affiliated with, endorsed by, or sponsored by Goethe-Institut, ÖSD, or telc. Scores and diagnostic bands represent indicative formative feedback and do not certify language proficiency, guarantee an exam pass, or predict official test scores.
          </p>
        </div>

        {/* Copyright and Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-700 pt-2 gap-2">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-3.5 h-3.5 text-forest-700" />
            <span>Globio Learning — German A1 Diagnostic Assessment MVP</span>
          </div>
          <p>© {new Date().getFullYear()} Globio. Educational diagnostics for language learners.</p>
        </div>
      </div>
    </footer>
  );
};
