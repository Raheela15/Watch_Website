import React, { useState } from "react";
import { useWatch } from "../context/WatchContext";
import {
  Search,
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  SlidersHorizontal,
  PhoneCall,
  Clock,
  ShieldCheck
} from "lucide-react";
import { WatchCategory } from "../types/watch";

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAdminOpen,
    activeView,
    setActiveView,
    selectedCategory,
    setSelectedCategory,
    theme,
    toggleTheme,
    isLumeMode,
    toggleLumeMode,
    searchQuery,
    setSearchQuery
  } = useWatch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (view: string, cat?: WatchCategory) => {
    setActiveView(view);
    if (cat) {
      setSelectedCategory(cat);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#0a0e1a]/90 text-[11px] tracking-wider uppercase border-b border-white/5 py-1.5 px-4 text-[#8c90a1] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#38bdf8]">
              <ShieldCheck className="w-3.5 h-3.5" /> Official True Watches Boutique • 100% Certified Authentic
            </span>
            <span className="hidden lg:inline text-slate-400">
              Free Insured Delivery Across Pakistan on Orders Over ₨ 50,000
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleNavClick("contact")}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-[#38bdf8]" />
              Concierge: +92 334 5678900
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-[#38bdf8] transition-colors flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              Catalogue Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <button
            onClick={() => handleNavClick("home", "all")}
            className="flex flex-col text-left group focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded border border-[#38bdf8]/50 bg-[#0066ff]/20 flex items-center justify-center text-[#38bdf8] group-hover:bg-[#0066ff]/40 group-hover:scale-105 transition-all">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#dfe1f4] group-hover:text-white transition-colors">
                TRUE WATCHES
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#38bdf8] ml-9 font-medium -mt-0.5">
              Time Builds Legends
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.12em] font-medium text-[#c2c6d8]">
            <button
              onClick={() => handleNavClick("home", "all")}
              className={`transition-colors hover:text-[#38bdf8] py-1 relative ${
                activeView === "home" && selectedCategory === "all" ? "text-white font-semibold" : ""
              }`}
            >
              Home
              {activeView === "home" && selectedCategory === "all" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066ff]"></span>
              )}
            </button>

            <button
              onClick={() => handleNavClick("shop", "all")}
              className={`transition-colors hover:text-[#38bdf8] py-1 relative ${
                activeView === "shop" && selectedCategory === "all" ? "text-white font-semibold" : ""
              }`}
            >
              Shop
              {activeView === "shop" && selectedCategory === "all" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066ff]"></span>
              )}
            </button>

            <button
              onClick={() => handleNavClick("shop", "men")}
              className={`transition-colors hover:text-[#38bdf8] py-1 relative ${
                selectedCategory === "men" ? "text-white font-semibold" : ""
              }`}
            >
              Men's Watches
              {selectedCategory === "men" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066ff]"></span>
              )}
            </button>

            <button
              onClick={() => handleNavClick("shop", "women")}
              className={`transition-colors hover:text-[#38bdf8] py-1 relative ${
                selectedCategory === "women" ? "text-white font-semibold" : ""
              }`}
            >
              Women's Watches
              {selectedCategory === "women" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066ff]"></span>
              )}
            </button>

            <button
              onClick={() => handleNavClick("shop", "luxury")}
              className={`transition-colors hover:text-[#38bdf8] py-1 relative ${
                selectedCategory === "luxury" ? "text-white font-semibold" : ""
              }`}
            >
              Collections
              {selectedCategory === "luxury" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066ff]"></span>
              )}
            </button>

            <button
              onClick={() => handleNavClick("about")}
              className={`transition-colors hover:text-[#38bdf8] py-1 relative ${
                activeView === "about" ? "text-white font-semibold" : ""
              }`}
            >
              About
              {activeView === "about" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066ff]"></span>
              )}
            </button>

            <button
              onClick={() => handleNavClick("contact")}
              className={`transition-colors hover:text-[#38bdf8] py-1 relative ${
                activeView === "contact" ? "text-white font-semibold" : ""
              }`}
            >
              Contact
              {activeView === "contact" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066ff]"></span>
              )}
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Bar / Toggle */}
            <div className="relative flex items-center">
              {showSearchInput ? (
                <div className="flex items-center bg-[#050814]/90 border border-[#38bdf8]/40 rounded px-2.5 py-1 text-xs text-white">
                  <Search className="w-3.5 h-3.5 text-[#38bdf8] mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search watches, calibers..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeView !== "shop") setActiveView("shop");
                    }}
                    autoFocus
                    className="bg-transparent border-none outline-none w-36 sm:w-48 text-xs text-white placeholder-slate-400"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchInput(false);
                    }}
                    className="text-slate-400 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-[#dfe1f4] hover:text-[#38bdf8] rounded hover:bg-white/5 transition-colors"
                  title="Search Timepieces"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Luminescence Mode Simulator Button */}
            <button
              onClick={toggleLumeMode}
              className={`p-2 rounded transition-all flex items-center gap-1.5 text-xs font-mono uppercase ${
                isLumeMode
                  ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8] lume-active"
                  : "text-[#8c90a1] hover:text-[#38bdf8] hover:bg-white/5 border border-transparent"
              }`}
              title="Toggle Super-LumiNova Dial Glow Simulator"
            >
              <Sparkles className={`w-4 h-4 ${isLumeMode ? "text-[#38bdf8] animate-pulse" : ""}`} />
              <span className="hidden xl:inline text-[10px] tracking-wider font-semibold">
                {isLumeMode ? "Lume On" : "Lume Mode"}
              </span>
            </button>

            {/* Theme Toggle (Dark Obsidian / Light Alabaster) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[#dfe1f4] hover:text-[#38bdf8] rounded hover:bg-white/5 transition-colors"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Obsidian Dark Mode"}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-[#dfe1f4] hover:text-[#38bdf8] rounded hover:bg-white/5 transition-colors relative"
              title="Saved Favorites"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute 0 top-1 right-1 w-4 h-4 rounded-full bg-[#0066ff] text-white text-[9px] font-bold flex items-center justify-center border border-[#050814]">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0066ff]/20 hover:bg-[#0066ff]/35 border border-[#38bdf8]/40 text-[#dfe1f4] hover:text-white transition-all group"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#38bdf8] group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#0066ff] text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wider font-mono">
                Cart
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#dfe1f4] hover:text-white lg:hidden rounded hover:bg-white/5"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1 text-sm font-medium tracking-wide">
              <button
                onClick={() => handleNavClick("home", "all")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("shop", "all")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                All Watches & Shop
              </button>
              <button
                onClick={() => handleNavClick("shop", "men")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                Men's Watches
              </button>
              <button
                onClick={() => handleNavClick("shop", "women")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                Women's Watches
              </button>
              <button
                onClick={() => handleNavClick("shop", "luxury")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                Haute Horlogerie & Luxury
              </button>
              <button
                onClick={() => handleNavClick("shop", "chronograph")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                Chronographs & Speedmasters
              </button>
              <button
                onClick={() => handleNavClick("shop", "smart")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                Titanium Smartwatches
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                About Our Heritage
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="text-left py-2 px-3 rounded hover:bg-white/5 text-[#dfe1f4]"
              >
                Contact & Pakistan Showrooms
              </button>
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded bg-white/5 text-[#38bdf8] flex items-center gap-2 mt-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Demo Catalogue Admin
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
