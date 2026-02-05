
import React, { useState } from 'react';
import { useBusinessInfo } from '../context/BusinessInfoContext';

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MessageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const FloatingCallButton: React.FC = () => {
  const { businessInfo } = useBusinessInfo();
  const [isOpen, setIsOpen] = useState(false);

  const cellCallLink = `tel:${(businessInfo.phone_cell || '').replace(/\D/g, '')}`;

  const options = [
    {
      label: 'Call Now',
      href: cellCallLink,
      icon: <PhoneIcon className="h-6 w-6" />,
      bgColor: 'bg-brand-blue',
      hoverBgColor: 'hover:bg-blue-700'
    },
    {
      label: 'Send a Message',
      href: businessInfo.phone_sms,
      icon: <MessageIcon className="h-6 w-6" />,
      bgColor: 'bg-green-500',
      hoverBgColor: 'hover:bg-green-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col-reverse items-center gap-4">

        {/* Main toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isOpen ? 'bg-red-600 hover:bg-red-700 rotate-180' : 'bg-brand-blue hover:bg-blue-700'
          }`}
          aria-label={isOpen ? "Close options" : "Open contact options"}
        >
          {isOpen ? <CloseIcon /> : <PhoneIcon />}
        </button>
        
        {/* Options menu */}
        <div 
          className={`flex flex-col items-center gap-4 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {options.map((option, index) => (
            <a
              key={option.label}
              href={option.href}
              className={`transition-all duration-300 ${option.bgColor} ${option.hoverBgColor} text-white p-4 rounded-full shadow-lg transform hover:scale-110 flex items-center justify-center ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              aria-label={option.label}
              style={{ transitionDelay: isOpen ? `${index * 75}ms` : '0ms' }}
            >
              {option.icon}
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FloatingCallButton;