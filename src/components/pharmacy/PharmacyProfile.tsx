import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Store, CheckCircle, Save, Phone, Mail, MapPin, Clock, Truck, ShoppingBag, ShieldCheck } from 'lucide-react';

export const PharmacyProfile: React.FC = () => {
  const { activePharmacyId, pharmacies, updatePharmacyProfile } = useStore();
  const pharm = pharmacies.find(p => p.id === activePharmacyId) || pharmacies[0];

  const [formData, setFormData] = useState({
    name: pharm.name,
    ownerName: pharm.ownerName,
    phone: pharm.phone,
    email: pharm.email,
    address: pharm.address,
    city: pharm.city,
    state: pharm.state,
    pincode: pharm.pincode,
    openingHours: pharm.openingHours,
    isDeliveryAvailable: pharm.isDeliveryAvailable,
    isPickupAvailable: pharm.isPickupAvailable
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePharmacyProfile(pharm.id, formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <Store className="w-7 h-7 text-teal-400" />
            <span>Pharmacy Profile Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update store operational hours, location, and patient fulfillment options.
          </p>
        </div>

        {pharm.isVerified ? (
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-xl font-bold border border-emerald-500/30 flex items-center space-x-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>VERIFIED PHARMACY</span>
          </span>
        ) : (
          <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold border border-amber-500/30">
            Pending Verification
          </span>
        )}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          <span>Basic Store Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Pharmacy Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Owner / Pharmacist Name</label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Contact Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 pt-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-teal-400" />
          <span>Location & Hours</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Street Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={e => setFormData({ ...formData, state: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">PIN Code</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={e => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Opening Hours</label>
            <input
              type="text"
              value={formData.openingHours}
              onChange={e => setFormData({ ...formData, openingHours: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
              placeholder="e.g. 08:00 AM - 10:30 PM"
              required
            />
          </div>
        </div>

        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 pt-4 flex items-center space-x-2">
          <Truck className="w-5 h-5 text-teal-400" />
          <span>Patient Fulfillment Options</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex items-center space-x-3 bg-slate-950 p-4 rounded-xl border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDeliveryAvailable}
              onChange={e => setFormData({ ...formData, isDeliveryAvailable: e.target.checked })}
              className="w-5 h-5 text-teal-500 rounded focus:ring-0 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-white block">Home Delivery Available</span>
              <span className="text-xs text-slate-400">Can deliver medicines to nearby patient locations</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 bg-slate-950 p-4 rounded-xl border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPickupAvailable}
              onChange={e => setFormData({ ...formData, isPickupAvailable: e.target.checked })}
              className="w-5 h-5 text-teal-500 rounded focus:ring-0 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-white block">Store Counter Pickup</span>
              <span className="text-xs text-slate-400">Patients can reserve online and pick up at counter</span>
            </div>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
};
