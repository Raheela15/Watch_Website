import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Watch, WatchCategory } from "../types/watch";
import { INITIAL_WATCHES } from "../data/watches";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface WatchContextType {
  // Products
  watches: Watch[];
  addProduct: (watch: Omit<Watch, "id">) => void;
  updateProduct: (id: string, updated: Partial<Watch>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaultProducts: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (watch: Watch, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (watchId: string) => void;
  updateQuantity: (watchId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: Watch[];
  toggleWishlist: (watch: Watch) => void;
  isInWishlist: (watchId: string) => boolean;
  removeFromWishlist: (watchId: string) => void;

  // Modals & Active View
  activeView: string;
  setActiveView: (view: string) => void;
  selectedCategory: WatchCategory;
  setSelectedCategory: (cat: WatchCategory) => void;
  selectedWatch: Watch | null;
  setSelectedWatch: (watch: Watch | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Theme & Luminescence
  theme: "dark" | "light";
  toggleTheme: () => void;
  isLumeMode: boolean;
  toggleLumeMode: () => void;

  // Search & Navigation
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Helpers
  formatPKR: (amount: number) => string;
  generateWhatsAppLink: (opts: {
    watch?: Watch;
    cart?: CartItem[];
    customerName?: string;
    city?: string;
    notes?: string;
  }) => string;
  whatsAppNumber: string;
  supportEmail: string;

  // Feedback
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "info" | "warning") => void;
  dismissToast: (id: string) => void;
}

const WatchContext = createContext<WatchContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS = "tw_products_v1";
const LOCAL_STORAGE_CART = "tw_cart_v1";
const LOCAL_STORAGE_WISHLIST = "tw_wishlist_v1";
const LOCAL_STORAGE_THEME = "tw_theme_v1";

// Valid International WhatsApp Number for True Watches Pakistan concierge
export const OFFICIAL_WHATSAPP_NUMBER = "+92 334 5678900";
export const OFFICIAL_WHATSAPP_CLEAN = "923345678900";
export const OFFICIAL_EMAIL = "raheelarani686@gmail.com";

export const WatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [watches, setWatches] = useState<Watch[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_WATCHES;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<Watch[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Theme
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME);
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // fallback
    }
    return "dark";
  });

  // Luminescence simulator
  const [isLumeMode, setIsLumeMode] = useState(false);

  // Modals & Navigation
  const [activeView, setActiveView] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<WatchCategory>("all");
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(watches));
    } catch {
      // ignore
    }
  }, [watches]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_THEME, theme);
    } catch {
      // ignore
    }
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, [theme]);

  // Toast Helpers
  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (watch: Watch, quantity = 1, selectedColor?: string) => {
    if (!watch.inStock || watch.stock <= 0) {
      showToast(`${watch.name} is currently out of stock.`, "warning");
      return;
    }

    const chosenColor = selectedColor || watch.colors[0]?.name || "Default";

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.watch.id === watch.id && item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const item = prevCart[existingIndex];
        const newQty = Math.min(item.quantity + quantity, watch.stock);
        const updated = [...prevCart];
        updated[existingIndex] = { ...item, quantity: newQty };
        return updated;
      } else {
        const initialQty = Math.min(quantity, watch.stock);
        return [...prevCart, { watch, quantity: initialQty, selectedColor: chosenColor }];
      }
    });

    showToast(`Added ${watch.name} to cart.`, "success");
  };

  const removeFromCart = (watchId: string) => {
    setCart((prev) => prev.filter((item) => item.watch.id !== watchId));
    showToast("Item removed from cart.", "info");
  };

  const updateQuantity = (watchId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(watchId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.watch.id === watchId) {
          const validQty = Math.min(quantity, item.watch.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscountPercent(0);
    showToast("Cart has been cleared.", "info");
  };

  // Coupons
  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "LEGEND10") {
      setAppliedCoupon("LEGEND10");
      setCouponDiscountPercent(10);
      showToast("Coupon applied: 10% Off your order!", "success");
      return true;
    } else if (clean === "TIME15") {
      setAppliedCoupon("TIME15");
      setCouponDiscountPercent(15);
      showToast("VIP Coupon applied: 15% Off!", "success");
      return true;
    } else if (clean === "WELCOME5") {
      setAppliedCoupon("WELCOME5");
      setCouponDiscountPercent(5);
      showToast("Welcome Coupon applied: 5% Off!", "success");
      return true;
    } else {
      showToast("Invalid promo code. Try LEGEND10 or WELCOME5", "warning");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscountPercent(0);
    showToast("Coupon removed.", "info");
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.watch.price * item.quantity, 0);
  const cartDiscount = Math.round((cartSubtotal * couponDiscountPercent) / 100);
  // Free Express Insured Shipping across Pakistan above PKR 50,000
  const cartShipping = cartSubtotal > 0 && cartSubtotal >= 50000 ? 0 : cartSubtotal > 0 ? 1500 : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Wishlist
  const toggleWishlist = (watch: Watch) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === watch.id);
      if (exists) {
        showToast(`Removed ${watch.name} from wishlist.`, "info");
        return prev.filter((w) => w.id !== watch.id);
      } else {
        showToast(`Saved ${watch.name} to wishlist.`, "success");
        return [...prev, watch];
      }
    });
  };

  const isInWishlist = (watchId: string) => {
    return wishlist.some((w) => w.id === watchId);
  };

  const removeFromWishlist = (watchId: string) => {
    setWishlist((prev) => prev.filter((w) => w.id !== watchId));
    showToast("Removed from wishlist.", "info");
  };

  // Products CRUD (Admin Demo)
  const addProduct = (newWatchData: Omit<Watch, "id">) => {
    const newId = `tw-custom-${Date.now()}`;
    const newWatch: Watch = {
      id: newId,
      ...newWatchData
    };
    setWatches((prev) => [newWatch, ...prev]);
    showToast(`Timepiece "${newWatch.name}" successfully added to catalogue.`, "success");
  };

  const updateProduct = (id: string, updated: Partial<Watch>) => {
    setWatches((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updated } : w))
    );
    showToast("Timepiece specifications updated.", "success");
  };

  const deleteProduct = (id: string) => {
    setWatches((prev) => prev.filter((w) => w.id !== id));
    setCart((prev) => prev.filter((item) => item.watch.id !== id));
    setWishlist((prev) => prev.filter((w) => w.id !== id));
    showToast("Product deleted from local catalogue.", "info");
  };

  const resetToDefaultProducts = () => {
    setWatches(INITIAL_WATCHES);
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(INITIAL_WATCHES));
    showToast("Reset catalogue to factory authentic collection.", "info");
  };

  // Theme & Lume
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleLumeMode = () => {
    setIsLumeMode((prev) => !prev);
  };

  // Helpers
  const formatPKR = (amount: number): string => {
    return "₨ " + amount.toLocaleString("en-PK");
  };

  // WhatsApp Order Link Generator
  const generateWhatsAppLink = ({
    watch,
    cart: specificCart,
    customerName,
    city,
    notes
  }: {
    watch?: Watch;
    cart?: CartItem[];
    customerName?: string;
    city?: string;
    notes?: string;
  }): string => {
    const greeting = "Hello True Watches Concierge! ⌚";
    let messageBody = `${greeting}\n\n`;

    if (customerName) {
      messageBody += `*Customer Name:* ${customerName.trim()}\n`;
    }
    if (city) {
      messageBody += `*City/Destination:* ${city.trim()}\n`;
    }

    if (watch) {
      const priceFormatted = formatPKR(watch.price);
      messageBody += `\n*Product Order:* ${watch.name}\n`;
      messageBody += `*Brand:* ${watch.brand}\n`;
      messageBody += `*Ref / SKU:* ${watch.id}\n`;
      messageBody += `*Price:* ${priceFormatted}\n`;
      messageBody += `*Quantity:* 1\n`;
      messageBody += `*Total Amount:* ${priceFormatted}\n`;
    } else if (specificCart && specificCart.length > 0) {
      messageBody += `\n*Order Summary (${specificCart.length} item${specificCart.length > 1 ? "s" : ""}):*\n`;
      specificCart.forEach((item, idx) => {
        messageBody += `${idx + 1}. *${item.watch.name}* (Color: ${item.selectedColor || "Standard"})\n`;
        messageBody += `   Qty: ${item.quantity} x ${formatPKR(item.watch.price)} = ${formatPKR(item.watch.price * item.quantity)}\n`;
      });
      messageBody += `\n*Subtotal:* ${formatPKR(cartSubtotal)}\n`;
      if (cartDiscount > 0) {
        messageBody += `*Discount (${appliedCoupon}):* -${formatPKR(cartDiscount)}\n`;
      }
      messageBody += `*Insured Delivery:* ${cartShipping === 0 ? "FREE (Orders > ₨ 50,000)" : formatPKR(cartShipping)}\n`;
      messageBody += `*Grand Total:* ${formatPKR(cartTotal)}\n`;
    }

    if (notes) {
      messageBody += `\n*Special Instructions:* ${notes}\n`;
    }

    messageBody += `\nPlease confirm watch availability and dispatch timetable across Pakistan. Thank you!`;

    const encoded = encodeURIComponent(messageBody);
    return `https://wa.me/${OFFICIAL_WHATSAPP_CLEAN}?text=${encoded}`;
  };

  return (
    <WatchContext.Provider
      value={{
        watches,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaultProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedWatch,
        setSelectedWatch,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAdminOpen,
        setIsAdminOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        theme,
        toggleTheme,
        isLumeMode,
        toggleLumeMode,
        searchQuery,
        setSearchQuery,
        formatPKR,
        generateWhatsAppLink,
        whatsAppNumber: OFFICIAL_WHATSAPP_NUMBER,
        supportEmail: OFFICIAL_EMAIL,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </WatchContext.Provider>
  );
};

export const useWatch = () => {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error("useWatch must be used within a WatchProvider");
  }
  return context;
};
