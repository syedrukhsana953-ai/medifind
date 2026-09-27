import { Pharmacy, Supplier, Medicine, InventoryBatch, Purchase, Sale, PatientRequest, Reservation, InventoryLog, SearchLog } from '../types';

export const INITIAL_PHARMACIES: Pharmacy[] = [
  {
    id: 'pharm-1',
    name: 'Sri Sai Medicals',
    ownerName: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'srisai@medifind.demo',
    address: 'Door 12-4-8, Main Road, Koti',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    openingHours: '08:00 AM - 10:30 PM',
    isDeliveryAvailable: true,
    isPickupAvailable: true,
    isVerified: true,
    lat: 17.3850,
    lng: 78.4867,
    rating: 4.8
  },
  {
    id: 'pharm-2',
    name: 'Vijaya Pharmacy',
    ownerName: 'Venkatesh Rao',
    phone: '+91 98490 11223',
    email: 'vijaya@medifind.demo',
    address: 'Plot 45, Himayatnagar Main Rd',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500029',
    openingHours: '07:30 AM - 11:00 PM',
    isDeliveryAvailable: true,
    isPickupAvailable: true,
    isVerified: true,
    lat: 17.4000,
    lng: 78.4800,
    rating: 4.6
  },
  {
    id: 'pharm-3',
    name: 'Lakshmi Medical & General Stores',
    ownerName: 'Srinivasulu M.',
    phone: '+91 99887 76655',
    email: 'lakshmi@medifind.demo',
    address: 'Shop 3, SR Nagar X Roads',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500038',
    openingHours: '08:30 AM - 10:00 PM',
    isDeliveryAvailable: false,
    isPickupAvailable: true,
    isVerified: true,
    lat: 17.4400,
    lng: 78.4480,
    rating: 4.7
  },
  {
    id: 'pharm-4',
    name: 'City Care Pharmacy',
    ownerName: 'Dr. Ananya Reddy',
    phone: '+91 91234 56789',
    email: 'citycare@medifind.demo',
    address: '1st Floor, Jubilee Hills Checkpost',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    openingHours: '24 Hours Open',
    isDeliveryAvailable: true,
    isPickupAvailable: true,
    isVerified: true,
    lat: 17.4300,
    lng: 78.4100,
    rating: 4.9
  },
  {
    id: 'pharm-5',
    name: 'HealthPlus Medicals',
    ownerName: 'Mohammed Aslam',
    phone: '+91 97000 88990',
    email: 'healthplus@medifind.demo',
    address: 'Near Government Hospital, Mehdipatnam',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500028',
    openingHours: '08:00 AM - 11:30 PM',
    isDeliveryAvailable: true,
    isPickupAvailable: true,
    isVerified: true,
    lat: 17.3910,
    lng: 78.4430,
    rating: 4.5
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'supp-1',
    pharmacyId: 'pharm-1',
    name: 'Apollo Pharma Distributors',
    contactPerson: 'Suresh Verma',
    phone: '+91 98480 99887',
    email: 'orders@apollodist.demo',
    address: 'IDA Uppal, Phase 2, Hyderabad',
    gstNumber: '36AABCA1234F1ZB'
  },
  {
    id: 'supp-2',
    pharmacyId: 'pharm-1',
    name: 'MedPlus Wholesale Depot',
    contactPerson: 'Kiran Kumar',
    phone: '+91 98481 22334',
    email: 'supply@medplusdepot.demo',
    address: 'Kukatpally Industrial Estate, Hyderabad',
    gstNumber: '36AAACM5678K1ZC'
  },
  {
    id: 'supp-3',
    pharmacyId: 'pharm-2',
    name: 'Deccan Pharma Agencies',
    contactPerson: 'Pradeep N.',
    phone: '+91 91000 44556',
    email: 'deccanpharma@demo.com',
    address: 'Abids Road, Hyderabad',
    gstNumber: '36AABCD9012J1ZD'
  }
];

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-para-500',
    name: 'Paracetamol 500 mg',
    brand: 'Crocin 500',
    genericName: 'Paracetamol',
    strength: '500 mg',
    dosageForm: 'Tablet',
    category: 'Analgesic & Antipyretic',
    isRxRequired: false,
    manufacturer: 'GSK Consumer Healthcare'
  },
  {
    id: 'med-dolo-650',
    name: 'Dolo 650 mg',
    brand: 'Dolo 650',
    genericName: 'Paracetamol',
    strength: '650 mg',
    dosageForm: 'Tablet',
    category: 'Analgesic & Antipyretic',
    isRxRequired: false,
    manufacturer: 'Micro Labs Ltd'
  },
  {
    id: 'med-amox-500',
    name: 'Amoxicillin 500 mg',
    brand: 'Mox 500',
    genericName: 'Amoxicillin Trihydrate',
    strength: '500 mg',
    dosageForm: 'Capsule',
    category: 'Antibiotic',
    isRxRequired: true,
    manufacturer: 'Ranbaxy / Sun Pharma'
  },
  {
    id: 'med-azith-500',
    name: 'Azithromycin 500 mg',
    brand: 'Azee 500',
    genericName: 'Azithromycin',
    strength: '500 mg',
    dosageForm: 'Tablet',
    category: 'Antibiotic',
    isRxRequired: true,
    manufacturer: 'Cipla Ltd'
  },
  {
    id: 'med-metf-500',
    name: 'Metformin 500 mg SR',
    brand: 'Glycomet 500 SR',
    genericName: 'Metformin Hydrochloride',
    strength: '500 mg',
    dosageForm: 'Tablet',
    category: 'Antidiabetic',
    isRxRequired: true,
    manufacturer: 'USV Pvt Ltd'
  },
  {
    id: 'med-ceti-10',
    name: 'Cetirizine 10 mg',
    brand: 'Cetzine 10',
    genericName: 'Cetirizine Hydrochloride',
    strength: '10 mg',
    dosageForm: 'Tablet',
    category: 'Antihistamine / Allergy',
    isRxRequired: false,
    manufacturer: 'GSK'
  },
  {
    id: 'med-panto-40',
    name: 'Pantoprazole 40 mg',
    brand: 'Pan 40',
    genericName: 'Pantoprazole Sodium',
    strength: '40 mg',
    dosageForm: 'Tablet',
    category: 'Gastrointestinal / Antacid',
    isRxRequired: false,
    manufacturer: 'Alkem Laboratories'
  },
  {
    id: 'med-ator-10',
    name: 'Atorvastatin 10 mg',
    brand: 'Atorva 10',
    genericName: 'Atorvastatin Calcium',
    strength: '10 mg',
    dosageForm: 'Tablet',
    category: 'Cardiovascular / Statin',
    isRxRequired: true,
    manufacturer: 'Zydus Cadila'
  },
  {
    id: 'med-telmi-40',
    name: 'Telmisartan 40 mg',
    brand: 'Telma 40',
    genericName: 'Telmisartan',
    strength: '40 mg',
    dosageForm: 'Tablet',
    category: 'Antihypertensive',
    isRxRequired: true,
    manufacturer: 'Glenmark Pharmaceuticals'
  }
];

export const INITIAL_INVENTORY_BATCHES: InventoryBatch[] = [
  // Sri Sai Medicals Batches
  {
    id: 'batch-101',
    pharmacyId: 'pharm-1',
    medicineId: 'med-para-500',
    batchNumber: 'PCM-2026-A1',
    mfgDate: '2026-01-10',
    expiryDate: '2027-12-31',
    quantity: 50, // Initial demonstration stock
    purchasePrice: 1.80,
    sellingPrice: 2.50,
    supplierId: 'supp-1',
    lastUpdated: new Date(Date.now() - 5 * 60000).toISOString(),
    status: 'AVAILABLE'
  },
  {
    id: 'batch-102',
    pharmacyId: 'pharm-1',
    medicineId: 'med-dolo-650',
    batchNumber: 'DLO-2025-B4',
    mfgDate: '2025-06-15',
    expiryDate: '2027-06-30',
    quantity: 120,
    purchasePrice: 2.20,
    sellingPrice: 3.50,
    supplierId: 'supp-1',
    lastUpdated: new Date(Date.now() - 25 * 60000).toISOString(),
    status: 'AVAILABLE'
  },
  {
    id: 'batch-103',
    pharmacyId: 'pharm-1',
    medicineId: 'med-amox-500',
    batchNumber: 'AMX-2025-C9',
    mfgDate: '2025-03-01',
    expiryDate: '2026-10-15', // Near expiry
    quantity: 18,
    purchasePrice: 6.50,
    sellingPrice: 9.00,
    supplierId: 'supp-2',
    lastUpdated: new Date(Date.now() - 120 * 60000).toISOString(),
    status: 'NEAR_EXPIRY'
  },
  {
    id: 'batch-104',
    pharmacyId: 'pharm-1',
    medicineId: 'med-azith-500',
    batchNumber: 'AZI-2024-X2',
    mfgDate: '2024-05-10',
    expiryDate: '2026-04-01', // Expired
    quantity: 10,
    purchasePrice: 18.00,
    sellingPrice: 24.00,
    supplierId: 'supp-2',
    lastUpdated: new Date(Date.now() - 24 * 3600000).toISOString(),
    status: 'EXPIRED'
  },
  {
    id: 'batch-105',
    pharmacyId: 'pharm-1',
    medicineId: 'med-metf-500',
    batchNumber: 'GLY-2026-M1',
    mfgDate: '2026-02-01',
    expiryDate: '2028-02-01',
    quantity: 8, // Low stock
    purchasePrice: 2.00,
    sellingPrice: 3.00,
    supplierId: 'supp-1',
    lastUpdated: new Date(Date.now() - 15 * 60000).toISOString(),
    status: 'LOW_STOCK'
  },

  // Vijaya Pharmacy Batches
  {
    id: 'batch-201',
    pharmacyId: 'pharm-2',
    medicineId: 'med-para-500',
    batchNumber: 'CRO-2025-V1',
    mfgDate: '2025-11-01',
    expiryDate: '2027-11-01',
    quantity: 8,
    purchasePrice: 1.85,
    sellingPrice: 2.50,
    supplierId: 'supp-3',
    lastUpdated: new Date(Date.now() - 7 * 60000).toISOString(),
    status: 'AVAILABLE'
  },
  {
    id: 'batch-202',
    pharmacyId: 'pharm-2',
    medicineId: 'med-dolo-650',
    batchNumber: 'DLO-2026-V8',
    mfgDate: '2026-01-20',
    expiryDate: '2028-01-20',
    quantity: 95,
    purchasePrice: 2.25,
    sellingPrice: 3.50,
    supplierId: 'supp-3',
    lastUpdated: new Date(Date.now() - 30 * 60000).toISOString(),
    status: 'AVAILABLE'
  },

  // City Care Pharmacy Batches
  {
    id: 'batch-401',
    pharmacyId: 'pharm-4',
    medicineId: 'med-para-500',
    batchNumber: 'PCM-CITY-01',
    mfgDate: '2025-08-01',
    expiryDate: '2027-08-01',
    quantity: 0, // Out of stock
    purchasePrice: 1.80,
    sellingPrice: 2.50,
    supplierId: 'supp-1',
    lastUpdated: new Date(Date.now() - 5 * 60000).toISOString(),
    status: 'OUT_OF_STOCK'
  }
];

export const INITIAL_PURCHASES: Purchase[] = [
  {
    id: 'pur-101',
    pharmacyId: 'pharm-1',
    supplierId: 'supp-1',
    supplierName: 'Apollo Pharma Distributors',
    invoiceNumber: 'INV-2026-0042',
    purchaseDate: '2026-09-20',
    totalAmount: 90.00,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    items: [
      {
        medicineId: 'med-para-500',
        medicineName: 'Paracetamol 500 mg',
        brand: 'Crocin 500',
        genericName: 'Paracetamol',
        strength: '500 mg',
        dosageForm: 'Tablet',
        batchNumber: 'PCM-2026-A1',
        mfgDate: '2026-01-10',
        expiryDate: '2027-12-31',
        quantity: 50,
        purchasePrice: 1.80,
        sellingPrice: 2.50
      }
    ]
  }
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'sale-101',
    pharmacyId: 'pharm-1',
    invoiceNumber: 'POS-2026-8801',
    saleDate: new Date(Date.now() - 2 * 3600000).toISOString(),
    customerName: 'Anil Kumar',
    customerPhone: '+91 99000 11223',
    totalAmount: 35.00,
    paymentMethod: 'UPI',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    items: [
      {
        medicineId: 'med-dolo-650',
        medicineName: 'Dolo 650 mg',
        brand: 'Dolo 650',
        batchNumber: 'DLO-2025-B4',
        quantity: 10,
        unitPrice: 3.50,
        totalPrice: 35.00
      }
    ]
  }
];

export const INITIAL_PATIENT_REQUESTS: PatientRequest[] = [
  {
    id: 'req-1',
    patientName: 'Priya Sharma',
    patientPhone: '+91 98111 22334',
    patientLocation: 'Koti, Hyderabad (0.8 km)',
    medicineName: 'Paracetamol 500 mg',
    strength: '500 mg',
    quantity: 10,
    prescriptionUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=60',
    prescriptionFileName: 'dr_sharma_prescription_sep26.pdf',
    prescriptionStatus: 'Pending Review',
    status: 'PENDING',
    assignedPharmacyId: 'pharm-1',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString()
  },
  {
    id: 'req-2',
    patientName: 'Vikram Mehta',
    patientPhone: '+91 97222 33445',
    patientLocation: 'Himayatnagar, Hyderabad (2.3 km)',
    medicineName: 'Azithromycin 500 mg',
    strength: '500 mg',
    quantity: 3,
    prescriptionUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=60',
    prescriptionFileName: 'chest_specialist_rx.jpg',
    prescriptionStatus: 'Verified',
    status: 'AVAILABLE',
    assignedPharmacyId: 'pharm-1',
    responseNote: 'Prescription verified. Ready for pickup at counter #2.',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString()
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    patientName: 'Rahul Verma',
    patientPhone: '+91 99123 45678',
    pharmacyId: 'pharm-1',
    pharmacyName: 'Sri Sai Medicals',
    medicineId: 'med-dolo-650',
    medicineName: 'Dolo 650 mg',
    quantity: 15,
    status: 'RESERVED',
    pickupCode: 'MF-8821',
    createdAt: new Date(Date.now() - 30 * 60000).toISOString()
  }
];

export const INITIAL_INVENTORY_LOGS: InventoryLog[] = [
  {
    id: 'log-1',
    pharmacyId: 'pharm-1',
    medicineId: 'med-para-500',
    medicineName: 'Paracetamol 500 mg',
    batchNumber: 'PCM-2026-A1',
    actionType: 'PURCHASE',
    quantityChange: 50,
    resultingQuantity: 50,
    userId: 'usr-pharmacist-1',
    timestamp: new Date(Date.now() - 7 * 86400000).toISOString()
  }
];

export const INITIAL_SEARCH_LOGS: SearchLog[] = [
  { id: 's-1', query: 'Paracetamol 500 mg', medicineName: 'Paracetamol 500 mg', patientLocation: 'Koti', resultsCount: 2, timestamp: new Date(Date.now() - 10 * 60000).toISOString() },
  { id: 's-2', query: 'Dolo 650', medicineName: 'Dolo 650 mg', patientLocation: 'Jubilee Hills', resultsCount: 3, timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
  { id: 's-3', query: 'Azithromycin', medicineName: 'Azithromycin 500 mg', patientLocation: 'Mehdipatnam', resultsCount: 1, timestamp: new Date(Date.now() - 40 * 60000).toISOString() }
];
