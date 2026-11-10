import React, { useState } from "react";
import { Watch } from "../types/watch";
import { useWatch } from "../context/WatchContext";
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  MessageCircle,
  Sparkles,
  Check
} from "lucide-react";

interface ProductCardProps {
  watch: Watch;
}

export const ProductCard: React.FC<ProductCardProps> = ({ watch }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedWatch,
    formatPKR,
    generateWhatsAppLink,
    isLumeMode
  } = useWatch();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = isInWishlist(watch.id);
  const activeColor = watch.colors[selectedColorIndex]?.name;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateWhatsAppLink({ watch });
    window.open(url, "_blank");
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-panel rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#38bdf8]/40 hover:-translate-y-1 relative group"
    >
      {/* Top Bar: Badges & Wishlist */}
      <div className="flex items-center justify-between z-10 mb-2">
        {watch.badge ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold uppercase bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8]">
            {watch.badge}
          </span>
        ) : (
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">
            {watch.category}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(watch);
          }}
          className={`p-1.5 rounded transition-all ${
            isFavorite
              ? "text-rose-500 bg-rose-500/15 border border-rose-500/30"
              : "text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
          }`}
          title={isFavorite ? "Remove from Wishlist" : "Save to Wishlist"}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-rose-500" : ""}`} />
        </button>
      </div>

      {/* Product Image Frame */}
      <div
        onClick={() => setSelectedWatch(watch)}
        className="relative aspect-square w-full rounded bg-[#0a0e1a]/80 overflow-hidden cursor-pointer flex items-center justify-center p-3 mb-4"
      >
        <img
          src={watch.images[imageIndex] || watch.images[0]}
          alt={watch.name}
          className={`w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-105 ${
            isLumeMode ? "filter brightness-75 contrast-125" : ""
          }`}
          loading="lazy"
        />

        {/* Lume Mode Glow effect on card */}
        {isLumeMode && (
          <div className="absolute inset-0 bg-[#050814]/70 pointer-events-none flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border border-[#38bdf8]/40 lume-active flex items-center justify-center">
              <div className="w-1 h-10 bg-[#38bdf8] shadow-[0_0_10px_#38bdf8] absolute top-3"></div>
              <div className="w-1 h-8 bg-[#38bdf8] shadow-[0_0_10px_#38bdf8] absolute right-6 rotate-45"></div>
            </div>
          </div>
        )}

        {/* Multi-image thumbnail peek on hover */}
        {watch.images.length > 1 && isHovered && (
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1.5 bg-[#050814]/80 backdrop-blur-md py-1 px-2 rounded border border-white/10">
            {watch.images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setImageIndex(idx)}
                className={`w-6 h-6 rounded overflow-hidden border ${
                  imageIndex === idx ? "border-[#38bdf8]" : "border-white/20 opacity-60"
                }`}
              >
                <img src={img} alt="angle" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedWatch(watch);
          }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded bg-[#050814]/90 text-[#38bdf8] hover:text-white border border-white/10 transition-all duration-200"
          title="Quick View Details"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Watch Metadata */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {watch.brand}
          </span>
          <div className="flex items-center gap-1 text-amber-400 text-[11px] font-mono">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{watch.rating.toFixed(1)}</span>
            <span className="text-slate-500 text-[9px]">({watch.reviewsCount})</span>
          </div>
        </div>

        <h3
          onClick={() => setSelectedWatch(watch)}
          className="font-serif text-base font-medium text-white hover:text-[#38bdf8] cursor-pointer line-clamp-1 transition-colors"
          title={watch.name}
        >
          {watch.name}
        </h3>

        {/* Color swatches */}
        {watch.colors && watch.colors.length > 0 && (
          <div className="flex items-center gap-1.5 py-1">
            <span className="text-[10px] font-mono text-slate-500 mr-1">Finish:</span>
            {watch.colors.map((c, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? "border-[#38bdf8] scale-110 ring-1 ring-[#38bdf8]/40"
                    : "border-white/30 opacity-70"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-slate-400 ml-1 truncate max-w-[100px]">
              {watch.colors[selectedColorIndex]?.name}
            </span>
          </div>
        )}

        {/* Secondary Technical Specs Reveal */}
        <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between py-1 border-t border-white/5">
          <span>{watch.caseDiameter}</span>
          <span className="truncate max-w-[130px]">{watch.movement.split(" ")[0]} Calibre</span>
          <span>{watch.waterResistance.split(" ")[0]}</span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-base font-serif font-bold text-white tracking-wide">
              {formatPKR(watch.price)}
            </span>
            {watch.originalPrice && (
              <span className="text-xs text-slate-500 line-through ml-2">
                {formatPKR(watch.originalPrice)}
              </span>
            )}
          </div>
          {watch.discountPercentage && (
            <span className="text-[10px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10">
              Save {watch.discountPercentage}%
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10">
        <button
          onClick={() => addToCart(watch, 1, activeColor)}
          disabled={!watch.inStock || watch.stock <= 0}
          className="w-full py-2 px-2 rounded bg-[#0066ff] hover:bg-[#1a75ff] disabled:bg-slate-800 disabled:text-slate-500 text-white text-[11px] font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5 border border-[#38bdf8]/40 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add To Cart</span>
        </button>

        <button
          onClick={handleWhatsAppOrder}
          className="w-full py-2 px-2 rounded bg-[#050814] hover:bg-emerald-950/40 text-emerald-400 hover:text-emerald-300 text-[11px] font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5 border border-emerald-500/30 transition-all cursor-pointer"
          title="Direct WhatsApp Order"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
