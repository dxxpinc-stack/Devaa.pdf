import React from 'react';

const InstagramIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-footer-bg text-white">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <h2 className="text-3xl font-bold text-white">deva.pdf</h2>
              <p className="text-gray-300 text-base">Powered by dxxp</p>
              <div className="flex space-x-6">
                <a href="https://www.instagram.com/dxxp.inc" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <InstagramIcon />
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Solutions</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Business</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Education</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Developers</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Our Story</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Press</a></li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Pricing</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Tools</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">FAQ</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy & Terms</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Cookie Policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/20 pt-8">
            <p className="text-base text-gray-300 xl:text-center">&copy; 2024 deva.pdf. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;