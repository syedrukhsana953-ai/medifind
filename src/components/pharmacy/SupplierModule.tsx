import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, Plus, Edit, Trash2, Phone, Mail, MapPin, FileText, X, Check } from 'lucide-react';
import { Supplier } from '../../types';

export const SupplierModule: React.FC = () => {
  const { activePharmacyId, suppliers, addSupplier, updateSupplier, deleteSupplier } = useStore();
  const pharmSuppliers = suppliers.filter(s => s.pharmacyId === activePharmacyId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    gstNumber: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      gstNumber: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (supp: Supplier) => {
    setEditingId(supp.id);
    setFormData({
      name: supp.name,
      contactPerson: supp.contactPerson,
      phone: supp.phone,
      email: supp.email,
      address: supp.address,
      gstNumber: supp.gstNumber || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateSupplier(editingId, formData);
    } else {
      addSupplier({
        pharmacyId: activePharmacyId,
        ...formData
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <Truck className="w-7 h-7 text-teal-400" />
            <span>Supplier Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage wholesale distributors and pharmaceutical vendors.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* Supplier Grid */}
      {pharmSuppliers.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <Truck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Suppliers Added Yet</h3>
          <p className="text-slate-400 text-sm mb-4">Add your wholesale distributors to link purchase entries.</p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-teal-500 text-slate-950 font-bold text-xs rounded-lg"
          >
            Add First Supplier
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmSuppliers.map(supp => (
            <div key={supp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{supp.name}</h3>
                    <span className="text-xs text-teal-400 font-medium">Contact: {supp.contactPerson}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(supp)}
                      className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove supplier "${supp.name}"?`)) {
                          deleteSupplier(supp.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 rounded-lg hover:bg-slate-700"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{supp.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{supp.email}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{supp.address}</span>
                  </div>

                  {supp.gstNumber && (
                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-800 text-slate-400 font-mono">
                      <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>GST: {supp.gstNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingId ? 'Edit Supplier Details' : 'Add New Wholesale Supplier'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Supplier / Agency Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">GST Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={e => setFormData({ ...formData, gstNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-mono"
                    placeholder="e.g. 36AABCA1234F1ZB"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Wholesale Depot Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-teal-400"
                >
                  {editingId ? 'Save Changes' : 'Create Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
