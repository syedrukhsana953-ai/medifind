import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { PatientHome } from './components/patient/PatientHome';
import { PatientReservations } from './components/patient/PatientReservations';
import { PharmacyDashboard } from './components/pharmacy/PharmacyDashboard';
import { PharmacyProfile } from './components/pharmacy/PharmacyProfile';
import { SupplierModule } from './components/pharmacy/SupplierModule';
import { PurchaseModule } from './components/pharmacy/PurchaseModule';
import { InventoryModule } from './components/pharmacy/InventoryModule';
import { BillingModule } from './components/pharmacy/BillingModule';
import { PatientRequestsModule } from './components/pharmacy/PatientRequestsModule';
import { DemandAnalyticsModule } from './components/pharmacy/DemandAnalyticsModule';
import { SmartInsightsModule } from './components/pharmacy/SmartInsightsModule';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PricingPage } from './components/pricing/PricingPage';

// Quick Add Medicine Modal
import { X, Plus, Pill } from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, addMedicine, medicines } = useStore();
  const [currentTab, setCurrentTab] = useState<string>('landing');

  // Modal State for Quick Add Medicine
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [newMedForm, setNewMedForm] = useState({
    name: '',
    brand: '',
    genericName: '',
    strength: '500 mg',
    dosageForm: 'Tablet',
    category: 'General',
    isRxRequired: false,
    manufacturer: ''
  });

  const handleCreateMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    addMedicine(newMedForm);
    setIsAddMedModalOpen(false);
    setNewMedForm({
      name: '',
      brand: '',
      genericName: '',
      strength: '500 mg',
      dosageForm: 'Tablet',
      category: 'General',
      isRxRequired: false,
      manufacturer: ''
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {currentTab === 'landing' && <LandingPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'pricing' && <PricingPage />}

        {/* PATIENT VIEWS */}
        {role === 'PATIENT' && currentTab === 'search' && <PatientHome />}
        {role === 'PATIENT' && currentTab === 'patient-requests' && <PatientReservations />}

        {/* PHARMACY VIEWS */}
        {role === 'PHARMACY' && currentTab === 'dashboard' && (
          <PharmacyDashboard
            setCurrentTab={setCurrentTab}
            openAddPurchaseModal={() => setCurrentTab('purchases')}
            openAddMedicineModal={() => setIsAddMedModalOpen(true)}
          />
        )}
        {role === 'PHARMACY' && currentTab === 'inventory' && (
          <InventoryModule openAddPurchaseModal={() => setCurrentTab('purchases')} />
        )}
        {role === 'PHARMACY' && currentTab === 'purchases' && (
          <PurchaseModule onSuccessNavigate={() => setCurrentTab('inventory')} />
        )}
        {role === 'PHARMACY' && currentTab === 'billing' && <BillingModule />}
        {role === 'PHARMACY' && currentTab === 'suppliers' && <SupplierModule />}
        {role === 'PHARMACY' && currentTab === 'pharmacy-requests' && <PatientRequestsModule />}
        {role === 'PHARMACY' && currentTab === 'demand-analytics' && <DemandAnalyticsModule />}
        {role === 'PHARMACY' && currentTab === 'smart-insights' && <SmartInsightsModule />}
        {role === 'PHARMACY' && currentTab === 'pharmacy-profile' && <PharmacyProfile />}

        {/* ADMIN VIEWS */}
        {role === 'ADMIN' && (currentTab === 'admin-dashboard' || currentTab === 'admin-pharmacies') && (
          <AdminDashboard />
        )}
      </main>

      {/* QUICK ADD MEDICINE MODAL */}
      {isAddMedModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Pill className="w-5 h-5 text-teal-400" />
                <span>Add New Medicine to Catalog</span>
              </h3>
              <button onClick={() => setIsAddMedModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMedicine} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 uppercase mb-1">Full Medicine Name & Strength</label>
                <input
                  type="text"
                  placeholder="e.g. Paracetamol 500 mg"
                  value={newMedForm.name}
                  onChange={e => setNewMedForm({ ...newMedForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase mb-1">Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Crocin 500"
                    value={newMedForm.brand}
                    onChange={e => setNewMedForm({ ...newMedForm, brand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase mb-1">Generic / Salt Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Paracetamol"
                    value={newMedForm.genericName}
                    onChange={e => setNewMedForm({ ...newMedForm, genericName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase mb-1">Dosage Form</label>
                  <select
                    value={newMedForm.dosageForm}
                    onChange={e => setNewMedForm({ ...newMedForm, dosageForm: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Injection">Injection</option>
                    <option value="Ointment">Ointment</option>
                    <option value="Drops">Drops</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase mb-1">Strength</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 mg"
                    value={newMedForm.strength}
                    onChange={e => setNewMedForm({ ...newMedForm, strength: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase mb-1">Manufacturer</label>
                <input
                  type="text"
                  placeholder="e.g. GSK Consumer Healthcare"
                  value={newMedForm.manufacturer}
                  onChange={e => setNewMedForm({ ...newMedForm, manufacturer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <label className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMedForm.isRxRequired}
                  onChange={e => setNewMedForm({ ...newMedForm, isRxRequired: e.target.checked })}
                  className="w-4 h-4 text-teal-500 rounded focus:ring-0"
                />
                <span className="text-slate-300 font-medium">Prescription Required (Rx Only)</span>
              </label>

              <div className="pt-3 flex justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddMedModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-500 text-slate-950 font-bold rounded-xl hover:bg-teal-400"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

export default App;
