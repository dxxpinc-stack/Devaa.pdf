import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const t1 = setTimeout(() => setIsVisible(true), 10);
    
    // Auto dismiss
    const t2 = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation to finish before removing from DOM
      setTimeout(onClose, 300);
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onClose]);

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-brand-red',
    info: 'bg-blue-500',
  };

  const icons = {
    success: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
    ),
    error: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    ),
    info: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
  };

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <div
        className={`${
          bgColors[type]
        } text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 transform transition-all duration-300 ease-out pointer-events-auto ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex-shrink-0">{icons[type]}</div>
        <p className="font-medium">{message}</p>
        <button 
            onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
            className="ml-auto text-white/70 hover:text-white"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;