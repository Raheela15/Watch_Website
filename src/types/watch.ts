export type WatchCategory = 
  | "all"
  | "men"
  | "women"
  | "luxury"
  | "sports"
  | "smart"
  | "casual-formal"
  | "minimalist"
  | "chronograph";

export interface Watch {
  id: string;
  name: string;
  brand: string;
  category: WatchCategory;
  price: number; // in PKR
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  movement: string; // e.g. "Swiss Automatic Calibre TW-90", "Japanese Quartz Chrono", etc.
  caseDiameter: string; // e.g. "41 mm"
  caseMaterial: string; // e.g. "904L Oystersteel"
  dialColor: string; // e.g. "Obsidian Sunburst Blue"
  strapMaterial: string; // e.g. "Solid Link Stainless Steel"
  waterResistance: string; // e.g. "300m / 1000ft"
  powerReserve: string; // e.g. "72 Hours"
  powerReservePercent: number; // for dynamic complications meter e.g. 85
  crystal: string; // e.g. "Double-Domed AR Sapphire"
  badge?: "Unique Piece" | "Best Seller" | "New Arrival" | "Certified Pre-Owned" | "Limited Edition";
  description: string;
  stock: number;
  inStock: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  lumeColor?: "cyan" | "green";
}

export interface CartItem {
  watch: Watch;
  quantity: number;
  selectedColor?: string;
}

export interface FilterState {
  searchQuery: string;
  category: WatchCategory;
  minPrice: number;
  maxPrice: number;
  movement: string;
  strapMaterial: string;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
}
