
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBusinessInfo } from '../context/BusinessInfoContext';

const Footer: React.FC = () => {
  const { openLoginModal } = useAuth();
  const { businessInfo, operatingHours } = useBusinessInfo();

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openLoginModal();
  };

  return (
    <footer className="bg-brand-gray border-t border-brand-light-gray">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-text-heading mb-4">{businessInfo.name}</h3>
            <p className="text-text-muted">{businessInfo.address}</p>
            <p className="mt-2">
              <a href={businessInfo.email_mailto} className="text-text-body hover:text-brand-blue transition">{businessInfo.email}</a>
            </p>
             <p className="mt-2">
              <a href={businessInfo.phone_tel} className="text-text-body hover:text-brand-blue transition">Tel: {businessInfo.phone_office}</a>
            </p>
             <p className="mt-2">
              <a href={`tel:${(businessInfo.phone_cell || '').replace(/\D/g, '')}`} className="text-text-body hover:text-brand-blue transition">Cell: {businessInfo.phone_cell}</a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-heading mb-4">Operating Hours</h3>
            <ul className="text-text-muted space-y-2">
              {Object.entries(operatingHours).map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-heading mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-text-body hover:text-brand-blue transition">Home</Link></li>
              <li><Link to="/service" className="text-text-body hover:text-brand-blue transition">Service</Link></li>
              <li><Link to="/about-us" className="text-text-body hover:text-brand-blue transition">About Us</Link></li>
              <li><Link to="/contact" className="text-text-body hover:text-brand-blue transition">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-light-gray pt-6 text-center text-text-muted">
          <p>&copy; {new Date().getFullYear()} {businessInfo.name}. All Rights Reserved.</p>
          <p className="text-sm mt-2">
            This website is a demonstration and does not represent a real business. Contact form submissions are not monitored.
            {' | '}
            <a href="#" onClick={handleAdminClick} className="hover:underline text-text-muted">Admin</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;