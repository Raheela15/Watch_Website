import React from "react";
import { useWatch } from "../context/WatchContext";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle,
  Eye,
  Award
} from "lucide-react";

export const Hero: React.FC = () => {
  const { watches, setSelectedWatch, addToCart, setActiveView, setSelectedCategory, formatPKR, isLumeMode } = useWatch();

  // Flagship timepiece
  const flagship = watches.find((w) => w.id === "tw-chronos-01") || watches[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-white/5">
      {/* Horological Ambient Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066ff]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#38bdf8]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs tracking-[0.18em] uppercase text-[#38bdf8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>True Watches • Geneva & Lahore Atelier</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#dfe1f4] leading-[1.12]">
              More Than Time. <br />
              <span className="italic font-light text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-[#dfe1f4] to-[#38bdf8]">
                It’s a Lifestyle.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#94a3b8] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              True Watches creates and curates sovereign timepieces engineered with Swiss mechanical calibers, 
              scratchproof sapphire crystals, and handcrafted straps. Built for those who craft their own destiny.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveView("shop");
                  setSelectedCategory("all");
                  window.scrollTo({ top: 750, behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 border border-[#38bdf8]/40 shadow-[0_0_25px_rgba(0,102,255,0.4)] hover:shadow-[0_0_35px_rgba(0,102,255,0.6)] transition-all cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveView("shop");
                  setSelectedCategory("luxury");
                  window.scrollTo({ top: 750, behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-white/5 hover:bg-white/10 text-[#dfe1f4] hover:text-white text-xs uppercase tracking-[0.15em] font-semibold border border-white/15 hover:border-white/30 transition-all cursor-pointer"
              >
                Explore Collection
              </button>
            </div>

            {/* Quick Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl font-serif text-white font-medium">28,800</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8c90a1]">Vibrations / Hr</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-white font-medium">904L</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8c90a1]">Oystersteel</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[#38bdf8] font-medium">5-Year</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8c90a1]">Warranty</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Flagship Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel-elevated rounded-lg p-6 relative overflow-hidden group">
              
              {/* Corner Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8] text-[10px] uppercase font-mono tracking-widest font-semibold flex items-center gap-1.5">
                  <Award className="w-3 h-3" />
                  Flagship Masterpiece
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> In Stock ({flagship.stock} units)
                </span>
              </div>

              {/* Watch Macro Photography Frame */}
              <div className="relative aspect-square rounded overflow-hidden bg-[#0a0e1a] mb-6 flex items-center justify-center p-4">
                <img
                  src={flagship.images[0]}
                  alt={flagship.name}
                  className={`w-full h-full object-cover rounded transition-transform duration-700 group-hover:scale-105 ${
                    isLumeMode ? "filter brightness-75 contrast-125 hue-rotate-15" : ""
                  }`}
                />
                
                {/* Lume Simulation Overlay if active */}
                {isLumeMode && (
                  <div className="absolute inset-0 bg-[#050814]/70 pointer-events-none flex items-center justify-center">
                    <div className="relative w-48 h-48 rounded-full border-2 border-[#38bdf8]/40 lume-active flex items-center justify-center">
                      <div className="w-1.5 h-20 bg-[#38bdf8] shadow-[0_0_15px_#38bdf8] absolute top-4 rounded-full"></div>
                      <div className="w-1.5 h-16 bg-[#38bdf8] shadow-[0_0_15px_#38bdf8] absolute right-8 rounded-full rotate-45"></div>
                      <div className="w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_20px_#38bdf8]"></div>
                    </div>
                  </div>
                )}

                {/* Quick inspect button */}
                <button
                  onClick={() => setSelectedWatch(flagship)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-[#0a0e1a]/90 hover:bg-[#0066ff] text-white text-xs font-medium border border-white/20 flex items-center gap-1.5 transition-all shadow-lg"
                >
                  <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Inspect Spec</span>
                </button>
              </div>

              {/* Watch Details */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-mono tracking-widest text-[#8c90a1] uppercase">{flagship.brand}</p>
                    <h3 className="font-serif text-xl font-medium text-white">{flagship.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-serif font-bold text-white">{formatPKR(flagship.price)}</p>
                    {flagship.originalPrice && (
                      <p className="text-xs text-slate-500 line-through">{formatPKR(flagship.originalPrice)}</p>
                    )}
                  </div>
                </div>

                {/* Complications & Caliber specs mini-matrix */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono py-2 border-y border-white/10 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Calibre</span>
                    TW-990 Automatic
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Water Proof</span>
                    200m / 660ft
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => addToCart(flagship)}
                    className="w-full py-2.5 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs uppercase tracking-wider font-semibold border border-[#38bdf8]/40 transition-colors"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => setSelectedWatch(flagship)}
                    className="w-full py-2.5 rounded bg-white/5 hover:bg-white/10 text-[#dfe1f4] text-xs uppercase tracking-wider font-semibold border border-white/15 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Value Pillars Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-white/10">
          <div className="flex items-start gap-3.5 p-4 rounded bg-white/[0.02] border border-white/5">
            <ShieldCheck className="w-6 h-6 text-[#38bdf8] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">100% Certified Authentic</h4>
              <p className="text-xs text-slate-400 mt-0.5">Every caliber tested on Witschi timing machines with certificate.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded bg-white/[0.02] border border-white/5">
            <Truck className="w-6 h-6 text-[#38bdf8] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Free Nationwide Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Fully insured express courier across all cities in Pakistan.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded bg-white/[0.02] border border-white/5">
            <RotateCcw className="w-6 h-6 text-[#38bdf8] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">7-Day Inspection</h4>
              <p className="text-xs text-slate-400 mt-0.5">Open & verify package upon receipt before final payment.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded bg-white/[0.02] border border-white/5">
            <Award className="w-6 h-6 text-[#38bdf8] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">5-Year Warranty</h4>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive mechanical warranty and free servicing.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
