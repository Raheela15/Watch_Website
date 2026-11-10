import React from "react";
import { useWatch } from "../context/WatchContext";
import { X, Heart, ShoppingBag, Trash2, MessageCircle } from "lucide-react";

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    removeFromWishlist,
    addToCart,
    formatPKR,
    generateWhatsAppLink,
    setActiveView
  } = useWatch();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full glass-panel-elevated border-l border-white/10 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0e1a]/80">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="font-serif text-lg font-medium text-white tracking-wide">
              Saved Masterpieces
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-mono font-bold">
              {wishlist.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                <Heart className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white">No Saved Favorites</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Save your dream calibers and chronographs by clicking the heart icon on any product.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveView("shop");
                }}
                className="px-6 py-2.5 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold border border-[#38bdf8]/40"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlist.map((watch) => (
              <div
                key={watch.id}
                className="p-3.5 rounded-lg bg-[#0a0e1a]/80 border border-white/10 flex gap-3.5 items-center relative group"
              >
                <img
                  src={watch.images[0]}
                  alt={watch.name}
                  className="w-16 h-16 object-cover rounded bg-black shrink-0 border border-white/10"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider truncate">
                    {watch.brand}
                  </p>
                  <h4 className="font-serif text-sm font-medium text-white truncate max-w-[190px]">
                    {watch.name}
                  </h4>
                  <p className="font-serif text-xs font-bold text-[#38bdf8] mt-1">
                    {formatPKR(watch.price)}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      addToCart(watch);
                      removeFromWishlist(watch.id);
                    }}
                    className="p-1.5 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs flex items-center gap-1 border border-[#38bdf8]/40"
                    title="Move to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      const url = generateWhatsAppLink({ watch });
                      window.open(url, "_blank");
                    }}
                    className="p-1.5 rounded bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 text-xs"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => removeFromWishlist(watch.id)}
                    className="p-1.5 rounded bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0a0e1a]/95">
            <button
              onClick={() => {
                wishlist.forEach((w) => addToCart(w));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border border-[#38bdf8]/40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Bag ({wishlist.length})</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
