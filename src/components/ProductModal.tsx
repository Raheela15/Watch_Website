import React, { useState } from "react";
import { useWatch } from "../context/WatchContext";
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  CheckCircle,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Maximize2
} from "lucide-react";
import { Watch } from "../types/watch";

export const ProductModal: React.FC = () => {
  const {
    selectedWatch,
    setSelectedWatch,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPKR,
    generateWhatsAppLink,
    watches,
    isLumeMode,
    toggleLumeMode,
    setIsCheckoutOpen
  } = useWatch();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerCity, setCustomerCity] = useState("Lahore");

  if (!selectedWatch) return null;

  const isFavorite = isInWishlist(selectedWatch.id);
  const chosenColor = selectedColor || selectedWatch.colors[0]?.name || "Standard";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleBuyNow = () => {
    addToCart(selectedWatch, quantity, chosenColor);
    setSelectedWatch(null);
    setIsCheckoutOpen(true);
  };

  const handleDirectWhatsApp = () => {
    const url = generateWhatsAppLink({
      watch: selectedWatch,
      customerName: customerName || undefined,
      city: customerCity || undefined
    });
    window.open(url, "_blank");
    setShowWhatsAppPrompt(false);
  };

  // Related watches
  const relatedWatches = watches
    .filter((w) => w.id !== selectedWatch.id && (w.category === selectedWatch.category || w.brand === selectedWatch.brand))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl glass-panel-elevated rounded-xl border border-white/15 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0e1a]/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-semibold">
              Haute Horlogerie Specification
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-mono text-slate-400">Ref: {selectedWatch.id}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Lume Simulator toggle on product view */}
            <button
              onClick={toggleLumeMode}
              className={`px-3 py-1 rounded text-[11px] font-mono uppercase flex items-center gap-1.5 transition-all ${
                isLumeMode
                  ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]"
                  : "bg-white/5 text-slate-300 hover:text-[#38bdf8] border border-white/10"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>{isLumeMode ? "Night Lume: Active" : "Simulate Dial Lume"}</span>
            </button>

            <button
              onClick={() => setSelectedWatch(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Gallery & Zoom */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Image Frame with Interactive Magnifier */}
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-square w-full rounded-lg bg-[#0a0e1a] border border-white/10 overflow-hidden cursor-crosshair flex items-center justify-center p-4 group select-none"
              >
                <img
                  src={selectedWatch.images[activeImageIndex] || selectedWatch.images[0]}
                  alt={selectedWatch.name}
                  className={`w-full h-full object-cover rounded transition-opacity duration-300 ${
                    isZoomed ? "opacity-0" : "opacity-100"
                  } ${isLumeMode ? "filter brightness-75 contrast-125" : ""}`}
                />

                {/* Magnifier Lens Zoom View */}
                {isZoomed && (
                  <div
                    className="absolute inset-0 bg-no-repeat rounded"
                    style={{
                      backgroundImage: `url(${selectedWatch.images[activeImageIndex] || selectedWatch.images[0]})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: "220%",
                      filter: isLumeMode ? "brightness(0.8) contrast(1.3)" : "none"
                    }}
                  />
                )}

                {/* Simulated Super-LumiNova dial glow */}
                {isLumeMode && (
                  <div className="absolute inset-0 bg-[#050814]/75 pointer-events-none flex items-center justify-center">
                    <div className="relative w-44 h-44 rounded-full border border-[#38bdf8]/50 lume-active flex items-center justify-center">
                      <div className="w-1.5 h-16 bg-[#38bdf8] shadow-[0_0_15px_#38bdf8] absolute top-5 rounded-full"></div>
                      <div className="w-1.5 h-12 bg-[#38bdf8] shadow-[0_0_15px_#38bdf8] absolute right-8 rotate-45 rounded-full"></div>
                      <div className="w-2.5 h-2.5 bg-[#38bdf8] rounded-full shadow-[0_0_20px_#38bdf8]"></div>
                    </div>
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-[#050814]/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[10px] font-mono text-slate-300 flex items-center gap-1.5 pointer-events-none">
                  <Maximize2 className="w-3 h-3 text-[#38bdf8]" />
                  <span>Hover to Zoom Lens</span>
                </div>
              </div>

              {/* Thumbnail Bar */}
              {selectedWatch.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {selectedWatch.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded overflow-hidden border transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? "border-[#38bdf8] ring-2 ring-[#0066ff]/40 scale-105"
                          : "border-white/15 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Power Reserve Complication Gauge */}
              <div className="p-4 rounded-lg bg-[#0a0e1a]/70 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                    Dynamic Complication Gauge
                  </span>
                  <span className="text-sm font-serif font-medium text-white">
                    Power Reserve: {selectedWatch.powerReserve}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-28 bg-slate-800 h-2 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="bg-gradient-to-r from-[#0066ff] to-[#38bdf8] h-full rounded-full transition-all duration-1000"
                      style={{ width: `${selectedWatch.powerReservePercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#38bdf8] font-bold">
                    {selectedWatch.powerReservePercent}%
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Watch Details, Horological Specs & Action */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Brand, Title & Ratings */}
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#38bdf8] font-semibold">
                  {selectedWatch.brand}
                </p>
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1">
                  {selectedWatch.name}
                </h1>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{selectedWatch.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({selectedWatch.reviewsCount} verified reviews)</span>
                  </div>
                  <span className="text-white/20">|</span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> In Stock ({selectedWatch.stock} available)
                  </span>
                </div>
              </div>

              {/* Price & Discount */}
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {formatPKR(selectedWatch.price)}
                  </span>
                  {selectedWatch.originalPrice && (
                    <span className="text-sm text-slate-500 line-through ml-3">
                      {formatPKR(selectedWatch.originalPrice)}
                    </span>
                  )}
                </div>
                {selectedWatch.discountPercentage && (
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    Save {selectedWatch.discountPercentage}% Now
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {selectedWatch.description}
              </p>

              {/* Color Finish Selection */}
              {selectedWatch.colors && selectedWatch.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase tracking-wider">Select Dial / Case Finish:</span>
                    <span className="text-[#38bdf8] font-medium">{chosenColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedWatch.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono transition-all ${
                          chosenColor === c.name
                            ? "border-[#38bdf8] bg-[#0066ff]/20 text-white"
                            : "border-white/15 bg-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/40"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Commerce Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/15 rounded bg-[#0a0e1a]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-slate-400 hover:text-white"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-mono text-sm text-white font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(selectedWatch.stock, q + 1))}
                      className="p-2.5 text-slate-400 hover:text-white"
                      disabled={quantity >= selectedWatch.stock}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(selectedWatch, quantity, chosenColor)}
                    className="flex-1 py-3 px-4 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedWatch)}
                    className={`p-3 rounded border transition-colors ${
                      isFavorite
                        ? "text-rose-500 bg-rose-500/15 border-rose-500/30"
                        : "text-slate-400 hover:text-white border-white/15 bg-white/5"
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500" : ""}`} />
                  </button>
                </div>

                {/* Primary Buy Now & WhatsApp Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 px-4 rounded bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-wider font-semibold border border-white/20 transition-all cursor-pointer"
                  >
                    Direct Checkout
                  </button>

                  <button
                    onClick={() => setShowWhatsAppPrompt(!showWhatsAppPrompt)}
                    className="w-full py-3 px-4 rounded bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 text-xs uppercase tracking-wider font-semibold border border-emerald-500/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>

                {/* WhatsApp Prefilled Inquiry Modal Drawer */}
                {showWhatsAppPrompt && (
                  <div className="p-4 rounded-lg bg-[#050814] border border-emerald-500/40 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Concierge Dispatch
                      </span>
                      <button
                        onClick={() => setShowWhatsAppPrompt(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Raheel / Tariq"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-[#101934] border border-white/15 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">City in Pakistan</label>
                        <input
                          type="text"
                          placeholder="Lahore, Karachi, Islamabad..."
                          value={customerCity}
                          onChange={(e) => setCustomerCity(e.target.value)}
                          className="w-full bg-[#101934] border border-white/15 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleDirectWhatsApp}
                      className="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Launch Official WhatsApp (+92 334 5678900)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Horological Spec Matrix */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-semibold">
                  Horological Spec Matrix
                </h4>

                <div className="divide-y divide-white/5 border border-white/10 rounded-lg overflow-hidden text-xs">
                  <div className="grid grid-cols-12 p-2.5 bg-white/[0.01]">
                    <span className="col-span-5 text-slate-400 font-mono text-[11px] uppercase">Movement / Calibre</span>
                    <span className="col-span-7 text-white font-medium">{selectedWatch.movement}</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 bg-white/[0.02]">
                    <span className="col-span-5 text-slate-400 font-mono text-[11px] uppercase">Case Dimensions</span>
                    <span className="col-span-7 text-white font-medium">{selectedWatch.caseDiameter}</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 bg-white/[0.01]">
                    <span className="col-span-5 text-slate-400 font-mono text-[11px] uppercase">Case Material</span>
                    <span className="col-span-7 text-white font-medium">{selectedWatch.caseMaterial}</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 bg-white/[0.02]">
                    <span className="col-span-5 text-slate-400 font-mono text-[11px] uppercase">Dial & Hands</span>
                    <span className="col-span-7 text-white font-medium">{selectedWatch.dialColor}</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 bg-white/[0.01]">
                    <span className="col-span-5 text-slate-400 font-mono text-[11px] uppercase">Sapphire Crystal</span>
                    <span className="col-span-7 text-white font-medium">{selectedWatch.crystal}</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 bg-white/[0.02]">
                    <span className="col-span-5 text-slate-400 font-mono text-[11px] uppercase">Strap & Clasp</span>
                    <span className="col-span-7 text-white font-medium">{selectedWatch.strapMaterial}</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 bg-white/[0.01]">
                    <span className="col-span-5 text-slate-400 font-mono text-[11px] uppercase">Water Resistance</span>
                    <span className="col-span-7 text-white font-medium">{selectedWatch.waterResistance}</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 bg-white/[0.02]">
                    <span className="col-span-5 text-slate-400 font-mono text-[11px] uppercase">Power Reserve</span>
                    <span className="col-span-7 text-[#38bdf8] font-medium">{selectedWatch.powerReserve}</span>
                  </div>
                </div>
              </div>

              {/* Delivery & Warranty Guarantees */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10 text-center">
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <Truck className="w-4 h-4 text-[#38bdf8] mx-auto mb-1" />
                  <span className="text-[10px] font-mono text-slate-300 block">Express Delivery</span>
                  <span className="text-[9px] text-slate-500">2-4 Days (Pakistan)</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <RotateCcw className="w-4 h-4 text-[#38bdf8] mx-auto mb-1" />
                  <span className="text-[10px] font-mono text-slate-300 block">7-Day Return</span>
                  <span className="text-[9px] text-slate-500">Hassle-Free Inspection</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <Shield className="w-4 h-4 text-[#38bdf8] mx-auto mb-1" />
                  <span className="text-[10px] font-mono text-slate-300 block">5-Year Warranty</span>
                  <span className="text-[9px] text-slate-500">Official True Watches</span>
                </div>
              </div>

            </div>
          </div>

          {/* Related / Recommended Timepieces */}
          {relatedWatches.length > 0 && (
            <div className="pt-8 border-t border-white/10 space-y-4">
              <h3 className="font-serif text-lg text-white">Complementary Calibers You May Admire</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedWatches.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedWatch(rel);
                      setActiveImageIndex(0);
                    }}
                    className="p-3 rounded-lg bg-[#0a0e1a]/80 border border-white/10 hover:border-[#38bdf8]/40 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-14 h-14 object-cover rounded bg-black shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono text-slate-400 uppercase">{rel.brand}</p>
                      <p className="font-serif text-xs text-white truncate">{rel.name}</p>
                      <p className="font-mono text-xs text-[#38bdf8] font-bold mt-0.5">{formatPKR(rel.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
