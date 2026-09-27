import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BarChart3, TrendingUp, Search, Inbox, AlertTriangle, Sparkles, Layers } from 'lucide-react';

export const DemandAnalyticsModule: React.FC = () => {
  const { searchLogs, patientRequests } = useStore();

  const demoDemandItems = [
    { name: 'Paracetamol 500 mg', brand: 'Crocin 500', searches: 142, requests: 37, unfulfilled: 8, status: 'HIGH DEMAND' },
    { name: 'Dolo 650 mg', brand: 'Dolo 650', searches: 198, requests: 45, unfulfilled: 3, status: 'HIGH DEMAND' },
    { name: 'Amoxicillin 500 mg', brand: 'Mox 500', searches: 86, requests: 19, unfulfilled: 12, status: 'STOCKOUT RISK' },
    { name: 'Azithromycin 500 mg', brand: 'Azee 500', searches: 112, requests: 28, unfulfilled: 14, status: 'HIGH UNFULFILLED' },
    { name: 'Pantoprazole 40 mg', brand: 'Pan 40', searches: 64, requests: 11, unfulfilled: 2, status: 'NORMAL' },
    { name: 'Cetirizine 10 mg', brand: 'Cetzine 10', searches: 92, requests: 15, unfulfilled: 1, status: 'NORMAL' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <BarChart3 className="w-7 h-7 text-teal-400" />
            <span>Pharmacy Demand Intelligence</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Capture local patient search trends, unfulfilled requests, and hyper-local medicine demand.
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs text-amber-300 font-mono">
          DEMO DATA ENVIRONMENT
        </div>
      </div>

      {/* TOP ANALYTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total Local Searches</span>
            <Search className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">694</div>
          <p className="text-xs text-teal-400 mt-1">↑ +24% vs last week</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Patient Requests</span>
            <Inbox className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">155</div>
          <p className="text-xs text-sky-400 mt-1">Direct medicine requests</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Unfulfilled Demand</span>
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400">40</div>
          <p className="text-xs text-rose-400/80 mt-1">Lost revenue opportunities</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Top Demanded Generic</span>
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-lg font-extrabold text-white">Paracetamol</div>
          <p className="text-xs text-slate-400 mt-1">340 total queries</p>
        </div>
      </div>

      {/* DEMAND METRICS TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <span>Medicine Search & Demand Breakdown (Demo Data)</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Medicine Name</th>
                <th className="p-4">Popular Brand</th>
                <th className="p-4 text-right">Patient Searches</th>
                <th className="p-4 text-right">Custom Requests</th>
                <th className="p-4 text-right">Unfulfilled Count</th>
                <th className="p-4">Demand Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {demoDemandItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">{item.name}</td>
                  <td className="p-4 text-teal-400 font-medium">{item.brand}</td>
                  <td className="p-4 text-right font-extrabold text-white">{item.searches}</td>
                  <td className="p-4 text-right font-extrabold text-sky-400">{item.requests}</td>
                  <td className="p-4 text-right font-extrabold text-rose-400">{item.unfulfilled}</td>
                  <td className="p-4">
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${
                      item.status === 'HIGH DEMAND' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      item.status === 'HIGH UNFULFILLED' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                      item.status === 'STOCKOUT RISK' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
