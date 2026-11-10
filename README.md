# True Watches — Premium Luxury Watch E-Commerce

**True Watches** is a modern, responsive luxury watch e-commerce platform built with Next.js/React, TypeScript, Tailwind CSS, and browser Local Storage. Designed according to the **Obsidian Chronometry** design specification: dark obsidian canvas, dual-layer glassmorphism, hairline sapphire borders, Super-LumiNova cyan highlights, and Swiss micro-mechanical horology aesthetics.

> **Tagline:** *"Time Builds Legends"*  
> **Headline:** *"More Than Time. It's a Lifestyle."*

---

## 🌟 Key Features

### 1. Luxury Design & Horological Visual Identity
- **Obsidian Chronometry:** Nocturnal deep canvas (`#050814`), elevated frosted glass tiers, and hairline platinum borders.
- **Super-LumiNova™ Dial Glow Simulator:** Interactive toggle that drops ambient lighting to obsidian night and illuminates the phosphorescent watch hands and indices.
- **Theme Switcher:** Seamless toggle between Obsidian Nocturne (Dark) and Alabaster Pearl (Light).

### 2. Comprehensive Watch Collections
- **Categories:** Men's Watches, Women's Watches, Haute Horlogerie (Luxury), Chronographs, Sports & Divers (300M Titanium), Smartwatches (Quantum AMOLED), Casual & Formal, Minimalist.
- **Realistic Horological Data & Specifications:**
  - Column-wheel chronographs, flying tourbillon, Japanese slim automatics, dual-core smartwatches.
  - Case diameters, 904L Oystersteel, Grade 5 Titanium, sapphire crystals, water resistance ratings (50m to 300m).
  - Dynamic **Power Reserve Complication Gauges** displaying live caliber energy reserve.
  - All pricing in **Pakistani Rupees (PKR - ₨)** with realistic market values and original discount strikes.

### 3. Interactive Product Inspection
- High-resolution multi-angle macro photography.
- Interactive **Hover Zoom / Magnifier Lens** for examining dial textures, guilloché registers, and beveled hands.
- Color and finish switcher (Sunburst Blue, Obsidian Black, Rhodium, Rose Gold, Titanium).
- Stock status counter and quantity stepper.
- Full **Horological Spec Matrix**.

### 4. Shopping Cart & Local Storage Persistence
- Fully persistent cart across sessions using browser `LocalStorage`.
- Free Insured Express Delivery tracker (Free on orders above **₨ 50,000** across Pakistan).
- Working promo coupon engine:
  - `LEGEND10`: 10% discount
  - `TIME15`: 15% VIP discount
  - `WELCOME5`: 5% welcome discount
- Clear cart with confirmation prompt.

### 5. Official WhatsApp Integration
- Floating concierge button on every page with live assistance badge.
- Direct **"Order on WhatsApp"** button on product cards, quick view, product modal, and full cart checkout.
- Concierge Number: **`+92 334 5678900`** (Pakistan international format).
- Generates clean, structured pre-filled order messages:
  - Product Name & Reference ID
  - Unit Price & Selected Finish
  - Quantity & Calculated Total
  - Recipient Name and Destination City (Karachi, Lahore, Islamabad, etc.)
  - Opens `https://wa.me/923345678900` for user verification without false claims of automatic completion.

### 6. Email Contact & Pakistan Boutique Showrooms
- Official Email: `raheelarani686@gmail.com` with one-click `mailto:` composer.
- Contact form with name, email validation, phone, subject, and message.
- Transparent disclaimer explaining that frontend forms require backend SMTP/API services for automated dispatch.
- Physical salon locations in Lahore (Gulberg III), Karachi (Clifton), and Islamabad (Blue Area).

### 7. Catalogue Administration Console (Demo Mode)
- Add new watch timepieces with custom images, prices, calibers, and specifications.
- Edit existing timepieces in the catalogue.
- Delete timepieces with confirmation safeguard.
- Instant "Reset Factory Demo" button to restore initial authentic collection.
- Local Storage disclaimer emphasizing that client-side storage is for evaluation, not secure production access control.

### 8. Full Mobile-First Responsiveness
- Tested across Android, iPhone, iPad/tablet, laptop, and 4K desktop screens.
- Zero horizontal overflow, touch-optimized steppers, collapsible mobile filter drawers, and slide-over navigation.

---

## 🛠️ Tech Stack

- **Framework:** React 19 / Vite / TypeScript
- **Styling:** Tailwind CSS v4 with custom Obsidian Chronometry theme tokens
- **Icons:** Lucide React
- **Animations:** Framer Motion / Motion primitives & Tailwind transitions
- **State & Storage:** React Context API + LocalStorage (`tw_cart_v1`, `tw_wishlist_v1`, `tw_products_v1`, `tw_theme_v1`)

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run TypeScript linter
npm run lint
```
