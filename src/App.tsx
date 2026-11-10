import React, { useState, useMemo } from "react";
import { WatchProvider, useWatch } from "./context/WatchContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistModal } from "./components/WishlistModal";
import { AdminModal } from "./components/AdminModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { FilterSidebar } from "./components/FilterSidebar";
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";
import { ContactSection } from "./components/ContactSection";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { ToastContainer } from "./components/Toast";
import {
  Sparkles,
  Search,
  Filter,
  Flame,
  Award,
  Clock,
  ArrowRight,
  RotateCcw,
  Shield,
  Truck
} from "lucide-react";
import { WatchCategory } from "./types/watch";

const MainContent: React.FC = () => {
  const {
    watches,
    activeView,
    setActiveView,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    isLumeMode,
    toggleLumeMode,
    setIsAdminOpen,
    formatPKR
  } = useWatch();

  // Filter States
  const [priceRange, setPriceRange] = useState<[number, number]>([40000, 400000]);
  const [selectedMovement, setSelectedMovement] = useState<string>("all");
  const [selectedStrap, setSelectedStrap] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange([40000, 400000]);
    setSelectedMovement("all");
    setSelectedStrap("all");
    setSortBy("featured");
  };

  // Filter & Sort Logic
  const filteredWatches = useMemo(() => {
    return watches
      .filter((watch) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            watch.name.toLowerCase().includes(q) ||
            watch.brand.toLowerCase().includes(q) ||
            watch.movement.toLowerCase().includes(q) ||
            watch.dialColor.toLowerCase().includes(q) ||
            watch.category.toLowerCase().includes(q) ||
            watch.id.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category
        if (selectedCategory !== "all") {
          if (watch.category !== selectedCategory) return false;
        }

        // Price
        if (watch.price > priceRange[1]) return false;

        // Movement
        if (selectedMovement !== "all") {
          if (!watch.movement.toLowerCase().includes(selectedMovement.toLowerCase())) return false;
        }

        // Strap
        if (selectedStrap !== "all") {
          if (!watch.strapMaterial.toLowerCase().includes(selectedStrap.toLowerCase())) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") {
          return (b.badge === "New Arrival" ? 1 : 0) - (a.badge === "New Arrival" ? 1 : 0);
        }
        // Default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [watches, searchQuery, selectedCategory, priceRange, selectedMovement, selectedStrap, sortBy]);

  // Featured Watches for Home
  const trendingWatches = useMemo(() => {
    return watches.filter((w) => w.isTrending || w.isBestSeller).slice(0, 4);
  }, [watches]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isLumeMode ? "bg-[#010206]" : ""}`}>
      
      {/* Toast Notification Stack */}
      <ToastContainer />

      {/* Navigation */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME */}
        {activeView === "home" && (
          <div className="space-y-16">
            
            {/* Hero Marquee Section */}
            <Hero />

            {/* Dial Luminescence Simulator Interactive Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                onClick={toggleLumeMode}
                className={`p-6 sm:p-8 rounded-xl border transition-all duration-500 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
                  isLumeMode
                    ? "bg-[#050814] border-[#38bdf8] lume-active"
                    : "glass-panel-elevated hover:border-[#38bdf8]/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isLumeMode
                      ? "bg-[#38bdf8] text-[#050814] shadow-[0_0_25px_#38bdf8]"
                      : "bg-[#0066ff]/20 text-[#38bdf8] border border-[#38bdf8]/40"
                  }`}>
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-bold">
                        Interactive Feature
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mt-0.5">
                      Super-LumiNova™ Dial Glow Simulator
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl font-light">
                      {isLumeMode
                        ? "Midnight observation active: Ambient lighting reduced to absolute obsidian to showcase phosphorescent hour markers."
                        : "Experience how True Watches dials illuminate in complete darkness. Click to engage Super-LumiNova BGW9 night visualization."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`px-5 py-2.5 rounded text-xs font-mono tracking-wider uppercase font-semibold transition-all shrink-0 ${
                    isLumeMode
                      ? "bg-[#38bdf8] text-[#050814] shadow-[0_0_20px_#38bdf8]"
                      : "bg-white/10 hover:bg-white/15 text-white border border-white/20"
                  }`}
                >
                  {isLumeMode ? "Disable Night Lume" : "Engage Dial Lume"}
                </button>
              </div>
            </section>

            {/* Trending & Best Sellers Showcase Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Curated Selection</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                    Trending & Best Sellers
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveView("shop");
                    setSelectedCategory("all");
                  }}
                  className="text-xs font-mono text-[#38bdf8] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>View All Masterpieces</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingWatches.map((watch) => (
                  <ProductCard key={watch.id} watch={watch} />
                ))}
              </div>
            </section>

            {/* Promotional Split Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Banner 1: Haute Horlogerie */}
                <div className="glass-panel p-8 rounded-xl border border-white/10 relative overflow-hidden group">
                  <div className="relative z-10 space-y-3 max-w-sm">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
                      Twin-Barrel Haute Horlogerie
                    </span>
                    <h3 className="font-serif text-2xl text-white font-medium">
                      The Skeleton Flying Tourbillon
                    </h3>
                    <p className="text-xs text-slate-300 font-light">
                      Manufacture calibre with 96-hour power reserve, hand-beveled bridges, and floating cage.
                    </p>
                    <button
                      onClick={() => {
                        setActiveView("shop");
                        setSelectedCategory("luxury");
                      }}
                      className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#38bdf8] font-semibold pt-2 transition-colors"
                    >
                      <span>Explore Haute Horlogerie</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 group-hover:opacity-45 transition-opacity">
                    <img
                      src="https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&w=600&q=80"
                      alt="Tourbillon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Banner 2: Titanium Dive */}
                <div className="glass-panel p-8 rounded-xl border border-white/10 relative overflow-hidden group">
                  <div className="relative z-10 space-y-3 max-w-sm">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
                      Oceanic Engineering
                    </span>
                    <h3 className="font-serif text-2xl text-white font-medium">
                      Deep Abyss 300M Titanium
                    </h3>
                    <p className="text-xs text-slate-300 font-light">
                      Grade 5 aerospace titanium, helium escape valve, and 120-click ceramic dive bezel.
                    </p>
                    <button
                      onClick={() => {
                        setActiveView("shop");
                        setSelectedCategory("sports");
                      }}
                      className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#38bdf8] font-semibold pt-2 transition-colors"
                    >
                      <span>Discover Sports & Dive</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 group-hover:opacity-45 transition-opacity">
                    <img
                      src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80"
                      alt="Diver Watch"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* Full Catalogue Section on Homepage */}
            <section id="catalogue-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#38bdf8]">
                  The Complete Collection
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                  Explore True Watches
                </h2>
                <p className="text-xs text-slate-400 font-light">
                  Filter by category, movement, strap material, or price ceiling.
                </p>
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden flex justify-between items-center py-2">
                <button
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="px-4 py-2 rounded bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center gap-2"
                >
                  <Filter className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{showMobileFilter ? "Hide Filters" : "Show Filters"}</span>
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {filteredWatches.length} timepieces found
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Filter Sidebar (Desktop & Mobile toggle) */}
                <div className={`lg:col-span-3 ${showMobileFilter ? "block" : "hidden lg:block"} sticky top-24`}>
                  <FilterSidebar
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedMovement={selectedMovement}
                    setSelectedMovement={setSelectedMovement}
                    selectedStrap={selectedStrap}
                    setSelectedStrap={setSelectedStrap}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    resetFilters={resetFilters}
                    totalFilteredCount={filteredWatches.length}
                  />
                </div>

                {/* Product Cards Grid */}
                <div className="lg:col-span-9 space-y-6">
                  {filteredWatches.length === 0 ? (
                    <div className="glass-panel p-12 rounded-xl text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-slate-500">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg text-white font-medium">
                        No Timepieces Match Your Refinement
                      </h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Try expanding your price ceiling, resetting movement filters, or searching for another caliber.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="px-5 py-2 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredWatches.map((watch) => (
                        <ProductCard key={watch.id} watch={watch} />
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </section>

            {/* About & Testimonials */}
            <AboutSection />

            {/* Contact Section Preview */}
            <ContactSection />

          </div>
        )}

        {/* VIEW 2: DEDICATED SHOP */}
        {activeView === "shop" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            
            {/* Shop Header Banner */}
            <div className="glass-panel p-8 rounded-xl border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#38bdf8] font-semibold">
                Haute Horlogerie Catalogue
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                The Master Watch Catalogue
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
                Every timepiece is accompanied by a certificate of authenticity, international 5-year mechanical warranty, 
                and free insured doorstep delivery across Karachi, Lahore, Islamabad, and all cities in Pakistan.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-between items-center py-2">
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="px-4 py-2 rounded bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center gap-2"
              >
                <Filter className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{showMobileFilter ? "Hide Filters" : "Show Filters"}</span>
              </button>
              <span className="text-xs font-mono text-slate-400">
                {filteredWatches.length} timepieces found
              </span>
            </div>

            {/* Main Shop Filter & Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className={`lg:col-span-3 ${showMobileFilter ? "block" : "hidden lg:block"} sticky top-24`}>
                <FilterSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedMovement={selectedMovement}
                  setSelectedMovement={setSelectedMovement}
                  selectedStrap={selectedStrap}
                  setSelectedStrap={setSelectedStrap}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  resetFilters={resetFilters}
                  totalFilteredCount={filteredWatches.length}
                />
              </div>

              <div className="lg:col-span-9 space-y-6">
                {filteredWatches.length === 0 ? (
                  <div className="glass-panel p-12 rounded-xl text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-slate-500">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg text-white font-medium">
                      No Timepieces Match Your Refinement
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Try adjusting your search query, price ceiling, or movement type.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-5 py-2 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWatches.map((watch) => (
                      <ProductCard key={watch.id} watch={watch} />
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 3: ABOUT */}
        {activeView === "about" && (
          <div className="py-6">
            <AboutSection />
          </div>
        )}

        {/* VIEW 4: CONTACT */}
        {activeView === "contact" && (
          <div className="py-6">
            <ContactSection />
          </div>
        )}

      </main>

      {/* Floating WhatsApp Concierge Button */}
      <WhatsAppFloatingButton />

      {/* Modals & Slide-Overs */}
      <ProductModal />
      <CartDrawer />
      <WishlistModal />
      <AdminModal />
      <CheckoutModal />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <WatchProvider>
      <MainContent />
    </WatchProvider>
  );
}
