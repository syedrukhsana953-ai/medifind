import React from 'react';
import { Pill, Heart, Shield, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10">
      <div className="container mx-auto px-4 space-y-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
              <Pill className="w-4 h-4 text-teal-400 transform -rotate-45" />
            </div>
            <span className="text-base font-extrabold text-white tracking-tight">
              MEDI<span className="text-teal-400">FIND</span>
            </span>
          </div>

          <p className="text-slate-400 text-center md:text-right max-w-md">
            MediFind — "Enter Once. Manage Once. Update Everywhere." Prototype student startup project demonstration.
          </p>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 space-y-2 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} MediFind Prototype. All fictional demo data.
          </div>

          <div className="flex items-center space-x-4">
            <span>Healthcare SaaS Prototype</span>
            <span>•</span>
            <span>Student Project Demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
