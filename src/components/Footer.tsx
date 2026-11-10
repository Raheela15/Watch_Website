import React from "react";
import { useWatch, OFFICIAL_WHATSAPP_NUMBER } from "../context/WatchContext";
import {
  Clock,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { WatchCategory } from "../types/watch";

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, supportEmail, setIsAdminOpen } = useWatch();

  const handleNav = (view: string, cat?: WatchCategory) => {
    setActiveView(view);
    if (cat) setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050814] border-t border-white/10 text-slate-400 text-xs">
      
      {/* Top Value Banner */}
      <div className="border-b border-white/5 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#38bdf8] shrink-0" />
            <div>
              <p className="font-serif text-sm text-white font-medium">100% Genuine Certified</p>
              <p className="text-[11px] text-slate-500">Authentic calibers with serial guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-[#38bdf8] shrink-0" />
            <div>
              <p className="font-serif text-sm text-white font-medium">Free Insured Courier</p>
              <p className="text-[11px] text-slate-500">Express delivery to all cities in Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-8 h-8 text-[#38bdf8] shrink-0" />
            <div>
              <p className="font-serif text-sm text-white font-medium">7-Day Inspection</p>
              <p className="text-[11px] text-slate-500">Verify authenticity upon delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#38bdf8] shrink-0" />
            <div>
              <p className="font-serif text-sm text-white font-medium">5-Year Extended Warranty</p>
              <p className="text-[11px] text-slate-500">Complimentary mechanical servicing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded border border-[#38bdf8]/50 bg-[#0066ff]/20 flex items-center justify-center text-[#38bdf8]">
              <Clock className="w-4 h-4" />
            </div>
            <span className="font-serif text-xl font-bold tracking-[0.18em] text-white">
              TRUE WATCHES
            </span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] text-[#38bdf8] font-semibold">
            Time Builds Legends
          </p>

          <p className="text-xs text-slate-400 font-light max-w-sm leading-relaxed">
            True Watches is Pakistan's premier haute horlogerie boutique and authorized atelier. 
            Crafting and curating Swiss-grade chronographs, skeleton tourbillons, and everyday prestige timepieces.
          </p>

          <div className="pt-2 text-[11px] font-mono space-y-1 text-slate-300">
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
              <a href={`mailto:${supportEmail}`} className="hover:text-white transition-colors">
                {supportEmail}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <a href="https://wa.me/923345678900" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                {OFFICIAL_WHATSAPP_NUMBER}
              </a>
            </p>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-white font-semibold">
            Watch Collections
          </h4>
          <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
            <li>
              <button onClick={() => handleNav("shop", "men")} className="hover:text-[#38bdf8] transition-colors">
                Men's Precision Watches
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("shop", "women")} className="hover:text-[#38bdf8] transition-colors">
                Women's Diamond & Pearl
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("shop", "luxury")} className="hover:text-[#38bdf8] transition-colors">
                Haute Horlogerie & Skeleton
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("shop", "chronograph")} className="hover:text-[#38bdf8] transition-colors">
                Tachymeter Chronographs
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("shop", "sports")} className="hover:text-[#38bdf8] transition-colors">
                Titanium 300M Divers
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("shop", "smart")} className="hover:text-[#38bdf8] transition-colors">
                Apex Smartwatches
              </button>
            </li>
          </ul>
        </div>

        {/* Maison & Heritage */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-white font-semibold">
            The Maison
          </h4>
          <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
            <li>
              <button onClick={() => handleNav("about")} className="hover:text-[#38bdf8] transition-colors">
                Our Horological Heritage
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("about")} className="hover:text-[#38bdf8] transition-colors">
                Master Watchmakers
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("about")} className="hover:text-[#38bdf8] transition-colors">
                VIP Collector Society
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("contact")} className="hover:text-[#38bdf8] transition-colors">
                Lahore & Karachi Salons
              </button>
            </li>
            <li>
              <button onClick={() => setIsAdminOpen(true)} className="hover:text-[#38bdf8] transition-colors text-slate-500">
                Demo Admin Console
              </button>
            </li>
          </ul>
        </div>

        {/* Concierge & Service */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-white font-semibold">
            Client Services
          </h4>
          <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
            <li>
              <a href="https://wa.me/923345678900" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                WhatsApp Order Support
              </a>
            </li>
            <li>
              <button onClick={() => handleNav("contact")} className="hover:text-[#38bdf8] transition-colors">
                Caliber Servicing Request
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("contact")} className="hover:text-[#38bdf8] transition-colors">
                Cash on Delivery Terms
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("contact")} className="hover:text-[#38bdf8] transition-colors">
                Inspection & Returns
              </button>
            </li>
            <li>
              <button onClick={() => handleNav("contact")} className="hover:text-[#38bdf8] transition-colors">
                Certificate of Authenticity
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
        <p>© {new Date().getFullYear()} True Watches Atelier Pakistan. All rights reserved. Time Builds Legends.</p>
        <p className="flex items-center gap-2">
          <span>Obsidian Chronometry</span>
          <span>•</span>
          <span>Crafted with Precision</span>
        </p>
      </div>

    </footer>
  );
};
