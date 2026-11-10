import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles, PhoneCall } from "lucide-react";
import { useWatch, OFFICIAL_WHATSAPP_NUMBER } from "../context/WatchContext";

export const WhatsAppFloatingButton: React.FC = () => {
  const { generateWhatsAppLink, cartCount, cart } = useWatch();
  const [isOpen, setIsOpen] = useState(false);
  const [customQuery, setCustomQuery] = useState("");
  const [clientName, setClientName] = useState("");

  const handleSend = () => {
    let url = "";
    if (cart.length > 0) {
      url = generateWhatsAppLink({
        cart,
        customerName: clientName || undefined,
        notes: customQuery || undefined
      });
    } else {
      const msg = `Hello True Watches Concierge! ⌚\n\n${clientName ? `*Customer:* ${clientName}\n` : ""}I am inquiring about your authentic luxury timepieces, warranty, and delivery across Pakistan.\n\n*Question:* ${customQuery || "Please share your latest catalogue and availability."}`;
      url = `https://wa.me/923345678900?text=${encodeURIComponent(msg)}`;
    }

    window.open(url, "_blank");
    setIsOpen(false);
    setCustomQuery("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Concierge Interactive Flyout Panel */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 glass-panel-elevated rounded-xl border border-emerald-500/40 p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-white">True Watches Concierge</h4>
                <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Assistance • Pakistan
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Context */}
          <div className="py-3 text-xs space-y-2">
            <div className="p-2.5 rounded bg-white/5 border border-white/5 text-slate-300 text-[11px] leading-relaxed">
              Assalam-o-Alaikum! Welcome to True Watches. Chat directly with our watchmaker concierge in Pakistan for custom inquiries, order verification, or video call dial viewings.
            </div>

            {cartCount > 0 && (
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono flex items-center justify-between">
                <span>Items in bag: {cartCount}</span>
                <span className="underline">Will be attached</span>
              </div>
            )}

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Your Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Tariq Ahmed"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#101934] border border-white/15 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Your Inquiry / Watch Request</label>
              <textarea
                rows={2}
                placeholder="Ask about dial specs, dispatch to Karachi/Lahore, discounts..."
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                className="w-full bg-[#101934] border border-white/15 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 resize-none font-mono"
              />
            </div>
          </div>

          {/* Send Button */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              {OFFICIAL_WHATSAPP_NUMBER}
            </span>

            <button
              onClick={handleSend}
              className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
            >
              <span>Launch WhatsApp</span>
              <Send className="w-3 h-3" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_4px_35px_rgba(16,185,129,0.6)] transition-all cursor-pointer border border-emerald-400/40 relative"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Concierge"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-mono font-bold tracking-wider uppercase hidden sm:inline">
          Order on WhatsApp
        </span>
      </button>

    </div>
  );
};
