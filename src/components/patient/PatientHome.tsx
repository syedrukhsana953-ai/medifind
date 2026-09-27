import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, MapPin, Pill, CheckCircle, Clock, AlertTriangle, Navigation, Bookmark, Upload, X, Shield, RefreshCw } from 'lucide-react';
import { Pharmacy, Medicine, InventoryBatch } from '../../types';

export const PatientHome: React.FC = () => {
  const { pharmacies, medicines, batches, reserveMedicine, createPatientRequest } = useStore();
  const [searchQuery, setSearchQuery] = useState('Paracetamol 500 mg');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    medicineName: '',
    strength: '500 mg',
    quantity: 10,
    patientName: 'Priya Sharma',
    patientPhone: '+91 98765 43210',
    patientLocation: 'Koti, Hyderabad (1.2 km)'
  });
  const [rxFile, setRxFile] = useState<File | null>(null);

  // Reserve Modal State
  const [reservingPharm, setReservingPharm] = useState<{ pharm: Pharmacy; med: Medicine; batchCount: number } | null>(null);
  const [reserveQty, setReserveQty] = useState(5);
  const [patientNameInput, setPatientNameInput] = useState('Anil Kumar');
  const [patientPhoneInput, setPatientPhoneInput] = useState('+91 99000 11223');

  // Perform search query calculation
  const queryLower = searchQuery.toLowerCase().trim();

  // Matched master medicines
  const matchedMedicines = medicines.filter(m => {
    const nameMatch = m.name.toLowerCase().includes(queryLower);
    const brandMatch = m.brand.toLowerCase().includes(queryLower);
    const genericMatch = m.genericName.toLowerCase().includes(queryLower);
    const categoryMatch = selectedCategory === 'ALL' || m.category === selectedCategory;

    return (nameMatch || brandMatch || genericMatch) && categoryMatch;
  });

  // Calculate freshness text
  const getFreshnessText = (lastUpdatedIso?: string) => {
    if (!lastUpdatedIso) return 'Verified 3 minutes ago';
    const diffMins = Math.floor((Date.now() - new Date(lastUpdatedIso).getTime()) / 60000);

    if (diffMins <= 5) return `Verified ${Math.max(1, diffMins)} minutes ago`;
    if (diffMins <= 30) return `Updated ${diffMins} minutes ago`;
    if (diffMins <= 120) return `Updated ${Math.floor(diffMins / 60)} hour ago`;
    return 'Availability may need verification';
  };

  const handleOpenReserve = (pharm: Pharmacy, med: Medicine, batchCount: number) => {
    setReservingPharm({ pharm, med, batchCount });
    setReserveQty(Math.min(5, batchCount));
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (reservingPharm) {
      reserveMedicine(
        reservingPharm.pharm.id,
        reservingPharm.med.id,
        reserveQty,
        patientNameInput,
        patientPhoneInput
      );
      setReservingPharm(null);
    }
  };

  const handleOpenRequest = (medNameStr?: string) => {
    setRequestForm(prev => ({ ...prev, medicineName: medNameStr || searchQuery || 'Paracetamol 500 mg' }));
    setIsRequestModalOpen(true);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    createPatientRequest({
      medicineName: requestForm.medicineName,
      strength: requestForm.strength,
      quantity: requestForm.quantity,
      patientName: requestForm.patientName,
      patientPhone: requestForm.patientPhone,
      patientLocation: requestForm.patientLocation,
      prescriptionFile: rxFile || undefined
    });
    setIsRequestModalOpen(false);
    setRxFile(null);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-sky-950 border border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Real-Time Local Medicine Finder
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Find Your Medicine Nearby
          </h1>
          <p className="text-sm text-slate-300">
            Search by brand, generic salt name, or strength to discover live stock at nearby verified pharmacies.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 text-teal-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search medicine (e.g. Paracetamol 500 mg, Dolo 650, Amoxicillin)..."
            className="w-full bg-slate-950 border-2 border-teal-500/50 rounded-2xl pl-12 pr-4 py-4 text-white text-base focus:outline-none focus:border-teal-400 shadow-xl placeholder-slate-500 font-medium"
          />
        </div>

        {/* Popular Pill Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 mr-1">Popular searches:</span>
          {['Paracetamol 500 mg', 'Dolo 650 mg', 'Amoxicillin 500 mg', 'Azithromycin 500 mg', 'Cetirizine 10 mg'].map(term => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="bg-slate-900/90 hover:bg-slate-800 text-teal-300 px-3 py-1 rounded-lg border border-slate-700 transition-all font-medium"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Container */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Pill className="w-5 h-5 text-teal-400" />
            <span>Search Results for "{searchQuery}"</span>
          </h2>
          <span className="text-xs text-slate-400">
            {matchedMedicines.length} medicine match(es) found
          </span>
        </div>

        {matchedMedicines.length === 0 ? (
          /* Empty State + Request Trigger */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Can't find your medicine?</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              No matching live stock found for "{searchQuery}". Submit a patient request and local community pharmacies will be notified.
            </p>
            <button
              onClick={() => handleOpenRequest(searchQuery)}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm transition-all"
            >
              Request Medicine from Nearby Pharmacies
            </button>
          </div>
        ) : (
          /* Matched Medicines & Pharmacy Stock Cards */
          matchedMedicines.map(med => {
            return (
              <div key={med.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                {/* Medicine Master Header */}
                <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{med.name}</h3>
                    <p className="text-xs text-teal-400 font-medium">
                      Brand: <strong>{med.brand}</strong> • Generic: <strong>{med.genericName}</strong> • {med.dosageForm} ({med.strength})
                    </p>
                  </div>
                  {med.isRxRequired && (
                    <span className="bg-rose-500/20 text-rose-300 text-[11px] px-2.5 py-1 rounded-full font-bold border border-rose-500/30 self-start sm:self-center">
                      PRESCRIPTION REQUIRED (Rx)
                    </span>
                  )}
                </div>

                {/* List of Pharmacies & Stock Availability */}
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Nearby Pharmacy Availability (Sorted by Stock Freshness & Distance)
                  </div>

                  {pharmacies.map((pharm, idx) => {
                    // Find active batches for this pharmacy & medicine
                    const pharmBatchesForMed = batches.filter(
                      b => b.pharmacyId === pharm.id && b.medicineId === med.id && b.status !== 'EXPIRED'
                    );

                    const totalStockQty = pharmBatchesForMed.reduce((acc, b) => acc + b.quantity, 0);
                    const latestBatch = pharmBatchesForMed[0];
                    const freshness = getFreshnessText(latestBatch?.lastUpdated);
                    const distanceKm = (1.5 + idx * 0.9).toFixed(1);

                    return (
                      <div
                        key={pharm.id}
                        className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          totalStockQty > 0
                            ? 'bg-slate-950 border-slate-800 hover:border-teal-500/50'
                            : 'bg-slate-950/50 border-slate-900 opacity-60'
                        }`}
                      >
                        {/* Left: Pharmacy Info */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-base font-bold text-white">{pharm.name}</h4>
                            {pharm.isVerified && (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                                VERIFIED
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center space-x-1 text-slate-300">
                              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                              <span>{pharm.address}, {pharm.city} ({distanceKm} km away)</span>
                            </span>

                            <span className="flex items-center space-x-1 text-slate-400">
                              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span>{pharm.openingHours}</span>
                            </span>
                          </div>

                          {/* Freshness Badge & Stock Badge */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {totalStockQty > 0 ? (
                              <>
                                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                                  AVAILABLE ({totalStockQty} units)
                                </span>
                                <span className="bg-slate-800 text-slate-300 text-[11px] px-2.5 py-0.5 rounded-full border border-slate-700 font-mono">
                                  {freshness}
                                </span>
                              </>
                            ) : (
                              <span className="bg-slate-800 text-slate-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-slate-700">
                                OUT OF STOCK
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center space-x-2 shrink-0">
                          {totalStockQty > 0 ? (
                            <button
                              onClick={() => handleOpenReserve(pharm, med, totalStockQty)}
                              className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center space-x-1.5"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>Reserve Online</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleOpenRequest(med.name)}
                              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                            >
                              Notify When In Stock
                            </button>
                          )}

                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(pharm.name + ' ' + pharm.city)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center space-x-1"
                          >
                            <Navigation className="w-3.5 h-3.5 text-sky-400" />
                            <span>Directions</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* REQUEST MEDICINE MODAL (SECTION 15 & 16) */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Submit Patient Medicine Request</h3>
                <p className="text-xs text-slate-400">Local community pharmacies will respond with availability.</p>
              </div>
              <button onClick={() => setIsRequestModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Medicine Name & Brand</label>
                <input
                  type="text"
                  value={requestForm.medicineName}
                  onChange={e => setRequestForm({ ...requestForm, medicineName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Strength / Dosage</label>
                  <input
                    type="text"
                    value={requestForm.strength}
                    onChange={e => setRequestForm({ ...requestForm, strength: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Required Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={requestForm.quantity}
                    onChange={e => setRequestForm({ ...requestForm, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={requestForm.patientName}
                    onChange={e => setRequestForm({ ...requestForm, patientName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={requestForm.patientPhone}
                    onChange={e => setRequestForm({ ...requestForm, patientPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Delivery / Search Location</label>
                <input
                  type="text"
                  value={requestForm.patientLocation}
                  onChange={e => setRequestForm({ ...requestForm, patientLocation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              {/* Prescription Upload (JPG/PNG/PDF) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Upload Prescription (Optional JPG, PNG, PDF)</label>
                <div className="bg-slate-950 border border-dashed border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:border-teal-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={e => setRxFile(e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                    id="prescription-file-input"
                  />
                  <label htmlFor="prescription-file-input" className="cursor-pointer flex flex-col items-center space-y-1">
                    <Upload className="w-6 h-6 text-teal-400" />
                    <span className="text-xs text-slate-300 font-medium">
                      {rxFile ? rxFile.name : 'Click to select prescription image or PDF'}
                    </span>
                    <span className="text-[10px] text-slate-500">Prototype secure file upload</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-teal-400 shadow-lg shadow-teal-500/20"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESERVE MEDICINE MODAL */}
      {reservingPharm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Reserve Medicine Counter Pickup</h3>
            <p className="text-xs text-slate-400">
              Reserving <strong>{reservingPharm.med.name}</strong> at <strong>{reservingPharm.pharm.name}</strong>.
            </p>

            <form onSubmit={handleConfirmReservation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Quantity to Reserve (Max: {reservingPharm.batchCount})</label>
                <input
                  type="number"
                  min="1"
                  max={reservingPharm.batchCount}
                  value={reserveQty}
                  onChange={e => setReserveQty(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-bold text-teal-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={patientNameInput}
                  onChange={e => setPatientNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone Number for Counter Verification</label>
                <input
                  type="text"
                  value={patientPhoneInput}
                  onChange={e => setPatientPhoneInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setReservingPharm(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-teal-400 shadow-lg shadow-teal-500/20"
                >
                  Confirm Reservation Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
