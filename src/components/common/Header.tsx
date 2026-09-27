import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Pill, Search, Store, Shield, User, Menu, X, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { role, setRole, activePharmacyId, setActivePharmacyId, pharmacies, toastMessage, runCoreLoopDemoTest } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activePharm = pharmacies.find(p => p.id === activePharmacyId) || pharmacies[0];

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'PHARMACY') setCurrentTab('dashboard');
    else if (newRole === 'PATIENT') setCurrentTab('search');
    else if (newRole === 'ADMIN') setCurrentTab('admin-dashboard');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner for Demo Environment */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-800 to-sky-900 text-slate-300 text-xs py-1.5 px-4 flex items-center justify-between border-b border-teal-800/40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-teal-500/30">
              Demo Environment
            </span>
            <span className="hidden sm:inline text-slate-400">
              "Enter Once. Manage Once. Update Everywhere."
            </span>
          </div>

          <button
            onClick={() => {
              const res = runCoreLoopDemoTest();
              alert(`Core Loop Verification Test Completed:\n\n${res.steps.join('\n')}`);
            }}
            className="flex items-center space-x-1 text-xs text-amber-300 hover:text-amber-200 font-semibold bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/30 transition-all"
            title="Run 1-click Purchase -> Inventory -> Patient Stock verification test"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Test Core Loop (1-Click)</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentTab('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-sky-500 p-0.5 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Pill className="w-6 h-6 text-teal-400 transform -rotate-45" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                MEDI<span className="text-teal-400">FIND</span>
              </span>
              <span className="bg-teal-400/10 text-teal-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase border border-teal-400/20">
                MVP
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Find Medicines • Connect Pharmacies</p>
          </div>
        </div>

        {/* Navigation Tabs based on Role */}
        <nav className="hidden lg:flex items-center space-x-1">
          {role === 'PATIENT' && (
            <>
              <button
                onClick={() => setCurrentTab('landing')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'landing' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentTab('search')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'search' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Find Medicines
              </button>
              <button
                onClick={() => setCurrentTab('patient-requests')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'patient-requests' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                My Requests & RX
              </button>
              <button
                onClick={() => setCurrentTab('pricing')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'pricing' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Pricing
              </button>
            </>
          )}

          {role === 'PHARMACY' && (
            <>
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'dashboard' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentTab('inventory')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'inventory' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Inventory
              </button>
              <button
                onClick={() => setCurrentTab('purchases')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'purchases' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Purchases
              </button>
              <button
                onClick={() => setCurrentTab('billing')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'billing' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Billing / POS
              </button>
              <button
                onClick={() => setCurrentTab('suppliers')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'suppliers' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Suppliers
              </button>
              <button
                onClick={() => setCurrentTab('pharmacy-requests')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'pharmacy-requests' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Patient Requests
              </button>
              <button
                onClick={() => setCurrentTab('demand-analytics')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'demand-analytics' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Demand Analytics
              </button>
              <button
                onClick={() => setCurrentTab('smart-insights')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'smart-insights' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Smart Insights
              </button>
              <button
                onClick={() => setCurrentTab('pharmacy-profile')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'pharmacy-profile' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Profile
              </button>
            </>
          )}

          {role === 'ADMIN' && (
            <>
              <button
                onClick={() => setCurrentTab('admin-dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'admin-dashboard' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Platform Stats
              </button>
              <button
                onClick={() => setCurrentTab('admin-pharmacies')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentTab === 'admin-pharmacies' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Pharmacies
              </button>
            </>
          )}
        </nav>

        {/* Right Section: Active Pharmacy Selector + Role Switcher */}
        <div className="hidden md:flex items-center space-x-3">
          {role === 'PHARMACY' && (
            <div className="flex items-center space-x-2 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
              <Store className="w-3.5 h-3.5 text-teal-400" />
              <select
                value={activePharmacyId}
                onChange={e => setActivePharmacyId(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none font-medium text-xs cursor-pointer"
              >
                {pharmacies.map(p => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                    {p.name} ({p.city})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Role Switcher Pills */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1">
            <button
              onClick={() => handleRoleChange('PATIENT')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                role === 'PATIENT'
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Patient</span>
            </button>

            <button
              onClick={() => handleRoleChange('PHARMACY')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                role === 'PHARMACY'
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Pharmacy</span>
            </button>

            <button
              onClick={() => handleRoleChange('ADMIN')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                role === 'ADMIN'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Select Role</div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleRoleChange('PATIENT')}
              className={`py-2 text-center rounded-lg text-xs font-bold ${role === 'PATIENT' ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              Patient
            </button>
            <button
              onClick={() => handleRoleChange('PHARMACY')}
              className={`py-2 text-center rounded-lg text-xs font-bold ${role === 'PHARMACY' ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              Pharmacy
            </button>
            <button
              onClick={() => handleRoleChange('ADMIN')}
              className={`py-2 text-center rounded-lg text-xs font-bold ${role === 'ADMIN' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              Admin
            </button>
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-1">
            {role === 'PATIENT' && (
              <>
                <button onClick={() => { setCurrentTab('landing'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Home</button>
                <button onClick={() => { setCurrentTab('search'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Find Medicines</button>
                <button onClick={() => { setCurrentTab('patient-requests'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">My Requests & Prescriptions</button>
                <button onClick={() => { setCurrentTab('pricing'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Pricing</button>
              </>
            )}

            {role === 'PHARMACY' && (
              <>
                <button onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Dashboard</button>
                <button onClick={() => { setCurrentTab('inventory'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Inventory</button>
                <button onClick={() => { setCurrentTab('purchases'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Purchases</button>
                <button onClick={() => { setCurrentTab('billing'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Billing / POS</button>
                <button onClick={() => { setCurrentTab('suppliers'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Suppliers</button>
                <button onClick={() => { setCurrentTab('pharmacy-requests'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Patient Requests</button>
                <button onClick={() => { setCurrentTab('demand-analytics'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Demand Analytics</button>
                <button onClick={() => { setCurrentTab('smart-insights'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Smart Insights</button>
              </>
            )}

            {role === 'ADMIN' && (
              <>
                <button onClick={() => { setCurrentTab('admin-dashboard'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Platform Stats</button>
                <button onClick={() => { setCurrentTab('admin-pharmacies'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-slate-800">Pharmacies</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-teal-900 border border-teal-500/50 text-teal-100 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 backdrop-blur-md animate-bounce">
          <CheckCircle className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </header>
  );
};
