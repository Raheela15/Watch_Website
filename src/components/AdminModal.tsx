import React, { useState } from "react";
import { useWatch } from "../context/WatchContext";
import { Watch, WatchCategory } from "../types/watch";
import {
  X,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Save,
  Package
} from "lucide-react";

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    watches,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaultProducts,
    formatPKR
  } = useWatch();

  const [editingWatchId, setEditingWatchId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State
  const initialFormState: Omit<Watch, "id"> = {
    name: "",
    brand: "True Watches Atelier",
    category: "chronograph",
    price: 85000,
    originalPrice: 95000,
    discountPercentage: 10,
    rating: 4.8,
    reviewsCount: 12,
    images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85"],
    colors: [{ name: "Obsidian Black", hex: "#0f172a" }],
    movement: "Automatic Calibre TW-800",
    caseDiameter: "41.0 mm",
    caseMaterial: "316L Stainless Steel",
    dialColor: "Sunburst Charcoal",
    strapMaterial: "Solid Link Oystersteel",
    waterResistance: "100m / 330ft",
    powerReserve: "48 Hours",
    powerReservePercent: 75,
    crystal: "Sapphire Crystal AR Coated",
    badge: "New Arrival",
    description: "Handcrafted luxury timepiece with Swiss mechanical precision.",
    stock: 10,
    inStock: true
  };

  const [formData, setFormData] = useState<Omit<Watch, "id">>(initialFormState);
  const [imageInput, setImageInput] = useState("");

  if (!isAdminOpen) return null;

  const startEdit = (w: Watch) => {
    setEditingWatchId(w.id);
    setIsAddingNew(false);
    setFormData({
      name: w.name,
      brand: w.brand,
      category: w.category,
      price: w.price,
      originalPrice: w.originalPrice,
      discountPercentage: w.discountPercentage,
      rating: w.rating,
      reviewsCount: w.reviewsCount,
      images: [...w.images],
      colors: [...w.colors],
      movement: w.movement,
      caseDiameter: w.caseDiameter,
      caseMaterial: w.caseMaterial,
      dialColor: w.dialColor,
      strapMaterial: w.strapMaterial,
      waterResistance: w.waterResistance,
      powerReserve: w.powerReserve,
      powerReservePercent: w.powerReservePercent,
      crystal: w.crystal,
      badge: w.badge,
      description: w.description,
      stock: w.stock,
      inStock: w.inStock
    });
    setImageInput(w.images[0] || "");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const finalImages = imageInput.trim() ? [imageInput.trim(), ...formData.images.filter(img => img !== imageInput.trim())] : formData.images;

    if (isAddingNew) {
      addProduct({ ...formData, images: finalImages });
      setIsAddingNew(false);
    } else if (editingWatchId) {
      updateProduct(editingWatchId, { ...formData, images: finalImages });
      setEditingWatchId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl glass-panel-elevated rounded-xl border border-white/15 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0a0e1a]/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-[#38bdf8]" />
            <div>
              <h2 className="font-serif text-lg font-medium text-white">
                Catalogue Administration Console
              </h2>
              <p className="text-[10px] font-mono text-slate-400">
                Evaluation Demo Interface • Client-Side Local Storage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm("Reset all timepieces to original factory authentic list?")) {
                  resetToDefaultProducts();
                }
              }}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 border border-white/10 transition-colors"
              title="Reset products to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Factory Demo</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security & Client-Side Storage Disclaimer Banner */}
        <div className="px-6 py-3 bg-amber-950/40 border-b border-amber-500/30 text-xs text-amber-200 flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-[11px] leading-relaxed">
            <strong>Architecture Notice:</strong> Changes in this console are persisted in your browser's <code>LocalStorage</code> for evaluation. Client-side storage is not encrypted and must not be used for production administration. For a live production deployment, integrate server-side RBAC and Firestore/PostgreSQL.
          </p>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Action Bar */}
          {!isAddingNew && !editingWatchId && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Total Catalogue Timepieces: <strong className="text-white">{watches.length}</strong>
              </span>

              <button
                onClick={() => {
                  setIsAddingNew(true);
                  setEditingWatchId(null);
                  setFormData(initialFormState);
                  setImageInput(initialFormState.images[0]);
                }}
                className="px-4 py-2 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 border border-[#38bdf8]/40 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Timepiece</span>
              </button>
            </div>
          )}

          {/* Add / Edit Form */}
          {(isAddingNew || editingWatchId) && (
            <form onSubmit={handleSave} className="p-6 rounded-lg bg-[#0a0e1a] border border-[#38bdf8]/40 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-serif text-base text-white font-medium flex items-center gap-2">
                  <Edit2 className="w-4 h-4 text-[#38bdf8]" />
                  <span>{isAddingNew ? "Add New Watch to Catalogue" : `Editing: ${formData.name}`}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingWatchId(null);
                  }}
                  className="text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Watch Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as WatchCategory })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  >
                    <option value="men">Men's Watches</option>
                    <option value="women">Women's Watches</option>
                    <option value="luxury">Luxury / Haute Horlogerie</option>
                    <option value="chronograph">Chronograph</option>
                    <option value="sports">Sports & Diver</option>
                    <option value="smart">Smartwatches</option>
                    <option value="casual-formal">Casual & Formal</option>
                    <option value="minimalist">Minimalist</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Price in PKR *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Original Price (PKR)</label>
                  <input
                    type="number"
                    value={formData.originalPrice || ""}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value), inStock: Number(e.target.value) > 0 })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Badge Tag</label>
                  <select
                    value={formData.badge || ""}
                    onChange={(e) => setFormData({ ...formData, badge: (e.target.value as any) || undefined })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  >
                    <option value="">None</option>
                    <option value="Unique Piece">Unique Piece</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                    <option value="Limited Edition">Limited Edition</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Movement Calibre</label>
                  <input
                    type="text"
                    value={formData.movement}
                    onChange={(e) => setFormData({ ...formData, movement: e.target.value })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Case Diameter</label>
                  <input
                    type="text"
                    value={formData.caseDiameter}
                    onChange={(e) => setFormData({ ...formData, caseDiameter: e.target.value })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Water Resistance</label>
                  <input
                    type="text"
                    value={formData.waterResistance}
                    onChange={(e) => setFormData({ ...formData, waterResistance: e.target.value })}
                    className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div className="text-xs font-mono">
                <label className="text-slate-400 block mb-1">Image URL (Unsplash or direct asset)</label>
                <input
                  type="url"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div className="text-xs font-mono">
                <label className="text-slate-400 block mb-1">Watch Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#101934] border border-white/15 rounded px-3 py-1.5 text-white outline-none focus:border-[#38bdf8] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingWatchId(null);
                  }}
                  className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Timepiece</span>
                </button>
              </div>
            </form>
          )}

          {/* Delete confirmation dialog */}
          {deleteConfirmId && (
            <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-500/50 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-rose-300 font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Confirm Deletion of Timepiece</span>
              </div>
              <p className="text-slate-400">
                Are you sure you want to permanently remove this watch from the demo catalogue?
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    deleteProduct(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-mono"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-3 py-1 rounded bg-white/10 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Products Table List */}
          <div className="border border-white/10 rounded-lg overflow-x-auto bg-[#0a0e1a]/60">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#101934] text-slate-400 border-b border-white/10 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Timepiece</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price (PKR)</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Calibre</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {watches.map((w) => (
                  <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={w.images[0]}
                        alt={w.name}
                        className="w-10 h-10 object-cover rounded bg-black shrink-0 border border-white/10"
                      />
                      <div>
                        <p className="font-serif text-xs text-white font-medium">{w.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase">{w.brand}</p>
                      </div>
                    </td>
                    <td className="p-3 text-slate-300 capitalize">{w.category}</td>
                    <td className="p-3 text-[#38bdf8] font-bold">{formatPKR(w.price)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${w.stock > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                        {w.stock} in stock
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 truncate max-w-[140px]">{w.movement}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => startEdit(w)}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(w.id)}
                          className="p-1.5 rounded bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
