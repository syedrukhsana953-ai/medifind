import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Package, Search, Filter, AlertTriangle, Clock, ShieldAlert, Edit3, ArrowUpDown, RefreshCw } from 'lucide-react';
import { InventoryBatch, StockStatus } from '../../types';

interface InventoryModuleProps {
  openAddPurchaseModal: () => void;
}

export const InventoryModule: React.FC<InventoryModuleProps> = ({ openAddPurchaseModal }) => {
  const { activePharmacyId, batches, medicines, adjustStock } = useStore();
  const pharmBatches = batches.filter(b => b.pharmacyId === activePharmacyId);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Adjust stock modal state
  const [adjustingBatch, setAdjustingBatch] = useState<InventoryBatch | null>(null);
  const [newQty, setNewQty] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>('Routine Audit Adjustment');

  // Filter batches
  const filteredBatches = pharmBatches.filter(batch => {
    const med = medicines.find(m => m.id === batch.medicineId);
    const medName = med?.name.toLowerCase() || '';
    const brand = med?.brand.toLowerCase() || '';
    const generic = med?.genericName.toLowerCase() || '';
    const batchNo = batch.batchNumber.toLowerCase();
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      medName.includes(query) || brand.includes(query) || generic.includes(query) || batchNo.includes(query);

    const matchesStatus = statusFilter === 'ALL' || batch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenAdjust = (batch: InventoryBatch) => {
    setAdjustingBatch(batch);
    setNewQty(batch.quantity);
  };

  const handleSaveAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (adjustingBatch) {
      adjustStock(adjustingBatch.id, newQty, adjustReason);
      setAdjustingBatch(null);
    }
  };

  const renderStatusBadge = (status: StockStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-500/30">AVAILABLE</span>;
      case 'LOW_STOCK':
        return <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-bold border border-amber-500/30">LOW STOCK</span>;
      case 'OUT_OF_STOCK':
        return <span className="bg-slate-800 text-slate-400 text-xs px-2.5 py-1 rounded-full font-bold border border-slate-700">OUT OF STOCK</span>;
      case 'NEAR_EXPIRY':
        return <span className="bg-orange-500/20 text-orange-400 text-xs px-2.5 py-1 rounded-full font-bold border border-orange-500/30 flex items-center space-x-1"><Clock className="w-3 h-3" /><span>NEAR EXPIRY</span></span>;
      case 'EXPIRED':
        return <span className="bg-rose-500/20 text-rose-400 text-xs px-2.5 py-1 rounded-full font-bold border border-rose-500/30 flex items-center space-x-1"><ShieldAlert className="w-3 h-3" /><span>EXPIRED</span></span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <Package className="w-7 h-7 text-teal-400" />
            <span>Stock Inventory & Batch FEFO Tracking</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time batch-level quantities, selling prices, and FEFO expiry warnings.
          </p>
        </div>

        <button
          onClick={openAddPurchaseModal}
          className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all"
        >
          + Add Purchase Stock
        </button>
      </div>

      {/* Instant Search & Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search medicine, brand, generic, or batch..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-white text-xs focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Stock Statuses</option>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="LOW_STOCK">LOW STOCK</option>
            <option value="NEAR_EXPIRY">NEAR EXPIRY</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="OUT_OF_STOCK">OUT OF STOCK</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Medicine & Brand</th>
                <th className="p-4">Generic / Salt</th>
                <th className="p-4">Form / Strength</th>
                <th className="p-4">Batch #</th>
                <th className="p-4 text-right">Quantity</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4 text-right">Selling Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredBatches.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    No inventory items match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBatches.map(batch => {
                  const med = medicines.find(m => m.id === batch.medicineId);
                  return (
                    <tr key={batch.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div>{med?.name || 'Medicine'}</div>
                        <div className="text-[11px] text-teal-400 font-normal">{med?.brand}</div>
                      </td>

                      <td className="p-4 text-slate-300">{med?.genericName || '-'}</td>

                      <td className="p-4 text-slate-400">
                        {med?.dosageForm} ({med?.strength})
                      </td>

                      <td className="p-4 font-mono text-slate-300">{batch.batchNumber}</td>

                      <td className="p-4 text-right font-extrabold text-white text-sm">
                        {batch.quantity}
                      </td>

                      <td className="p-4 font-mono text-slate-300">{batch.expiryDate}</td>

                      <td className="p-4 text-right font-bold text-teal-400">
                        ₹{batch.sellingPrice.toFixed(2)}
                      </td>

                      <td className="p-4">{renderStatusBadge(batch.status)}</td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleOpenAdjust(batch)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] rounded-lg border border-slate-700 flex items-center space-x-1 mx-auto"
                        >
                          <Edit3 className="w-3 h-3 text-teal-400" />
                          <span>Audit</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {adjustingBatch && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Stock Audit Adjustment</h3>
            <p className="text-xs text-slate-400">
              Manually correct physical shelf count for batch <strong>{adjustingBatch.batchNumber}</strong>.
            </p>

            <form onSubmit={handleSaveAdjust} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">New Physical Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={newQty}
                  onChange={e => setNewQty(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Reason for Adjustment</label>
                <select
                  value={adjustReason}
                  onChange={e => setAdjustReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value="Routine Audit Adjustment">Routine Physical Shelf Count Audit</option>
                  <option value="Damaged Stock Removal">Damaged Package Removal</option>
                  <option value="Expired Stock Removal">Expired Batch Disposal</option>
                  <option value="Supplier Return">Returned to Supplier</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAdjustingBatch(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-teal-400"
                >
                  Save Stock Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
