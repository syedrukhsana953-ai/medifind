import React from 'react';
import { Check, Zap, Sparkles, Shield, Building } from 'lucide-react';

export const PricingPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
          SaaS Subscription Model
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Simple, Transparent SaaS Plans for Pharmacies
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Scale your pharmacy business with real-time stock publishing, FEFO batch control, and hyper-local patient demand analytics.
        </p>

        {/* Prototype Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-4 py-2 rounded-xl max-w-md mx-auto font-mono">
          Prototype pricing — subject to market validation. (No live payments charged).
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* STARTER */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">STARTER</div>
            <div className="text-4xl font-extrabold text-white mb-2">
              ₹499 <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">Designed for independent single-counter medical stores.</p>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Up to 1,000 inventory items</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>POS Billing & Auto Stock Sync</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Basic Supplier Purchase Entry</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Patient Search Listing</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold rounded-xl border border-slate-700 transition-all">
            Choose Starter Plan
          </button>
        </div>

        {/* STANDARD (MOST POPULAR) */}
        <div className="bg-slate-900 border-2 border-teal-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-teal-500/10">
          <span className="absolute -top-3.5 right-6 bg-teal-500 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </span>

          <div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">STANDARD</div>
            <div className="text-4xl font-extrabold text-white mb-2">
              ₹999 <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">Full features for busy community pharmacies.</p>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Unlimited Inventory & Batches</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>FEFO Expiry Warnings</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Patient Prescription Review</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Pharmacy Demand Intelligence</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Priority Patient Search Placement</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg shadow-teal-500/25 transition-all">
            Start Standard Trial
          </button>
        </div>

        {/* PROFESSIONAL */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl">
          <div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">PROFESSIONAL</div>
            <div className="text-4xl font-extrabold text-white mb-2">
              ₹1,499 <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">Advanced analytics & multi-counter chains.</p>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Everything in Standard Plan</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Smart AI Inventory Stockout Forecasts</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Multi-Counter User Permissions</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Dedicated Account Manager & Support</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-bold rounded-xl border border-slate-700 transition-all">
            Choose Professional Plan
          </button>
        </div>
      </div>

      {/* FUTURE REVENUE POTENTIAL INFO BOX */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Building className="w-5 h-5 text-teal-400" />
          <span>Potential Revenue & Business Monetization Streams</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <strong className="text-teal-300 block mb-1">1. SaaS Subscriptions</strong>
            <span>Monthly recurring fees for pharmacy inventory & POS software.</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <strong className="text-teal-300 block mb-1">2. Premium Analytics</strong>
            <span>Hyper-local pharma demand insights for distributors.</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <strong className="text-teal-300 block mb-1">3. Optional Service Fees</strong>
            <span>Convenience fee on express doorstep deliveries.</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <strong className="text-teal-300 block mb-1">4. Integration APIs</strong>
            <span>API licensing for hospital and clinic networks.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
