import React, { useState } from "react";
import { useWatch } from "../context/WatchContext";
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  MessageCircle,
  CheckCircle,
  Building,
  DollarSign
} from "lucide-react";

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    formatPKR,
    generateWhatsAppLink,
    showToast
  } = useWatch();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    city: "Lahore",
    address: "",
    paymentMethod: "cod",
    notes: ""
  });

  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (viaWhatsApp = false) => {
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      showToast("Please fill in your name, contact phone, and address.", "warning");
      return;
    }

    const orderRef = `TW-PK-${Math.floor(100000 + Math.random() * 900000)}`;

    if (viaWhatsApp) {
      const url = generateWhatsAppLink({
        cart,
        customerName: customer.name,
        city: customer.city,
        notes: `Order Ref: ${orderRef} | Address: ${customer.address} | Payment: ${customer.paymentMethod.toUpperCase()}`
      });
      window.open(url, "_blank");
    }

    setOrderConfirmed(orderRef);
    clearCart();
    showToast(`Order ${orderRef} placed successfully!`, "success");
  };

  const pakistanCities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Peshawar",
    "Multan",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Abbottabad"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel-elevated rounded-xl border border-white/15 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0a0e1a]/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#38bdf8]" />
            <h2 className="font-serif text-lg font-medium text-white">
              Secure Pakistan Checkout & Delivery
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {orderConfirmed ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-white">Order Confirmed!</h3>
              <p className="text-xs font-mono text-[#38bdf8]">
                Reference ID: <strong className="text-white">{orderConfirmed}</strong>
              </p>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{customer.name}</strong>. Your timepiece order has been recorded for express courier delivery to <strong>{customer.city}</strong>. Our concierge will contact you via WhatsApp/Phone prior to dispatch.
              </p>

              <div className="p-4 rounded-lg bg-[#0a0e1a] border border-white/10 max-w-sm mx-auto text-left text-xs font-mono space-y-1">
                <p className="text-slate-400">Payment: <span className="text-white uppercase">{customer.paymentMethod}</span></p>
                <p className="text-slate-400">Inspection: <span className="text-emerald-400">Permitted upon delivery</span></p>
                <p className="text-slate-400">Estimated Dispatch: <span className="text-white">24-48 Hours</span></p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderConfirmed(null);
                  }}
                  className="px-6 py-2.5 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase font-semibold"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column: Form */}
              <div className="md:col-span-7 space-y-4 text-xs font-mono">
                <h3 className="font-serif text-base text-white font-medium">Delivery Destination in Pakistan</h3>

                <div>
                  <label className="text-slate-400 block mb-1">Full Recipient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Bilal"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full bg-[#0a0e1a] border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">WhatsApp / Phone *</label>
                    <input
                      type="text"
                      required
                      placeholder="0300 1234567"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full bg-[#0a0e1a] border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-[#38bdf8]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">City *</label>
                    <select
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full bg-[#0a0e1a] border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-[#38bdf8]"
                    >
                      {pakistanCities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Street Address, Sector, Area *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House / Office #, Street, Phase, Area..."
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full bg-[#0a0e1a] border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-[#38bdf8] resize-none"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="pt-2 space-y-2">
                  <label className="text-slate-400 block">Payment Method</label>
                  
                  <div
                    onClick={() => setCustomer({ ...customer, paymentMethod: "cod" })}
                    className={`p-3 rounded border cursor-pointer flex items-center justify-between transition-all ${
                      customer.paymentMethod === "cod"
                        ? "bg-[#0066ff]/20 border-[#38bdf8] text-white"
                        : "bg-[#0a0e1a] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <div>
                        <p className="font-semibold">Cash on Delivery (COD)</p>
                        <p className="text-[10px] text-slate-400">Pay upon parcel inspection at your doorstep</p>
                      </div>
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full border border-[#38bdf8] flex items-center justify-center">
                      {customer.paymentMethod === "cod" && <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>}
                    </span>
                  </div>

                  <div
                    onClick={() => setCustomer({ ...customer, paymentMethod: "raast" })}
                    className={`p-3 rounded border cursor-pointer flex items-center justify-between transition-all ${
                      customer.paymentMethod === "raast"
                        ? "bg-[#0066ff]/20 border-[#38bdf8] text-white"
                        : "bg-[#0a0e1a] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-[#38bdf8]" />
                      <div>
                        <p className="font-semibold">Raast Instant Pay / Online Bank Transfer</p>
                        <p className="text-[10px] text-slate-400">Zero transaction fees via State Bank Raast ID</p>
                      </div>
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full border border-[#38bdf8] flex items-center justify-center">
                      {customer.paymentMethod === "raast" && <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>}
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 rounded-lg bg-[#0a0e1a] border border-white/10 space-y-3">
                  <h4 className="font-serif text-sm font-medium text-white pb-2 border-b border-white/10">
                    Order Manifest ({cart.length} items)
                  </h4>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.watch.id} className="flex items-center justify-between text-xs font-mono">
                        <div className="truncate max-w-[150px]">
                          <p className="text-white truncate">{item.watch.name}</p>
                          <p className="text-[10px] text-slate-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-[#38bdf8]">
                          {formatPKR(item.watch.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono">
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
                      <span>Delivery</span>
                      <span>{cartShipping === 0 ? "FREE" : formatPKR(cartShipping)}</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                      <span>Grand Total</span>
                      <span className="text-[#38bdf8]">{formatPKR(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handlePlaceOrder(true)}
                    className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm Order via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handlePlaceOrder(false)}
                    className="w-full py-3 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold border border-[#38bdf8]/40 transition-all cursor-pointer"
                  >
                    Place Order Direct
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
