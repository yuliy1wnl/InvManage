export interface AdminInventoryItem {
  id: number;            // Unique ID
  name: string;          // Item name (e.g., "Intel i9-13900K")
  category: string;      // CPU or GPU
  quantity: number;      // Stock quantity
  unitPrice: number;     // Price per item in ₹
  supplier: string;      // Supplier or brand
  lastUpdated: Date;     // Last stock update
  imageUrl?: string;     // Optional: image of the component
}
