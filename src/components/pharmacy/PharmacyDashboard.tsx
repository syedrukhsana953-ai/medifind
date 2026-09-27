import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Pill, Package, ShoppingCart, AlertTriangle, Clock, Inbox, Plus, ShoppingBag, BarChart3, TrendingUp, Sparkles, Store, CheckCircle } from 'lucide-react';

interface PharmacyDashboardProps {
  setCurrentTab: (tab: string) => void;
  openAddPurchaseModal: () => void;
  openAddMedicineModal: () => void;
}

export const PharmacyDashboard: React.FC<PharmacyDashboardProps> = ({
  setCurrentTab,
  openAddPurchaseModal,
  openAddMedicineModal
}) => {
  const { activePharmacyId, pharmacies, batches, medicines, sales, patientRequests } = useStore();
  const activePharm = pharmacies.find(p => p.id === activePharmacyId) || pharmacies[0];

  // Filter batches for active pharmacy
  const pharmBatches = batches.filter(b => b.pharmacyId === activePharmacyId);
  const pharmSales = sales.filter(s => s.pharmacyId === activePharmacyId);
  const pharmRequests = patientRequests.filter(r => r.assignedPharmacyId === activePharmacyId || r.status === 'PENDING');

  // Metric Calculations
  const uniqueMedicinesCount = new Set(pharmBatches.map(b => b.medicineId)).size;
  const totalStockUnits = pharmBatches.reduce((acc, b) => acc + (b.status !== 'EXPIRED' ? b.quantity : 0), 0);
  
  const todayStr = new Date().toISOString().substring(0, 10);
  const todaySalesTotal = pharmSales
    .filter(s => s.saleDate.substring(0, 10) === todayStr)
    .reduce((acc, s) => acc + s.totalAmount, 0);

  const lowStockCount = pharmBatches.filter(b => b.status === 'LOW_STOCK' || b.quantity < 10).length;
  const nearExpiryCount = pharmBatches.filter(b => b.status === 'NEAR_EXPIRY').length;
  const pendingRequestsCount = pharmRequests.filter(r => r.status === 'PENDING').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white">{activePharm.name}</h1>
            {activePharm.isVerified && (
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded font-bold border border-emerald-500/30 flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>VERIFIED PHARMACY</span>
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {activePharm.address}, {activePharm.city} • Owner: {activePharm.ownerName} ({activePharm.phone})
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={openAddPurchaseModal}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Purchase</span>
          </button>

          <button
            onClick={openAddMedicineModal}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center space-x-1.5"
          >
            <Pill className="w-4 h-4 text-teal-400" />
            <span>Add Medicine</span>
          </button>

          <button
            onClick={() => setCurrentTab('billing')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Create Bill</span>
          </button>
        </div>
      </div>

      {/* TOP 6 METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Medicines */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Medicines</span>
            <Pill className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{uniqueMedicinesCount}</div>
          <span className="text-[10px] text-slate-500">In catalog</span>
        </div>

        {/* Total Stock Units */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Stock</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{totalStockUnits}</div>
          <span className="text-[10px] text-slate-500">Units available</span>
        </div>

        {/* Today's Sales */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Today's Sales</span>
            <ShoppingCart className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">₹{todaySalesTotal.toFixed(2)}</div>
          <span className="text-[10px] text-emerald-400">POS transactions</span>
        </div>

        {/* Low Stock */}
        <div className={`p-4 rounded-xl border transition-all ${lowStockCount > 0 ? 'bg-amber-950/30 border-amber-500/40' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-amber-400">Low Stock</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300">{lowStockCount}</div>
          <span className="text-[10px] text-amber-400/80">Reorder needed</span>
        </div>

        {/* Near Expiry */}
        <div className={`p-4 rounded-xl border transition-all ${nearExpiryCount > 0 ? 'bg-rose-950/30 border-rose-500/40' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-rose-400">Near Expiry</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-300">{nearExpiryCount}</div>
          <span className="text-[10px] text-rose-400/80">&lt; 90 days</span>
        </div>

        {/* Pending Patient Requests */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Patient Requests</span>
            <Inbox className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{pendingRequestsCount}</div>
          <span className="text-[10px] text-indigo-400">New requests</span>
        </div>
      </div>

      {/* CHARTS & INSIGHTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Revenue Trend Chart */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                <span>Sales Overview (Demo Data)</span>
              </h3>
              <p className="text-xs text-slate-400">Daily POS billing revenue</p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">DEMO CHART</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Today</span>
                <span className="font-bold text-teal-400">₹{todaySalesTotal.toFixed(2)}</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Yesterday</span>
                <span className="font-bold text-slate-300">₹1,450.00</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-600 h-full rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>3 Days Ago</span>
                <span className="font-bold text-slate-300">₹2,100.00</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-600 h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling & Low Stock Alerts */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Low Stock & Reorder Alerts</span>
              </h3>
              <button onClick={() => setCurrentTab('inventory')} className="text-xs text-teal-400 hover:underline">
                View Full Inventory →
              </button>
            </div>

            {pharmBatches.filter(b => b.status === 'LOW_STOCK' || b.quantity < 10).length === 0 ? (
              <div className="text-sm text-slate-400 py-6 text-center">All medicine stocks are healthy.</div>
            ) : (
              <div className="space-y-3">
                {pharmBatches
                  .filter(b => b.status === 'LOW_STOCK' || b.quantity < 10)
                  .map(batch => {
                    const med = medicines.find(m => m.id === batch.medicineId);
                    return (
                      <div key={batch.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-white">{med?.name || 'Medicine'}</div>
                          <div className="text-xs text-slate-400">Batch: {batch.batchNumber} • Expiry: {batch.expiryDate}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {batch.quantity} units left
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Powered by MediFind Smart Sync</span>
            <button onClick={() => setCurrentTab('smart-insights')} className="text-teal-400 hover:underline font-bold">
              Check Smart AI Forecasts →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
