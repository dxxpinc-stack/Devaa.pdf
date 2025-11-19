import React, { useState } from 'react';
import { TOOLS } from '../constants/tools';
import ToolCard from '../components/ToolCard';
import { StarIcon } from '../constants/icons';
import RatingModal from '../components/RatingModal';
import ThankYouPopup from '../components/ThankYouPopup';

const HomePage: React.FC = () => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  const handleRatingSubmit = () => {
    setIsRatingModalOpen(false);
    setShowThankYouPopup(true);
    setTimeout(() => {
      setShowThankYouPopup(false);
    }, 3000);
  };

  return (
    <div className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-charcoal-text leading-tight">
          Every PDF tool you need, in one place
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-700">
          Your ultimate destination for effortless PDF management. Convert, edit, and secure your documents with our comprehensive suite of powerful and user-friendly tools.
        </p>
        <div className="flex items-center justify-center mt-8">
          <button 
            onClick={() => setIsRatingModalOpen(true)}
            className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Rate the application"
          >
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => {
                  // Render 4 full stars for the '4' in 4.7
                  if (i < 4) {
                      return <StarIcon key={i} className="w-6 h-6 text-yellow-400" />;
                  }
                  // For the 5th star, create a partially filled one to represent the '.7'
                  if (i === 4) {
                      return (
                          <div key={i} className="relative w-6 h-6">
                              {/* Background gray star */}
                              <StarIcon className="absolute top-0 left-0 w-6 h-6 text-gray-300" />
                              {/* Foreground yellow star, clipped by the parent div's width */}
                              <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: '70%' }}>
                                  <StarIcon className="w-6 h-6 text-yellow-400" />
                              </div>
                          </div>
                      );
                  }
                  // This case should not be reached with Array(5)
                  return null;
              })}
            </div>
            <p className="ml-3 text-gray-700 font-medium">
              Rated <span className="font-bold text-charcoal-text">4.7 / 5</span> by our users
            </p>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
      
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal-text">Why choose deva.pdf?</h2>
            <p className="mt-4 text-lg text-gray-700">We simplify your document workflow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-red/10 text-brand-red mx-auto mb-4">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Fast & Efficient</h3>
                <p className="mt-2 text-gray-600">Our tools are optimized for speed, processing your files in seconds without compromising quality.</p>
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-medium-gray/10 text-medium-gray mx-auto mb-4">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Secure & Private</h3>
                <p className="mt-2 text-gray-600">We prioritize your privacy. Files are encrypted and automatically deleted from our servers.</p>
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-medium-gray/10 text-medium-gray mx-auto mb-4">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Universally Accessible</h3>
                <p className="mt-2 text-gray-600">Access our full suite of tools from any device with a web browser. No installation needed.</p>
            </div>
          </div>
        </div>
      </section>
      
      {isRatingModalOpen && <RatingModal onClose={() => setIsRatingModalOpen(false)} onSubmit={handleRatingSubmit} />}
      {showThankYouPopup && <ThankYouPopup />}
    </div>
  );
};

export default HomePage;