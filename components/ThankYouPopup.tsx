import React, { useState, useEffect } from 'react';

const ThankYouPopup: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div 
                className={`bg-white rounded-lg shadow-xl p-6 flex items-center space-x-4 transition-all duration-300 ease-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
                <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Thank you!</h3>
                    <p className="text-gray-600">We appreciate your feedback.</p>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPopup;
