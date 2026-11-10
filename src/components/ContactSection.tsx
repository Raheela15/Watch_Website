import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Info
} from "lucide-react";
import { useWatch, OFFICIAL_WHATSAPP_NUMBER } from "../context/WatchContext";

export const ContactSection: React.FC = () => {
  const { supportEmail, showToast } = useWatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email format";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      showToast("Inquiry recorded! Thank you for contacting True Watches.", "success");
    }
  };

  const handleMailtoDispatch = () => {
    const subject = encodeURIComponent(formData.subject || "True Watches Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#0066ff]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#38bdf8]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#38bdf8] font-semibold">
            Concierge & Boutique Salon
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Private Horological Consultation
          </h2>
          <p className="text-sm text-[#94a3b8] font-light">
            Whether inquiring about our custom chronographs, arranging private dial viewing in Lahore or Karachi, 
            or requesting technical caliber servicing, our master horologists are at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div className="glass-panel p-6 rounded-lg space-y-3 border-l-4 border-l-[#0066ff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#0066ff]/20 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Direct Official Email</h3>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="font-serif text-base font-semibold text-white hover:text-[#38bdf8] transition-colors break-all"
                  >
                    {supportEmail}
                  </a>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light">
                Click above to compose directly in your default email client. Replies guaranteed within 4 hours.
              </p>
            </div>

            {/* Direct Phone & WhatsApp Card */}
            <div className="glass-panel p-6 rounded-lg space-y-3 border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Phone & WhatsApp Hotline</h3>
                  <a
                    href={`https://wa.me/923345678900`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-base font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    {OFFICIAL_WHATSAPP_NUMBER}
                  </a>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light">
                Direct WhatsApp consultation with our master watchmakers in Pakistan. Available 7 days a week.
              </p>
            </div>

            {/* Pakistan Salons & Showrooms */}
            <div className="glass-panel p-6 rounded-lg space-y-4">
              <h3 className="font-serif text-base font-medium text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#38bdf8]" />
                <span>Showroom Salons in Pakistan</span>
              </h3>

              <div className="space-y-3 text-xs divide-y divide-white/5 font-light text-slate-300">
                <div className="pt-2">
                  <p className="font-mono font-semibold text-white">Lahore Flagship Atelier</p>
                  <p className="text-slate-400">Suite 402, Al-Hafeez Heights, Gulberg III, Lahore, Punjab</p>
                </div>
                <div className="pt-2">
                  <p className="font-mono font-semibold text-white">Karachi Private Salon</p>
                  <p className="text-slate-400">Ocean Mall Executive Tower, Clifton Block 9, Karachi, Sindh</p>
                </div>
                <div className="pt-2">
                  <p className="font-mono font-semibold text-white">Islamabad Consultation Lounge</p>
                  <p className="text-slate-400">Beverly Centre, Jinnah Avenue, Blue Area, Islamabad</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-[#38bdf8] border-t border-white/5">
                <Clock className="w-3.5 h-3.5" />
                <span>Monday – Saturday: 11:00 AM – 9:00 PM PKT</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation & Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-elevated p-6 sm:p-8 rounded-lg space-y-6">
              
              <div>
                <h3 className="font-serif text-xl font-medium text-white">
                  Send a Detailed Caliber Inquiry
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-light">
                  Complete the form below to receive immediate consultation on availability, custom straps, or private viewing.
                </p>
              </div>

              {/* Informational backend disclosure as required by prompt */}
              <div className="p-3.5 rounded bg-[#0a0e1a] border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong className="text-white">Note on Delivery:</strong> This frontend application validates your form entries. For automatic production background dispatch, an authenticated SMTP service or API is required. You can also click the mail client or WhatsApp dispatch buttons below.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-xl text-white">Inquiry Form Validated!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry regarding "
                    <strong className="text-[#38bdf8]">{formData.subject}</strong>" has been processed.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleMailtoDispatch}
                      className="px-5 py-2.5 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono font-semibold flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Dispatch via Your Email Client</span>
                    </button>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-mono"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-slate-300 block mb-1">
                        Full Name <span className="text-[#38bdf8]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tariq Mehmood"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-[#050814] border ${
                          formErrors.name ? "border-rose-500" : "border-white/15"
                        } rounded px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8]`}
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-300 block mb-1">
                        Email Address <span className="text-[#38bdf8]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. tariq@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-[#050814] border ${
                          formErrors.email ? "border-rose-500" : "border-white/15"
                        } rounded px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8]`}
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-slate-300 block mb-1">
                        Contact Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#050814] border border-white/15 rounded px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-300 block mb-1">
                        Inquiry Subject <span className="text-[#38bdf8]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. True Chronos Calibre Inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full bg-[#050814] border ${
                          formErrors.subject ? "border-rose-500" : "border-white/15"
                        } rounded px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8]`}
                      />
                      {formErrors.subject && (
                        <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1">
                      Message / Specifications <span className="text-[#38bdf8]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please specify any reference numbers, wrist sizes, or special delivery instructions across Pakistan..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-[#050814] border ${
                        formErrors.message ? "border-rose-500" : "border-white/15"
                      } rounded px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8] resize-none`}
                    />
                    {formErrors.message && (
                      <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded bg-[#0066ff] hover:bg-[#1a75ff] text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleMailtoDispatch}
                      className="w-full sm:w-auto px-5 py-3 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>Open in Mail Client</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
