import { createContext, useCallback, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Lightweight toast notification system shared across the app.
 * Wrap the app (or a layout) with <ToastProvider> and call useToast()
 * anywhere beneath it to push a transient message.
 */

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const showToast = useCallback((message, type = "success", duration = 3200) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type, leaving: false }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    }, duration - 220);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {createPortal(
        <div className="toastStack">
          {toasts.map((t) => (
            <div key={t.id} className={`toast ${t.type} ${t.leaving ? "leaving" : ""}`}>
              {t.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
