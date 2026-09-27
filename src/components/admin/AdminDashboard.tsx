import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Shield, Store, Pill, Search, Inbox, CheckCircle, AlertTriangle, Activity, BarChart2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { pharmacies, medicines, batches, patientRequests, searchLogs, togglePharmacyVerification } = useStore();

  const totalPharmacies = pharmacies.length;
  const verifiedPharmacies = pharmacies.filter(p => p.isVerified).length;
  const totalMedicines = medicines.length;
  const totalStockUnits = batches.reduce((acc, b) => acc + (b.status !== 'EXPIRED' ? b.quantity : 0), 0);
  const pendingRequestsCount = patientRequests.filter(r => r.status === 'PENDING').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <Shield className="w-7 h-7 text-purple-400" />
            <span>MediFind Platform Administration</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Global network monitoring, pharmacy verification, and real-time medicine search statistics.
          </p>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-xl text-xs text-purple-300 font-mono flex items-center space-x-2">
          <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>System Status: 100% Operational</span>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Total Pharmacies</span>
            <Store className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalPharmacies}</div>
          <p className="text-xs text-emerald-400 mt-1">{verifiedPharmacies} Verified Stores</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Catalog Medicines</span>
            <Pill className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalMedicines}</div>
          <p className="text-xs text-teal-400 mt-1">{totalStockUnits} Total Stock Units</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Patient Searches</span>
            <Search className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{searchLogs.length + 142}</div>
          <p className="text-xs text-sky-400 mt-1">Live query volume</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Patient Requests</span>
            <Inbox className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{patientRequests.length}</div>
          <p className="text-xs text-amber-300 mt-1">{pendingRequestsCount} Pending Action</p>
        </div>
      </div>

      {/* PHARMACIES VERIFICATION & MANAGEMENT TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Store className="w-5 h-5 text-purple-400" />
            <span>Community Pharmacies Network</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Pharmacy Store Name</th>
                <th className="p-4">Owner & Contact</th>
                <th className="p-4">Location & City</th>
                <th className="p-4">Fulfillment</th>
                <th className="p-4">Verification Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {pharmacies.map(pharm => (
                <tr key={pharm.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    <div>{pharm.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{pharm.email}</div>
                  </td>

                  <td className="p-4">
                    <div>{pharm.ownerName}</div>
                    <div className="text-[11px] text-slate-400">{pharm.phone}</div>
                  </td>

                  <td className="p-4">
                    <div>{pharm.address}</div>
                    <div className="text-[11px] text-slate-400">{pharm.city}, {pharm.state} ({pharm.pincode})</div>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {pharm.isPickupAvailable && <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded">Counter Pickup</span>}
                      {pharm.isDeliveryAvailable && <span className="bg-teal-500/20 text-teal-300 text-[10px] px-2 py-0.5 rounded">Delivery</span>}
                    </div>
                  </td>

                  <td className="p-4">
                    {pharm.isVerified ? (
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-500/30 flex items-center space-x-1 w-fit">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>VERIFIED</span>
                      </span>
                    ) : (
                      <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-bold border border-amber-500/30 w-fit block">
                        Unverified
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => togglePharmacyVerification(pharm.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        pharm.isVerified
                          ? 'bg-slate-800 text-slate-400 hover:text-white'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      {pharm.isVerified ? 'Revoke Verification' : 'Approve & Verify'}
                    </button>
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
