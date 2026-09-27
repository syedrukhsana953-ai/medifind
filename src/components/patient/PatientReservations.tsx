import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Bookmark, Inbox, CheckCircle, Clock, FileText, MapPin, AlertCircle } from 'lucide-react';

export const PatientReservations: React.FC = () => {
  const { reservations, patientRequests } = useStore();

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
          <Bookmark className="w-7 h-7 text-teal-400" />
          <span>My Reservations & Medicine Requests</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track online counter reservations and custom medicine request statuses.
        </p>
      </div>

      {/* ONLINE COUNTER RESERVATIONS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>Active Online Counter Reservations ({reservations.length})</span>
        </h2>

        {reservations.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            No active reservations. Search for a medicine and click "Reserve Online".
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map(res => (
              <div key={res.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-base font-bold text-white">{res.medicineName}</div>
                  <div className="text-xs text-slate-400 flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>Pharmacy: <strong>{res.pharmacyName}</strong></span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Reserved: <strong>{res.quantity} units</strong> for {res.patientName} ({res.patientPhone})
                  </div>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/30 p-3 rounded-xl text-center shrink-0">
                  <div className="text-[10px] uppercase font-bold text-teal-300">Counter Pickup Code</div>
                  <div className="text-lg font-extrabold text-teal-400 font-mono tracking-wider">{res.pickupCode}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CUSTOM PATIENT REQUESTS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Inbox className="w-5 h-5 text-indigo-400" />
          <span>Submitted Medicine & Prescription Requests ({patientRequests.length})</span>
        </h2>

        {patientRequests.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            No active medicine requests.
          </div>
        ) : (
          <div className="space-y-3">
            {patientRequests.map(req => (
              <div key={req.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{req.medicineName} ({req.strength})</h3>
                    <p className="text-xs text-slate-400">
                      Qty: {req.quantity} units • Location: {req.patientLocation}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                      req.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      req.status === 'PENDING' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {req.status}
                    </span>

                    <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 font-medium">
                      RX Status: {req.prescriptionStatus}
                    </span>
                  </div>
                </div>

                {req.prescriptionFileName && (
                  <div className="text-xs text-slate-400 flex items-center space-x-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <FileText className="w-4 h-4 text-teal-400" />
                    <span>Prescription File Attached: <strong>{req.prescriptionFileName}</strong></span>
                  </div>
                )}

                {req.responseNote && (
                  <div className="text-xs text-emerald-300 bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30">
                    <strong>Pharmacy Response:</strong> {req.responseNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
