import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Inbox, FileText, CheckCircle, XCircle, AlertTriangle, ShieldCheck, Eye, MessageSquare, Pill } from 'lucide-react';
import { PatientRequest, PrescriptionStatus } from '../../types';

export const PatientRequestsModule: React.FC = () => {
  const { activePharmacyId, patientRequests, updatePatientRequestStatus } = useStore();
  const pharmRequests = patientRequests.filter(r => r.assignedPharmacyId === activePharmacyId || r.status === 'PENDING');

  const [selectedReq, setSelectedReq] = useState<PatientRequest | null>(null);
  const [responseStatus, setResponseStatus] = useState<PatientRequest['status']>('AVAILABLE');
  const [rxStatus, setRxStatus] = useState<PrescriptionStatus>('Verified');
  const [responseNote, setResponseNote] = useState('Prescription verified. Ready for pickup at counter.');

  const handleOpenReview = (req: PatientRequest) => {
    setSelectedReq(req);
    setResponseStatus(req.status === 'PENDING' ? 'AVAILABLE' : req.status);
    setRxStatus(req.prescriptionStatus);
    setResponseNote(req.responseNote || 'Prescription verified. Stock set aside for pickup.');
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReq) {
      updatePatientRequestStatus(selectedReq.id, responseStatus, rxStatus, responseNote);
      setSelectedReq(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <Inbox className="w-7 h-7 text-teal-400" />
            <span>Patient Medicine & Prescription Requests</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review patient medicine inquiries and verify uploaded doctor prescriptions.
          </p>
        </div>

        {/* Disclaimer Callout */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-300 max-w-md">
          <div className="font-bold flex items-center space-x-1.5 mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Pharmacist Verification Required</span>
          </div>
          <p className="text-[11px] text-amber-300/80">
            MediFind does not diagnose, prescribe, or auto-approve prescriptions. Pharmacist verification is strictly required.
          </p>
        </div>
      </div>

      {/* Requests List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Patient & Contact</th>
                <th className="p-4">Requested Medicine</th>
                <th className="p-4">Qty & Location</th>
                <th className="p-4">Prescription Document</th>
                <th className="p-4">RX Verification Status</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {pharmRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No pending patient requests.
                  </td>
                </tr>
              ) : (
                pharmRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-bold text-white">
                      <div>{req.patientName}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{req.patientPhone}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-teal-300">{req.medicineName}</div>
                      <div className="text-[11px] text-slate-400">{req.strength}</div>
                    </td>

                    <td className="p-4 text-slate-300">
                      <div><strong>{req.quantity}</strong> units</div>
                      <div className="text-[11px] text-slate-400">{req.patientLocation}</div>
                    </td>

                    <td className="p-4">
                      {req.prescriptionFileName ? (
                        <a
                          href={req.prescriptionUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-400 font-medium hover:underline flex items-center space-x-1"
                        >
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[120px]">{req.prescriptionFileName}</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">No File</span>
                      )}
                    </td>

                    <td className="p-4">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${
                        req.prescriptionStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        req.prescriptionStatus === 'Pending Review' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}>
                        {req.prescriptionStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${
                        req.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        req.status === 'PENDING' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleOpenReview(req)}
                        className="px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-lg shadow-md transition-all flex items-center space-x-1 mx-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pharmacist Review & Status Update Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">Pharmacist Prescription & Request Review</h3>
              <button onClick={() => setSelectedReq(null)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Patient: <strong>{selectedReq.patientName}</strong> ({selectedReq.patientPhone})</div>
                <div>Medicine: <strong>{selectedReq.medicineName}</strong></div>
                <div>Strength: <strong>{selectedReq.strength}</strong></div>
                <div>Requested Quantity: <strong>{selectedReq.quantity} units</strong></div>
              </div>

              {selectedReq.prescriptionUrl && (
                <div className="pt-2 border-t border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Attached Prescription File:</div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-teal-400 font-mono flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{selectedReq.prescriptionFileName || 'prescription.pdf'}</span>
                    </span>
                    <a
                      href={selectedReq.prescriptionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-800 text-xs text-white rounded font-bold hover:bg-slate-700"
                    >
                      View Full Image/PDF
                    </a>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Stock Availability Response</label>
                  <select
                    value={responseStatus}
                    onChange={e => setResponseStatus(e.target.value as PatientRequest['status'])}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  >
                    <option value="AVAILABLE">AVAILABLE (In Stock)</option>
                    <option value="NOT_AVAILABLE">NOT AVAILABLE (Out of Stock)</option>
                    <option value="FULFILLED">FULFILLED (Picked Up)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Prescription Verification Status</label>
                  <select
                    value={rxStatus}
                    onChange={e => setRxStatus(e.target.value as PrescriptionStatus)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  >
                    <option value="Verified">Verified (Authentic Rx)</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Needs Clarification">Needs Clarification from Doctor</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Rejected">Rejected (Invalid Rx)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Pharmacist Note to Patient</label>
                <textarea
                  rows={3}
                  value={responseNote}
                  onChange={e => setResponseNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-teal-500"
                  placeholder="Add details regarding store pickup, counter number, or dosage instructions..."
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-teal-400 shadow-lg shadow-teal-500/20"
                >
                  Save & Notify Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
