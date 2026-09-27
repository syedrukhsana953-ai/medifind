import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, AlertTriangle, TrendingUp, RefreshCw, ShoppingCart, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SmartInsightsModule: React.FC = () => {
  const { activePharmacyId, batches, medicines, sales } = useStore();
  const pharmBatches = batches.filter(b => b.pharmacyId === activePharmacyId);

  // Calculate rule-based forecasts for active pharmacy inventory
  const forecasts = pharmBatches.map(batch => {
    const med = medicines.find(m => m.id === batch.medicineId);

    // Rule-based daily sales estimate: default 4 units/day for demo medicines
    const avgDailySales = batch.medicineId === 'med-para-500' ? 6 : batch.medicineId === 'med-dolo-650' ? 8 : 3;
    const daysUntilStockout = avgDailySales > 0 ? (batch.quantity / avgDailySales).toFixed(1) : '99+';
    const numDays = parseFloat(daysUntilStockout);

    let riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' = 'LOW';
    let recommendation = 'Maintain current stock level.';

    if (numDays <= 2) {
      riskLevel = 'CRITICAL';
      recommendation = `Potential stockout in ~${daysUntilStockout} days. Immediate reorder of ${avgDailySales * 14} units suggested.`;
    } else if (numDays <= 5) {
      riskLevel = 'HIGH';
      recommendation = `Stockout expected in ~${daysUntilStockout} days. Reorder recommended this week.`;
    } else if (numDays <= 10) {
      riskLevel = 'MODERATE';
      recommendation = `Stock healthy for ~${daysUntilStockout} days. Monitor sales rate.`;
    }

    return {
      batch,
      med,
      avgDailySales,
      daysUntilStockout,
      riskLevel,
      recommendation
    };
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white">Smart Inventory Insights</h1>
            <span className="bg-teal-400/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-400/30 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>AI/ML Prototype Engine</span>
            </span>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Automated stockout forecasting & demand reorder recommendations.
          </p>
        </div>

        {/* Prototype Estimate Disclaimer */}
        <div className="bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-400 font-mono">
          <span className="text-amber-400 font-bold">Rule-based Prototype Calculation</span> • Not medical advice.
        </div>
      </div>

      {/* FORECAST CARDS LIST */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-teal-400" />
          <span>Automated Reorder & Stockout Estimates</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forecasts.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all space-y-4 shadow-xl ${
                item.riskLevel === 'CRITICAL'
                  ? 'bg-slate-900 border-rose-500/50 shadow-rose-500/5'
                  : item.riskLevel === 'HIGH'
                  ? 'bg-slate-900 border-amber-500/40 shadow-amber-500/5'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{item.med?.name || 'Medicine'}</h3>
                  <div className="text-xs text-slate-400">
                    Batch: <span className="font-mono text-slate-300">{item.batch.batchNumber}</span> • Expiry: {item.batch.expiryDate}
                  </div>
                </div>

                <span className={`text-xs px-2.5 py-1 rounded-full font-extrabold border ${
                  item.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                  item.riskLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {item.riskLevel} RISK
                </span>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Current Stock</div>
                  <div className="text-base font-extrabold text-white">{item.batch.quantity} units</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Avg Daily Sales</div>
                  <div className="text-base font-extrabold text-teal-400">~{item.avgDailySales} units/day</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Estimated Runway</div>
                  <div className="text-base font-extrabold text-amber-300">~{item.daysUntilStockout} days</div>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-teal-300">Smart Recommendation:</span> {item.recommendation}
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">[Prototype estimate]</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
