
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DEFAULT_BUSINESS_INFO, DEFAULT_OPERATING_HOURS } from '../constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface BusinessInfo {
  name: string;
  logoUrl: string;
  address: string;
  email: string;
  email_mailto: string;
  map_embed_url: string;
  phone_office: string;
  phone_cell: string;
  phone_tel: string;
  phone_sms: string;
}

type OperatingHours = Record<string, string>;

interface BusinessInfoContextType {
  businessInfo: BusinessInfo;
  operatingHours: OperatingHours;
  isEditorOpen: boolean;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
  setOperatingHours: React.Dispatch<React.SetStateAction<OperatingHours>>;
  toggleEditor: () => void;
  resetInfo: () => void;
}

const BusinessInfoContext = createContext<BusinessInfoContextType | undefined>(undefined);

export const BusinessInfoProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // FIX: Replaced useState with useLocalStorage to save business info changes.
  const [businessInfo, setBusinessInfo] = useLocalStorage<BusinessInfo>('the-shop-business-info', DEFAULT_BUSINESS_INFO);
  const [operatingHours, setOperatingHours] = useLocalStorage<OperatingHours>('the-shop-operating-hours', DEFAULT_OPERATING_HOURS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Update tel and mailto links when phone or email changes
  useEffect(() => {
    setBusinessInfo(prev => {
        const nextState = {...prev};
        let changed = false;
        
        const newMailTo = `mailto:${prev.email}`;
        if (newMailTo !== prev.email_mailto) {
            nextState.email_mailto = newMailTo;
            changed = true;
        }

        const newPhoneTel = `tel:${(prev.phone_office || '').replace(/\D/g, '')}`;
        if (newPhoneTel !== prev.phone_tel) {
            nextState.phone_tel = newPhoneTel;
            changed = true;
        }
        
        const newPhoneSms = `sms:${(prev.phone_cell || '').replace(/\D/g, '')}`;
        if (newPhoneSms !== prev.phone_sms) {
            nextState.phone_sms = newPhoneSms;
            changed = true;
        }
        
        return changed ? nextState : prev;
    });
  }, [businessInfo.email, businessInfo.phone_office, businessInfo.phone_cell, setBusinessInfo]);

  const toggleEditor = () => setIsEditorOpen(prev => !prev);
  
  // FIX: Resetting info now also clears the localStorage values by setting them back to default.
  const resetInfo = () => {
    setBusinessInfo(DEFAULT_BUSINESS_INFO);
    setOperatingHours(DEFAULT_OPERATING_HOURS);
  };

  return (
    <BusinessInfoContext.Provider value={{ businessInfo, operatingHours, isEditorOpen, setBusinessInfo, setOperatingHours, toggleEditor, resetInfo }}>
      {children}
    </BusinessInfoContext.Provider>
  );
};

export const useBusinessInfo = () => {
  const context = useContext(BusinessInfoContext);
  if (context === undefined) {
    throw new Error('useBusinessInfo must be used within a BusinessInfoProvider');
  }
  return context;
};