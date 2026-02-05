
import React from 'react';
// FIX: Replaced direct import from constants with the useBusinessInfo hook to get dynamic business data.
import { useBusinessInfo } from '../context/BusinessInfoContext';

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = 'h-64 md:h-96' }) => {
  const { businessInfo } = useBusinessInfo();
  return (
    <div className={`w-full rounded-lg overflow-hidden border-2 border-brand-light-gray shadow-lg ${className}`}>
      <iframe
        src={businessInfo.map_embed_url}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Google Map of ${businessInfo.name} location`}
      ></iframe>
    </div>
  );
};

export default GoogleMap;
