import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, Plus, Trash2, CheckCircle, Search, User, Phone, CreditCard, ShieldAlert, ArrowRight } from 'lucide-react';
import { SaleItem, InventoryBatch } from '../../types';

export const BillingModule: React.FC = () => {
  const { activePharmacyId, batches, medicines, createSale, sales } = useStore();
  const pharmBatches = batches.filter(b => b.pharmacyId === activePharmacyId && b.quantity > 0 && b.status !== 'EXPIRED');

  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'UPI'>('UPI');

  // Cart State
  const [cart, setCart] = useState<SaleItem[]>([]);

  // Item Selector State
  const [selectedMedId, setSelectedMedId] = useState<string>(pharmBatches[0]?.medicineId || '');
  const [selectedBatchNo, setSelectedBatchNo] = useState<string>(pharmBatches[0]?.batchNumber || '');
  const [saleQty, setSaleQty] = useState<number>(3); // Default 3 for easy testing requirement!

  // Available batches for selected medicine
  const availableBatchesForMed = pharmBatches.filter(b => b.medicineId === selectedMedId);
  const currentBatchObj = availableBatchesForMed.find(b => b.batchNumber === selectedBatchNo) || availableBatchesForMed[0];

  const handleMedicineChange = (medId: string) => {
    setSelectedMedId(medId);
    const medBatches = pharmBatches.filter(b => b.medicineId === medId);
    if (medBatches.length > 0) {
      setSelectedBatchNo(medBatches[0].batchNumber);
    }
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBatchObj) {
      alert('No valid batch selected.');
      return;
    }

    const medObj = medicines.find(m => m.id === currentBatchObj.medicineId);

    if (saleQty > currentBatchObj.quantity) {
      alert(`Requested quantity (${saleQty}) exceeds available stock (${currentBatchObj.quantity}).`);
      return;
    }

    // Check if already in cart
    const existingIndex = cart.findIndex(i => i.medicineId === currentBatchObj.medicineId && i.batchNumber === currentBatchObj.batchNumber);

    if (existingIndex >= 0) {
      const existing = cart[existingIndex];
      const newTotalQty = existing.quantity + saleQty;
      if (newTotalQty > currentBatchObj.quantity) {
        alert(`Cannot add more. Total in cart (${newTotalQty}) exceeds available stock (${currentBatchObj.quantity}).`);
        return;
      }

      const updatedCart = [...cart];
      updatedCart[existingIndex] = {
        ...existing,
        quantity: newTotalQty,
        totalPrice: newTotalQty * existing.unitPrice
      };
      setCart(updatedCart);
    } else {
      const newItem: SaleItem = {
        medicineId: currentBatchObj.medicineId,
        medicineName: medObj?.name || 'Medicine',
        brand: medObj?.brand || '',
        batchNumber: currentBatchObj.batchNumber,
        quantity: saleQty,
        unitPrice: currentBatchObj.sellingPrice,
        totalPrice: saleQty * currentBatchObj.sellingPrice
      };
      setCart(prev => [...prev, newItem]);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirmSale = () => {
    if (cart.length === 0) {
      alert('Cart is empty.');
      return;
    }

    const result = createSale(customerName, customerPhone, cart, paymentMethod);
    if (result.success) {
      setCart([]);
      setCustomerName('Walk-in Customer');
      setCustomerPhone('');
    } else {
      alert(`Sale Failed: ${result.error}`);
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <ShoppingCart className="w-7 h-7 text-teal-400" />
            <span>Pharmacy POS Billing Counter</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Fast FEFO billing counter. Confirming a sale automatically decrements inventory stock.
          </p>
        </div>

        <div className="bg-teal-500/10 border border-teal-500/30 px-3.5 py-1.5 rounded-xl text-xs text-teal-300 font-mono flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-teal-400" />
          <span>Real-Time Stock Auto-Deduction</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Add Item to Cart Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <User className="w-4 h-4 text-teal-400" />
              <span>Customer Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone Number (Optional)</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Add Item Form */}
          <form onSubmit={handleAddToCart} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Select Medicine & Batch (FEFO Order)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Select Medicine from Stock</label>
                {pharmBatches.length === 0 ? (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs rounded-xl">
                    No active stock available in inventory. Please add a purchase entry first.
                  </div>
                ) : (
                  <select
                    value={selectedMedId}
                    onChange={e => handleMedicineChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500"
                  >
                    {Array.from(new Set(pharmBatches.map(b => b.medicineId))).map(medId => {
                      const med = medicines.find(m => m.id === medId);
                      const totalQty = pharmBatches.filter(b => b.medicineId === medId).reduce((a, b) => a + b.quantity, 0);
                      return (
                        <option key={medId} value={medId}>
                          {med?.name} ({med?.brand}) — Stock: {totalQty} units
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Select Batch (FEFO)</label>
                <select
                  value={selectedBatchNo}
                  onChange={e => setSelectedBatchNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-mono"
                >
                  {availableBatchesForMed.map(b => (
                    <option key={b.id} value={b.batchNumber}>
                      {b.batchNumber} (Exp: {b.expiryDate}) — {b.quantity} left @ ₹{b.sellingPrice}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Quantity to Sell</label>
                <input
                  type="number"
                  min="1"
                  max={currentBatchObj?.quantity || 1}
                  value={saleQty}
                  onChange={e => setSaleQty(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-extrabold text-teal-400"
                  required
                />
              </div>
            </div>

            {currentBatchObj && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>Unit Price: <strong className="text-white">₹{currentBatchObj.sellingPrice.toFixed(2)}</strong></span>
                <span>Subtotal: <strong className="text-teal-400">₹{(saleQty * currentBatchObj.sellingPrice).toFixed(2)}</strong></span>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={!currentBatchObj}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 font-bold text-xs rounded-xl transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item to Bill</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Billing Cart & Sale Confirmation */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShoppingCart className="w-4 h-4 text-teal-400" />
              <span>Current Cart ({cart.length})</span>
            </h2>

            {cart.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                Cart is empty. Select medicine and click "Add Item to Bill".
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{item.medicineName}</div>
                      <div className="text-slate-400">Batch: {item.batchNumber}</div>
                      <div className="text-teal-400 font-semibold mt-0.5">
                        {item.quantity} units × ₹{item.unitPrice} = ₹{item.totalPrice.toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(idx)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-1.5 text-xs font-bold rounded-lg border ${paymentMethod === 'UPI' ? 'bg-teal-500/20 text-teal-300 border-teal-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CASH')}
                    className={`py-1.5 text-xs font-bold rounded-lg border ${paymentMethod === 'CASH' ? 'bg-teal-500/20 text-teal-300 border-teal-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                  >
                    CASH
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`py-1.5 text-xs font-bold rounded-lg border ${paymentMethod === 'CARD' ? 'bg-teal-500/20 text-teal-300 border-teal-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                  >
                    CARD
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-white pt-2">
                <span>Total Amount:</span>
                <span className="text-teal-400 text-lg">₹{cartSubtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmSale}
              disabled={cart.length === 0}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 ${
                cart.length > 0
                  ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Confirm Sale & Auto-Deduct Stock (-{cart.reduce((a, b) => a + b.quantity, 0)} units)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
