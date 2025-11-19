import React from 'react';

const InstagramIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-footer-bg text-white">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white">Ziva.pdf</h2>
              <p className="text-gray-300 text-base">Powered by dxxp</p>
            </div>
            
            <div className="flex space-x-6">
                <a href="https://www.instagram.com/dxxp.inc" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <InstagramIcon />
                </a>
            </div>
          </div>
          
          <div className="mt-12 border-t border-white/20 pt-8">
            <p className="text-base text-gray-300 text-center">&copy; {new Date().getFullYear()} Ziva.pdf. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;