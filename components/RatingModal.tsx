import React, { useState } from 'react';
import { StarIcon } from '../constants/icons';

interface RatingModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm relative transform scale-100 transition-transform duration-300">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">How would you rate us?</h2>
          <p className="text-gray-600 mb-6">Your feedback helps us improve.</p>
          
          <div className="flex justify-center space-x-2 my-8">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  key={starValue}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none transform hover:scale-125 transition-transform"
                  aria-label={`Rate ${starValue} stars`}
                >
                  <StarIcon
                    className={`w-10 h-10 transition-colors ${
                      starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={rating === 0}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-brand-red hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
