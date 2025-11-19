import React, { useEffect, useState } from 'react';

interface PopupProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning';
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, message, type = 'info', onClose, actionText, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation
  };

  const iconColor = type === 'success' ? 'text-green-500' : type === 'warning' ? 'text-yellow-500' : 'text-brand-red';
  const bgIconColor = type === 'success' ? 'bg-green-100' : type === 'warning' ? 'bg-yellow-100' : 'bg-red-100';

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-300 ${isVisible ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'}`}>
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10'}`}
      >
        <div className="p-6 text-center">
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${bgIconColor} mb-6`}>
            {type === 'success' && (
                <svg className={`h-8 w-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            )}
            {type === 'info' && (
                <svg className={`h-8 w-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            {type === 'warning' && (
                <svg className={`h-8 w-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-base mb-8 leading-relaxed">{message}</p>
          
          <div className="flex flex-col gap-3">
            {actionText && onAction && (
                <button 
                    onClick={() => { onAction(); handleClose(); }}
                    className="w-full py-3 px-4 bg-brand-red hover:bg-red-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                    {actionText}
                </button>
            )}
            <button 
                onClick={handleClose}
                className={`w-full py-3 px-4 font-semibold rounded-lg transition-colors duration-200 ${actionText ? 'text-gray-500 hover:bg-gray-100' : 'bg-brand-red text-white hover:bg-red-700 shadow-md'}`}
            >
                {actionText ? 'Close' : 'Got it'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;