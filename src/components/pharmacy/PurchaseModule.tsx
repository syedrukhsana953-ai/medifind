import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Plus, Trash2, CheckCircle2, ArrowRight, Pill, FileText, Calendar, DollarSign, Layers } from 'lucide-react';
import { PurchaseItemInput } from '../../types';

interface PurchaseModuleProps {
  onSuccessNavigate?: () => void;
}

export const PurchaseModule: React.FC<PurchaseModuleProps> = ({ onSuccessNavigate }) => {
  const { activePharmacyId, suppliers, medicines, addPurchase, addMedicine, purchases } = useStore();
  const pharmSuppliers = suppliers.filter(s => s.pharmacyId === activePharmacyId);

  const [supplierId, setSupplierId] = useState(pharmSuppliers[0]?.id || '');
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().substring(0, 10));

  // Current Item Form State
  const [selectedMedId, setSelectedMedId] = useState(medicines[0]?.id || '');
  const selectedMed = medicines.find(m => m.id === selectedMedId) || medicines[0];

  const [batchNumber, setBatchNumber] = useState(`BATCH-${Date.now().toString().slice(-4)}`);
  const [mfgDate, setMfgDate] = useState('2026-01-01');
  const [expiryDate, setExpiryDate] = useState('2027-12-31');
  const [quantity, setQuantity] = useState<number>(50); // Default 50 for easy testing!
  const [purchasePrice, setPurchasePrice] = useState<number>(1.80);
  const [sellingPrice, setSellingPrice] = useState<number>(2.50);

  // Cart of Purchase Items
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemInput[]>([]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMed) return;

    const newItem: PurchaseItemInput = {
      medicineId: selectedMed.id,
      medicineName: selectedMed.name,
      brand: selectedMed.brand,
      genericName: selectedMed.genericName,
      strength: selectedMed.strength,
      dosageForm: selectedMed.dosageForm,
      batchNumber,
      mfgDate,
      expiryDate,
      quantity,
      purchasePrice,
      sellingPrice
    };

    setPurchaseItems(prev => [...prev, newItem]);
    
    // Reset batch form for next item
    setBatchNumber(`BATCH-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleRemoveItem = (index: number) => {
    setPurchaseItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSavePurchase = () => {
    if (!supplierId) {
      alert('Please select a supplier.');
      return;
    }
    if (purchaseItems.length === 0) {
      alert('Please add at least one purchase item to the list.');
      return;
    }

    addPurchase(supplierId, invoiceNumber, purchaseItems);
    setPurchaseItems([]);
    if (onSuccessNavigate) onSuccessNavigate();
  };

  const grandTotal = purchaseItems.reduce((sum, item) => sum + item.quantity * item.purchasePrice, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <ShoppingBag className="w-7 h-7 text-teal-400" />
            <span>Stock Purchase Entry</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            "Enter Once. Update Everywhere." Saving a purchase automatically increases batch stock & live availability.
          </p>
        </div>

        <div className="bg-teal-500/10 border border-teal-500/30 px-3.5 py-1.5 rounded-xl text-xs text-teal-300 font-mono flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>Auto Inventory Sync Enabled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Invoice & Item Entry Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Header details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Supplier & Invoice Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Select Supplier</label>
                <select
                  value={supplierId}
                  onChange={e => setSupplierId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                >
                  {pharmSuppliers.length === 0 ? (
                    <option value="">No suppliers added yet</option>
                  ) : (
                    pharmSuppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Purchase Date</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={e => setPurchaseDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Item Add Form */}
          <form onSubmit={handleAddItem} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Pill className="w-4 h-4 text-teal-400" />
              <span>Add Medicine Batch Item</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Select Medicine</label>
                <select
                  value={selectedMedId}
                  onChange={e => setSelectedMedId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
                >
                  {medicines.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.brand}) — {m.genericName} ({m.strength})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Batch Number</label>
                <input
                  type="text"
                  value={batchNumber}
                  onChange={e => setBatchNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Quantity (Units)</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Mfg Date</label>
                <input
                  type="date"
                  value={mfgDate}
                  onChange={e => setMfgDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Purchase Price / Unit (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={purchasePrice}
                  onChange={e => setPurchasePrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Selling Price / Unit (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={sellingPrice}
                  onChange={e => setSellingPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-bold text-teal-400"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 font-bold text-xs rounded-xl transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item to Purchase List</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Invoice Summary & Confirm Purchase */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Purchase Items Summary ({purchaseItems.length})</span>
            </h2>

            {purchaseItems.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No items added yet. Fill out the batch details and click "Add Item to Purchase List".
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {purchaseItems.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{item.medicineName}</div>
                      <div className="text-slate-400">Batch: {item.batchNumber} • Exp: {item.expiryDate}</div>
                      <div className="text-teal-400 mt-0.5">
                        {item.quantity} units @ ₹{item.purchasePrice} = ₹{(item.quantity * item.purchasePrice).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-slate-800 pt-4 space-y-2">
              <div className="flex justify-between text-sm font-extrabold text-white">
                <span>Grand Total Amount:</span>
                <span className="text-teal-400 text-lg">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSavePurchase}
              disabled={purchaseItems.length === 0}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 ${
                purchaseItems.length > 0
                  ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Save & Update Inventory (+{purchaseItems.reduce((a, b) => a + b.quantity, 0)} units)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
