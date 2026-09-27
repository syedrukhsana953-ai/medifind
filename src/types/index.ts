export type UserRole = 'PHARMACY' | 'PATIENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  pharmacyId?: string;
  phone?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  openingHours: string;
  isDeliveryAvailable: boolean;
  isPickupAvailable: boolean;
  isVerified: boolean;
  lat: number;
  lng: number;
  rating?: number;
}

export interface Supplier {
  id: string;
  pharmacyId: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  gstNumber?: string;
}

export interface Medicine {
  id: string;
  name: string;
  brand: string;
  genericName: string;
  strength: string;
  dosageForm: string; // 'Tablet' | 'Syrup' | 'Capsule' | 'Injection' | 'Ointment' | 'Drops'
  category: string;
  isRxRequired: boolean;
  manufacturer?: string;
}

export type StockStatus = 'AVAILABLE' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'NEAR_EXPIRY' | 'EXPIRED';

export interface InventoryBatch {
  id: string;
  pharmacyId: string;
  medicineId: string;
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  supplierId: string;
  lastUpdated: string;
  status: StockStatus;
}

export interface PurchaseItemInput {
  medicineId: string;
  medicineName: string;
  brand: string;
  genericName: string;
  strength: string;
  dosageForm: string;
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
}

export interface Purchase {
  id: string;
  pharmacyId: string;
  supplierId: string;
  supplierName: string;
  invoiceNumber: string;
  purchaseDate: string;
  items: PurchaseItemInput[];
  totalAmount: number;
  createdAt: string;
}

export interface SaleItem {
  medicineId: string;
  medicineName: string;
  brand: string;
  batchNumber: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Sale {
  id: string;
  pharmacyId: string;
  invoiceNumber: string;
  saleDate: string;
  customerName?: string;
  customerPhone?: string;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: 'CASH' | 'CARD' | 'UPI';
  createdAt: string;
}

export type PrescriptionStatus = 'Pending Review' | 'Verified' | 'Needs Clarification' | 'Rejected' | 'Ready for Pickup';

export interface PatientRequest {
  id: string;
  patientName: string;
  patientPhone: string;
  patientLocation: string;
  medicineName: string;
  brand?: string;
  strength: string;
  quantity: number;
  prescriptionUrl?: string;
  prescriptionFileName?: string;
  prescriptionStatus: PrescriptionStatus;
  status: 'PENDING' | 'AVAILABLE' | 'NOT_AVAILABLE' | 'FULFILLED';
  assignedPharmacyId?: string;
  responseNote?: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  patientName: string;
  patientPhone: string;
  pharmacyId: string;
  pharmacyName: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  status: 'RESERVED' | 'PICKED_UP' | 'CANCELLED';
  pickupCode: string;
  createdAt: string;
}

export interface InventoryLog {
  id: string;
  pharmacyId: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  actionType: 'PURCHASE' | 'SALE' | 'ADJUSTMENT';
  quantityChange: number; // positive for addition, negative for deduction
  resultingQuantity: number;
  userId: string;
  timestamp: string;
}

export interface SearchLog {
  id: string;
  query: string;
  medicineName?: string;
  patientLocation: string;
  resultsCount: number;
  timestamp: string;
}
