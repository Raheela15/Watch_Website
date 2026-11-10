import React, { useState } from "react";
import { useWatch } from "../context/WatchContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Truck,
  Tag,
  AlertTriangle
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPKR,
    generateWhatsAppLink,
    setIsCheckoutOpen,
    setActiveView
  } = useWatch();

  const [couponInput, setCouponInput] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [checkoutCity, setCheckoutCity] = useState("Lahore");

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50000;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput("");
    }
  };

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppLink({
      cart,
      city: checkoutCity
    });
    window.open(url, "_blank");
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full glass-panel-elevated border-l border-white/10 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0e1a]/80">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#38bdf8]" />
            <h2 className="font-serif text-lg font-medium text-white tracking-wide">
              Your Timepiece Bag
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#0066ff]/20 text-[#38bdf8] text-xs font-mono font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-xs font-mono text-slate-400 hover:text-rose-400 px-2 py-1 transition-colors"
                title="Clear Bag"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-[#0f172a]/60 border-b border-white/5 text-xs font-mono">
          <div className="flex items-center justify-between mb-1.5 text-slate-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#38bdf8]" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-emerald-400 font-semibold">You've unlocked Free Insured Express Delivery!</span>
              ) : (
                <span>Add {formatPKR(amountNeededForFreeShipping)} more for Free Delivery</span>
              )}
            </span>
            <span className="text-slate-400">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0066ff] to-[#38bdf8] rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Clear Cart Confirmation Dialog */}
        {showClearConfirm && (
          <div className="m-4 p-4 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-rose-300 font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Clear all items from your bag?</span>
            </div>
            <p className="text-slate-400 text-[11px]">This action cannot be undone.</p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-mono"
              >
                Yes, Clear All
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 rounded bg-white/10 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white">Your Bag is Empty</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore our master horology collection, chronographs, and everyday prestige timepieces.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView("shop");
                }}
                className="px-6 py-2.5 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold border border-[#38bdf8]/40"
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.watch.id}-${item.selectedColor}`}
                className="p-3 rounded-lg bg-[#0a0e1a]/80 border border-white/10 flex gap-3.5 relative group"
              >
                {/* Thumbnail */}
                <img
                  src={item.watch.images[0]}
                  alt={item.watch.name}
                  className="w-16 h-16 object-cover rounded bg-black shrink-0 border border-white/10"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider truncate">
                        {item.watch.brand}
                      </p>
                      <h4 className="font-serif text-sm font-medium text-white truncate max-w-[190px]">
                        {item.watch.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.watch.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] font-mono text-[#38bdf8]">
                    Dial: {item.selectedColor || "Standard"}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-serif text-sm font-bold text-white">
                      {formatPKR(item.watch.price * item.quantity)}
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-white/15 rounded bg-black/40">
                      <button
                        onClick={() => updateQuantity(item.watch.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs text-white font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.watch.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Coupon, Summary & Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0a0e1a]/95 space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between px-3 py-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-400">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon '{appliedCoupon}' Active</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-white text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. LEGEND10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-xs text-white uppercase placeholder-slate-500 outline-none focus:border-[#38bdf8] font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations Matrix */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white">{formatPKR(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({appliedCoupon})</span>
                  <span>-{formatPKR(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Insured Courier (Pakistan)</span>
                <span>{cartShipping === 0 ? "FREE" : formatPKR(cartShipping)}</span>
              </div>

              <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-[#38bdf8]">{formatPKR(cartTotal)}</span>
              </div>
            </div>

            {/* City input for WhatsApp order quick routing */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 text-[10px] uppercase">Destination City:</span>
              <input
                type="text"
                value={checkoutCity}
                onChange={(e) => setCheckoutCity(e.target.value)}
                placeholder="Lahore / Karachi..."
                className="bg-[#101934] border border-white/15 rounded px-2 py-1 text-xs text-white font-mono flex-1 outline-none"
              />
            </div>

            {/* Checkout & WhatsApp Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-2 border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 rounded bg-[#050814] hover:bg-emerald-950/40 text-emerald-400 text-xs font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-2 border border-emerald-500/40 transition-all cursor-pointer"
                title="Send entire cart manifest to WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Order Cart on WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
