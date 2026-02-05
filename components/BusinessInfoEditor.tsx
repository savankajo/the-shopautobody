
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useBusinessInfo } from '../context/BusinessInfoContext';

const BusinessInfoEditor: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { businessInfo, setBusinessInfo, operatingHours, setOperatingHours, isEditorOpen, toggleEditor, resetInfo } = useBusinessInfo();

  if (!isLoggedIn || !isEditorOpen) {
    return null;
  }

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOperatingHours(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setBusinessInfo(prev => ({ ...prev, logoUrl: event.target.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  return (
    <div className="fixed bottom-4 right-4 bg-brand-dark border-2 border-brand-light-gray rounded-lg shadow-2xl z-50 p-6 w-full max-w-xs text-text-body">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-text-heading">Business Info Editor</h3>
        <button onClick={toggleEditor} className="text-text-muted hover:text-text-heading text-2xl leading-none">&times;</button>
      </div>
      
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-text-body">Logo</label>
          {businessInfo.logoUrl && <img src={businessInfo.logoUrl} alt="Current logo" className="mt-2 mb-2 bg-white p-2 rounded max-h-16 object-contain" />}
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleLogoChange}
            className="mt-1 block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light-gray file:text-white hover:file:bg-brand-dark"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-body">Business Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={businessInfo.name}
            onChange={handleInfoChange}
            className="mt-1 block w-full bg-brand-light-gray border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-body focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-text-body">Address</label>
          <textarea
            id="address"
            name="address"
            value={businessInfo.address}
            onChange={handleInfoChange}
            rows={3}
            className="mt-1 block w-full bg-brand-light-gray border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-body focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
         <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-body">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={businessInfo.email}
            onChange={handleInfoChange}
            className="mt-1 block w-full bg-brand-light-gray border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-body focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        <div>
          <label htmlFor="phone_office" className="block text-sm font-medium text-text-body">Office Phone (Tel)</label>
          <input
            type="tel"
            id="phone_office"
            name="phone_office"
            value={businessInfo.phone_office}
            onChange={handleInfoChange}
            className="mt-1 block w-full bg-brand-light-gray border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-body focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
         <div>
          <label htmlFor="phone_cell" className="block text-sm font-medium text-text-body">Cell Phone</label>
          <input
            type="tel"
            id="phone_cell"
            name="phone_cell"
            value={businessInfo.phone_cell}
            onChange={handleInfoChange}
            className="mt-1 block w-full bg-brand-light-gray border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-body focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        <div>
            <h4 className="font-semibold mt-6 mb-2 text-text-muted">Operating Hours</h4>
            <div className="space-y-2">
                {Object.entries(operatingHours).map(([day, hours]) => (
                    <div key={day}>
                        <label htmlFor={day} className="block text-sm font-medium text-text-body">{day}</label>
                        <input
                            type="text"
                            id={day}
                            name={day}
                            value={hours}
                            onChange={handleHoursChange}
                            className="mt-1 block w-full bg-brand-light-gray border-gray-600 rounded-md shadow-sm py-2 px-3 text-text-body focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
                        />
                    </div>
                ))}
            </div>
        </div>
      </div>
       <div className="mt-6">
          <button onClick={resetInfo} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
            Reset to Defaults
          </button>
        </div>
    </div>
  );
};

export default BusinessInfoEditor;