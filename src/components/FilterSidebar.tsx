import React from "react";
import { useWatch } from "../context/WatchContext";
import { WatchCategory } from "../types/watch";
import { CATEGORY_LABELS } from "../data/watches";
import {
  SlidersHorizontal,
  RotateCcw,
  Clock,
  Compass,
  Sparkles,
  Crown,
  Gauge,
  Anchor,
  Cpu,
  Award,
  Feather
} from "lucide-react";

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedMovement: string;
  setSelectedMovement: (mov: string) => void;
  selectedStrap: string;
  setSelectedStrap: (strap: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
  totalFilteredCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  setPriceRange,
  selectedMovement,
  setSelectedMovement,
  selectedStrap,
  setSelectedStrap,
  sortBy,
  setSortBy,
  resetFilters,
  totalFilteredCount
}) => {
  const { selectedCategory, setSelectedCategory, formatPKR } = useWatch();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "men":
        return <Compass className="w-3.5 h-3.5" />;
      case "women":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "luxury":
        return <Crown className="w-3.5 h-3.5" />;
      case "chronograph":
        return <Gauge className="w-3.5 h-3.5" />;
      case "sports":
        return <Anchor className="w-3.5 h-3.5" />;
      case "smart":
        return <Cpu className="w-3.5 h-3.5" />;
      case "casual-formal":
        return <Award className="w-3.5 h-3.5" />;
      case "minimalist":
        return <Feather className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="glass-panel rounded-lg p-5 space-y-6">
      
      {/* Top Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#38bdf8]" />
          <h3 className="font-serif text-sm font-medium text-white tracking-wide">
            Refine Calibers
          </h3>
          <span className="text-[11px] font-mono text-[#38bdf8] font-bold">
            ({totalFilteredCount})
          </span>
        </div>

        <button
          onClick={resetFilters}
          className="text-[11px] font-mono text-slate-400 hover:text-[#38bdf8] flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
          Watch Category
        </label>
        <div className="flex flex-col gap-1">
          {CATEGORY_LABELS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as WatchCategory)}
              className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-all text-left ${
                selectedCategory === cat.id
                  ? "bg-[#0066ff]/20 border border-[#38bdf8] text-white font-medium"
                  : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={selectedCategory === cat.id ? "text-[#38bdf8]" : "text-slate-500"}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{cat.label}</span>
              </span>
              {selectedCategory === cat.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
          Sort Timepieces
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-[#0a0e1a] border border-white/15 rounded px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#38bdf8]"
        >
          <option value="featured">Featured Masterpieces</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Customer Rating</option>
          <option value="newest">Newest Manufacture</option>
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="flex justify-between items-center text-xs font-mono">
          <label className="text-[10px] uppercase tracking-widest text-slate-400">Price Ceiling (PKR)</label>
          <span className="text-[#38bdf8] font-bold">{formatPKR(priceRange[1])}</span>
        </div>
        <input
          type="range"
          min="40000"
          max="400000"
          step="5000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-[#0066ff] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>₨ 40,000</span>
          <span>₨ 400,000+</span>
        </div>
      </div>

      {/* Movement Filter */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
          Movement Calibre
        </label>
        <select
          value={selectedMovement}
          onChange={(e) => setSelectedMovement(e.target.value)}
          className="w-full bg-[#0a0e1a] border border-white/15 rounded px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#38bdf8]"
        >
          <option value="all">All Movements</option>
          <option value="Automatic">Automatic Self-Winding</option>
          <option value="Tourbillon">Tourbillon / Hand-Wound</option>
          <option value="Quartz">Precision Swiss/Japanese Quartz</option>
          <option value="Smart">Quantum Smart CPU</option>
        </select>
      </div>

      {/* Strap Material Filter */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
          Strap & Clasp Material
        </label>
        <select
          value={selectedStrap}
          onChange={(e) => setSelectedStrap(e.target.value)}
          className="w-full bg-[#0a0e1a] border border-white/15 rounded px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#38bdf8]"
        >
          <option value="all">All Strap Types</option>
          <option value="Steel">Solid Steel / Oyster Link</option>
          <option value="Leather">Alligator & Calfskin Leather</option>
          <option value="Titanium">Aerospace Titanium</option>
          <option value="Rubber">FKM Fluororubber</option>
        </select>
      </div>

      {/* Pakistan Delivery Guarantee Badge */}
      <div className="p-3 rounded bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 space-y-1">
        <p className="text-white font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Express Pakistan Dispatch
        </p>
        <p className="text-[10px] text-slate-400 leading-normal">
          Available for next-day dispatch in Lahore, Karachi, and Islamabad with inspection on delivery.
        </p>
      </div>

    </div>
  );
};
