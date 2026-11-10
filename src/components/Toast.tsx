import React from "react";
import { useWatch } from "../context/WatchContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useWatch();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded bg-[#0a0e1a]/95 text-[#dfe1f4] border border-[#38bdf8]/30 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === "success" && (
              <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
            )}
            {toast.type === "warning" && (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            {toast.type === "info" && (
              <Info className="w-4 h-4 text-[#0066ff] shrink-0" />
            )}
            <span className="text-xs font-medium tracking-wide">{toast.message}</span>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
