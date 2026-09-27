import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Pill, Search, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Zap, Activity, Store, Layers, BarChart3, Clock, MapPin } from 'lucide-react';

interface LandingPageProps {
  setCurrentTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentTab }) => {
  const { setRole, runCoreLoopDemoTest, resetToDemoState } = useStore();
  const [testResultSteps, setTestResultSteps] = useState<string[] | null>(null);

  const handleRunTest = () => {
    const res = runCoreLoopDemoTest();
    setTestResultSteps(res.steps);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-slate-800">
        {/* Decorative Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-teal-500/10 via-sky-500/10 to-indigo-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />
        
        <div className="container mx-auto px-4 text-center max-w-4xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Find Medicines • Manage Pharmacies • Connect Healthcare</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Find Medicines Nearby.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400">
              Manage Your Pharmacy Smarter.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            MediFind connects community pharmacy inventory & POS management directly with real-time local medicine availability for patients.
          </p>

          {/* Core Principle Callout */}
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl max-w-xl mx-auto mb-10 text-sm text-teal-300 font-mono flex items-center justify-center space-x-2">
            <span className="text-emerald-400 font-bold">CORE PRINCIPLE:</span>
            <span>"Enter Once. Manage Once. Update Everywhere."</span>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setRole('PATIENT');
                setCurrentTab('search');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-base shadow-xl shadow-teal-500/25 transition-all flex items-center justify-center space-x-3 group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Find a Medicine Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setRole('PHARMACY');
                setCurrentTab('dashboard');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-bold text-base shadow-lg transition-all flex items-center justify-center space-x-3"
            >
              <Store className="w-5 h-5 text-teal-400" />
              <span>For Pharmacies</span>
            </button>
          </div>
        </div>
      </section>

      {/* CORE WORKFLOW INTERACTIVE DEMO SANDBOX (SECTION 1 REQUIREMENT) */}
      <section className="py-16 bg-slate-900/60 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Live Core Loop Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              Witness Real-Time Data Flow in Action
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
              Test how inventory purchases directly sync with patient availability and automatically adjust on billing.
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Column: Flow Diagram */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm font-semibold text-teal-400 bg-teal-500/10 p-3 rounded-lg border border-teal-500/20">
                  <span className="w-6 h-6 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Pharmacy Purchases 50 units Paracetamol 500 mg</span>
                </div>
                <div className="text-center text-slate-500 text-xs font-mono">↓ Inventory increases to 50</div>
                
                <div className="flex items-center space-x-3 text-sm font-semibold text-sky-400 bg-sky-500/10 p-3 rounded-lg border border-sky-500/20">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center text-xs font-bold">2</span>
                  <span>Patient Searches Paracetamol 500 mg → Sees AVAILABLE (50)</span>
                </div>
                <div className="text-center text-slate-500 text-xs font-mono">↓ Pharmacy creates bill for 3 units</div>

                <div className="flex items-center space-x-3 text-sm font-semibold text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">3</span>
                  <span>Inventory = 47 → Patient sees 47 units live!</span>
                </div>
              </div>

              {/* Right Column: Execution Box */}
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>Run Automated Loop Test</span>
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Click below to trigger a live multi-step inventory transaction and verify real-time stock sync.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleRunTest}
                    className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-teal-500/20 transition-all text-sm flex items-center justify-center space-x-2"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Execute 1-Click Loop Verification</span>
                  </button>

                  <button
                    onClick={resetToDemoState}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition-all"
                  >
                    Reset Demo State
                  </button>
                </div>
              </div>
            </div>

            {/* Test Results Output Log */}
            {testResultSteps && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-3">
                  Verification Execution Log:
                </h4>
                <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-500/30 space-y-2 font-mono text-xs text-slate-300">
                  {testResultSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How MediFind Works</h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              One unified platform for pharmacy operational excellence and local medicine discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* FOR PATIENTS CARD */}
            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all relative">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6">
                <Search className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">FOR PATIENTS</h3>
              <p className="text-sm text-slate-400 mb-6">
                Find required medicines instantly at verified local pharmacies without visiting store to store.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-teal-400 font-bold flex items-center justify-center text-xs shrink-0">1</span>
                  <span><strong>Search</strong> medicine by generic name, brand, or strength</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-teal-400 font-bold flex items-center justify-center text-xs shrink-0">2</span>
                  <span><strong>Find</strong> nearby pharmacies with live stock counts & freshness status</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-teal-400 font-bold flex items-center justify-center text-xs shrink-0">3</span>
                  <span><strong>Reserve</strong> medicine online or upload prescription</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-teal-400 font-bold flex items-center justify-center text-xs shrink-0">4</span>
                  <span><strong>Pickup</strong> at pharmacy or request doorstep delivery</span>
                </div>
              </div>
            </div>

            {/* FOR PHARMACIES CARD */}
            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all relative">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6">
                <Store className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">FOR PHARMACIES</h3>
              <p className="text-sm text-slate-400 mb-6">
                Streamline stock inventory, batch expiry management, billing POS, and capture local digital demand.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0">1</span>
                  <span><strong>Purchase</strong> entry auto-increases batch inventory stock</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0">2</span>
                  <span><strong>Inventory</strong> FEFO batch tracking & near-expiry alerts</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0">3</span>
                  <span><strong>Bill</strong> POS auto-deducts stock and records sale</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0">4</span>
                  <span><strong>Automatic Stock Update</strong> publishes real-time availability to patient search</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STATEMENT CARD */}
      <section className="py-16 bg-gradient-to-r from-teal-950/40 via-slate-900 to-sky-950/40 border-b border-slate-800 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <blockquote className="text-2xl font-bold text-white italic mb-4">
            "One platform for pharmacy operations and medicine discovery."
          </blockquote>
          <p className="text-slate-400 text-sm">
            MediFind bridges community medical stores and patients with zero double-data entry.
          </p>
        </div>
      </section>

      {/* PRICING PROTOTYPE TEASER */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            SaaS Subscription
          </span>
          <h2 className="text-3xl font-bold text-white mt-4 mb-3">Affordable Pharmacy SaaS</h2>
          <p className="text-slate-400 text-sm mb-10">
            Prototype pricing — subject to market validation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase">Starter</div>
              <div className="text-3xl font-extrabold text-white mt-2 mb-1">₹499 <span className="text-xs text-slate-400 font-normal">/month</span></div>
              <p className="text-xs text-slate-400 mb-4">Basic stock & POS for single counters</p>
              <button onClick={() => setCurrentTab('pricing')} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold rounded-lg border border-slate-700">View Starter Details</button>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border-2 border-teal-500 relative shadow-xl shadow-teal-500/10">
              <span className="absolute -top-3 right-4 bg-teal-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Popular</span>
              <div className="text-xs font-semibold text-teal-400 uppercase">Standard</div>
              <div className="text-3xl font-extrabold text-white mt-2 mb-1">₹999 <span className="text-xs text-slate-400 font-normal">/month</span></div>
              <p className="text-xs text-slate-400 mb-4">Full patient search sync + demand analytics</p>
              <button onClick={() => setCurrentTab('pricing')} className="w-full py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-lg">View Standard Details</button>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase">Professional</div>
              <div className="text-3xl font-extrabold text-white mt-2 mb-1">₹1,499 <span className="text-xs text-slate-400 font-normal">/month</span></div>
              <p className="text-xs text-slate-400 mb-4">Multi-counter, Smart Insights AI & priority</p>
              <button onClick={() => setCurrentTab('pricing')} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold rounded-lg border border-slate-700">View Pro Details</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
