
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useBusinessInfo } from '../context/BusinessInfoContext';

const Bars3Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);


const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const { toggleEditor: toggleThemeEditor } = useTheme();
  const { businessInfo, toggleEditor: toggleBusinessInfoEditor } = useBusinessInfo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Service', path: '/service' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-brand-gray/95 backdrop-blur-md border-b border-brand-light-gray sticky top-0 z-50 h-20 md:h-28 flex items-center shadow-xl">
      <nav className="container mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo Section */}
        <Link to="/" className="flex items-center h-full py-2">
            {businessInfo.logoUrl && (
              <img 
                src={businessInfo.logoUrl} 
                className="h-16 md:h-24 lg:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                alt={`${businessInfo.name} Logo`} 
              />
            )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center h-full">
          <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `block py-1 transition duration-150 ease-in-out text-base font-bold tracking-wide ${
                      isActive ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-text-body hover:text-brand-blue'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
          </div>
          <div className="flex items-center space-x-6 ml-8 pl-8 border-l border-brand-light-gray">
              <a href={businessInfo.phone_tel} className="text-sm font-black text-text-heading hover:text-brand-blue flex items-center gap-2 transition-all bg-brand-light-gray/30 px-5 py-2.5 rounded-full border border-brand-light-gray/50 shadow-sm hover:shadow-md">
                  <PhoneIcon className="w-4 h-4 text-brand-blue" />
                  <span>{businessInfo.phone_office}</span>
              </a>
              {isLoggedIn && (
                <div className="flex items-center space-x-2">
                  <button onClick={toggleThemeEditor} title="Theme" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700">🎨</button>
                  <button onClick={toggleBusinessInfoEditor} title="Info" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700">📝</button>
                  <button onClick={logout} title="Logout" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700">🚪</button>
                </div>
              )}
          </div>
        </div>


        {/* Mobile Controls */}
        <div className="flex items-center lg:hidden">
           <a href={businessInfo.phone_tel} className="mr-4 text-brand-blue p-2 bg-brand-light-gray/20 rounded-full">
              <PhoneIcon className="w-6 h-6" />
           </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 rounded-xl text-text-muted border border-brand-light-gray hover:bg-brand-light-gray/20"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-gray border-b border-brand-light-gray shadow-2xl animate-in slide-in-from-top duration-200" id="mobile-menu">
          <ul className="flex flex-col space-y-2 p-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 px-6 rounded-2xl transition duration-150 ease-in-out text-xl font-bold ${
                      isActive ? 'bg-brand-blue text-white shadow-lg' : 'text-text-body bg-brand-light-gray/10'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
             {isLoggedIn && (
              <li className="pt-4 mt-4 border-t border-brand-light-gray grid grid-cols-3 gap-3 text-center">
                  <button onClick={() => { toggleThemeEditor(); setIsMenuOpen(false); }} className="py-3 rounded-xl bg-gray-800 text-sm">Theme</button>
                  <button onClick={() => { toggleBusinessInfoEditor(); setIsMenuOpen(false); }} className="py-3 rounded-xl bg-gray-800 text-sm">Info</button>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="py-3 rounded-xl bg-gray-800 text-sm">Logout</button>
              </li>
          )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
