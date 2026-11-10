import React, { useState } from "react";
import { Star, ShieldCheck, Award, Sparkles, CheckCircle, Mail, Clock, Send } from "lucide-react";
import { useWatch } from "../context/WatchContext";

export const AboutSection: React.FC = () => {
  const { showToast } = useWatch();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setSubscribed(true);
      showToast("Welcome to the Legends Club! Use code LEGEND10 for 10% off.", "success");
    } else {
      showToast("Please enter a valid email address.", "warning");
    }
  };

  const testimonials = [
    {
      name: "Chaudhry Daniyal",
      city: "Lahore, Pakistan",
      watch: "True Chronos Obsidian Zenith",
      rating: 5,
      comment:
        "The finishing on the 904L Oystersteel case rivals my Swiss collection that cost ten times more. The dial changes nuance under sunlight, and the column-wheel chronograph action is razor sharp. Dispatched to DHA Lahore in 48 hours.",
      date: "Verified Collector"
    },
    {
      name: "Dr. Ayesha Siddiqui",
      city: "Karachi, Pakistan",
      watch: "Reine Étoile Diamond Mother-of-Pearl",
      rating: 5,
      comment:
        "The mother-of-pearl dial is ethereal. Delivery to Clifton was seamless with inspection before cash handover. True Watches delivers genuine luxury without the exorbitant middleman markups.",
      date: "Verified Collector"
    },
    {
      name: "Farhan Qureshi",
      city: "Islamabad, Pakistan",
      watch: "Deep Abyss Titanium Diver 300M",
      rating: 5,
      comment:
        "Grade 5 titanium is extraordinarily light on the wrist. The Super-LumiNova glows like a torch in the dark. Easily the best watch purchase I've made in Pakistan.",
      date: "Verified Collector"
    }
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-white/5 space-y-24">
      
      {/* Brand Heritage Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
              <Sparkles className="w-3 h-3" />
              <span>Maison Provenance</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-snug">
              Time Does Not Pass. <br />
              <span className="italic text-[#38bdf8]">It Builds Legends.</span>
            </h2>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Founded on the belief that a timepiece is a personal monument to life's hard-won victories, 
              <strong> True Watches</strong> marries the uncompromising geometry of Swiss high horology 
              with modern titanium alloys and double-domed anti-reflective sapphire crystals.
            </p>

            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Every caliber is hand-regulated on multi-position Witschi digital timing machines to ensure 
              an amplitude of 280°+ and chronological precision within -4/+6 seconds per day. Hand-finished 
              with Côtes de Genève, mirror-polished bevels, and flame-blued screws.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-slate-500 uppercase text-[10px] block">Atmospheric Seal</span>
                <span className="text-white font-bold">10 to 30 ATM</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 uppercase text-[10px] block">Crystal Hardness</span>
                <span className="text-white font-bold">9 Mohs Scale</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 uppercase text-[10px] block">Servicing Hub</span>
                <span className="text-[#38bdf8] font-bold">Pakistan Atelier</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="glass-panel-elevated p-3 rounded-xl border border-white/15 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85"
                alt="Horology Workshop"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#38bdf8]">
                    Master Workshop Glashütte & Lahore
                  </span>
                  <p className="font-serif text-lg text-white font-medium">
                    Hand-Assembled with Surgical Precision
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
            Patron Testimonials
          </span>
          <h2 className="font-serif text-3xl text-white font-normal">
            Voices of True Connoisseurs
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Real feedback from verified watch collectors and enthusiasts across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-lg space-y-4 flex flex-col justify-between border-t-2 border-t-[#0066ff]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {t.date}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-light italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <p className="font-serif text-sm font-medium text-white">{t.name}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-0.5">
                  <span>{t.city}</span>
                  <span className="text-[#38bdf8] text-[10px] truncate max-w-[150px]">{t.watch}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter VIP Club Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-2xl border border-[#38bdf8]/30 relative overflow-hidden text-center space-y-6">
          
          <div className="w-12 h-12 rounded-full bg-[#0066ff]/20 border border-[#38bdf8]/50 mx-auto flex items-center justify-center text-[#38bdf8]">
            <Clock className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Join The True Watches VIP Society
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Receive private allocations of limited-production calibers, collector invitations, and an 
              instant <strong>10% courtesy reduction</strong> on your first order.
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 max-w-md mx-auto text-xs font-mono text-emerald-300 space-y-1 animate-in fade-in">
              <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <p className="font-bold">You are now registered for private allocations!</p>
              <p className="text-slate-300">
                Use code <span className="text-white font-bold underline">LEGEND10</span> at checkout for 10% off.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your VIP email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 bg-[#050814] border border-white/15 rounded px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8] font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(0,102,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Discretion guaranteed • Unsubscribe anytime
          </p>
        </div>
      </div>

    </section>
  );
};
