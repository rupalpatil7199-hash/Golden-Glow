import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const showSuccess = useCallback((msg) => addToast(msg, 'success'), [addToast]);
  const showError = useCallback((msg) => addToast(msg, 'error'), [addToast]);
  const showInfo = useCallback((msg) => addToast(msg, 'info'), [addToast]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      
      {/* Toast Render Node */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`flex items-center justify-between p-4 rounded-lg shadow-luxury border glass cursor-pointer transition-all duration-300 animate-slide-up hover:translate-y-[-2px] ${
              toast.type === 'success' 
                ? 'border-primary-glow/40 bg-white/90 text-luxuryBlack' 
                : toast.type === 'error'
                ? 'border-red-200 bg-red-50/90 text-red-800'
                : 'border-blue-200 bg-blue-50/90 text-blue-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <span className="material-symbols-outlined text-primary-glow fill-icon text-xl">check_circle</span>
              )}
              {toast.type === 'error' && (
                <span className="material-symbols-outlined text-red-500 fill-icon text-xl">error</span>
              )}
              {toast.type === 'info' && (
                <span className="material-symbols-outlined text-blue-500 fill-icon text-xl">info</span>
              )}
              <p className="text-sm font-medium font-sans leading-relaxed">{toast.message}</p>
            </div>
            <button className="material-symbols-outlined text-secondary hover:text-luxuryBlack text-lg">close</button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
