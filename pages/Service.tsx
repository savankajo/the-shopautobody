import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, WHY_CHOOSE_US } from '../constants';
import type { Service } from '../types';
import { useAuth } from '../context/AuthContext';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getIcon } from '../components/IconLibrary';
import SEO from '../components/SEO';

const Service: React.FC = () => {
  const { isLoggedIn } = useAuth();
  // FIX: useState replaced with useLocalStorage to make content edits persist across sessions.
  const [services, setServices] = useLocalStorage<Service[]>('the-shop-services', SERVICES);
  const [whyChooseUs, setWhyChooseUs] = useLocalStorage('the-shop-why-choose-us', WHY_CHOOSE_US);


  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [editingWhyIndex, setEditingWhyIndex] = useState<number | null>(null);

  const handleRemoveService = (index: number) => {
    if (window.confirm("Are you sure you want to remove this service?")) {
      setServices(s => s.filter((_, i) => i !== index));
    }
  };

  const handleAddService = () => {
    const newService: Service = {
      // FIX: Use a default icon name for new services.
      iconName: 'PlusCircleIcon',
      title: 'New Service',
      description: 'Describe the new service here.',
    };
    setServices(s => [...s, newService]);
    setEditingServiceIndex(services.length); // Start editing the new item right away
  };

  const handleRemoveWhy = (index: number) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setWhyChooseUs(w => w.filter((_, i) => i !== index));
    }
  };

  const handleAddWhy = () => {
    const newWhy = {
      title: "New Advantage",
      description: "Describe the new advantage here."
    };
    setWhyChooseUs(w => [...w, newWhy]);
    setEditingWhyIndex(whyChooseUs.length);
  };


  return (
    <div className="bg-brand-dark">
      <SEO
        title="Our Services - Collision Repair, Painting & More | Burnaby Autobody"
        description="Full-service autobody repair in Burnaby, BC. Services include collision repair, dent removal, auto painting, scratch repair, and ICBC claims assistance."
      />
      {isLoggedIn && (
        <div className="bg-yellow-500 text-black text-center py-2 sticky top-[68px] z-40">
          <strong>Admin Mode:</strong> You are currently editing the Service page.
        </div>
      )}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-text-heading">Our Services</h1>
          <p className="text-text-muted mt-4 text-lg">We handle everything from minor scratches to major collision repairs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="relative bg-brand-gray p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-brand-blue">
              {/* FIX: Icon is now dynamically rendered via getIcon, enabling state to be stored in localStorage. */}
              <div className="mb-4">{getIcon(service.iconName, { className: "w-12 h-12 text-brand-blue" })}</div>
              {editingServiceIndex === index ? (
                <div className='flex-grow w-full space-y-2'>
                  <input type="text" value={service.title} onChange={e => setServices(s => s.map((item, i) => i === index ? { ...item, title: e.target.value } : item))} className="text-2xl font-semibold mb-3 text-text-heading bg-brand-light-gray p-2 rounded w-full text-center" />
                  <textarea value={service.description} onChange={e => setServices(s => s.map((item, i) => i === index ? { ...item, description: e.target.value } : item))} className="text-text-muted flex-grow bg-brand-light-gray p-2 rounded w-full" rows={3} />
                  <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold mb-3 text-text-heading"><MarkdownRenderer text={service.title} /></h3>
                  <p className="text-text-muted flex-grow"><MarkdownRenderer text={service.description} /></p>
                </>
              )}
              {isLoggedIn && (
                <div className="mt-4 flex space-x-2">
                  <button onClick={() => setEditingServiceIndex(editingServiceIndex === index ? null : index)} className="bg-brand-blue hover:brightness-110 text-white font-bold py-1 px-3 rounded text-sm">{editingServiceIndex === index ? 'Save' : 'Edit'}</button>
                  <button onClick={() => handleRemoveService(index)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Remove</button>
                </div>
              )}
            </div>
          ))}
          {isLoggedIn && (
            <div className="flex items-center justify-center bg-brand-gray rounded-lg border-2 border-dashed border-brand-light-gray hover:bg-gray-600 transition">
              <button onClick={handleAddService} className="text-text-heading font-bold text-lg p-8">+ Add Service</button>
            </div>
          )}
        </div>

        <div className="bg-brand-gray rounded-lg p-10 md:p-16 border border-brand-light-gray">
          <h2 className="text-3xl md:text-4xl text-center mb-10 text-text-heading">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex items-start">
                <svg className="w-6 h-6 text-brand-blue mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div className='flex-grow'>
                  {editingWhyIndex === index ? (
                    <div className='space-y-2'>
                      <input value={item.title} onChange={e => setWhyChooseUs(w => w.map((x, i) => i === index ? { ...x, title: e.target.value } : x))} className="font-semibold text-xl text-text-heading bg-brand-light-gray p-2 rounded w-full" />
                      <textarea value={item.description} onChange={e => setWhyChooseUs(w => w.map((x, i) => i === index ? { ...x, description: e.target.value } : x))} className="text-text-muted bg-brand-light-gray p-2 rounded w-full" rows={2} />
                      <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-xl text-text-heading"><MarkdownRenderer text={item.title} /></h4>
                      <p className="text-text-muted"><MarkdownRenderer text={item.description} /></p>
                    </div>
                  )}
                  {isLoggedIn && (
                    <div className="mt-2 flex space-x-2">
                      <button onClick={() => setEditingWhyIndex(editingWhyIndex === index ? null : index)} className="bg-brand-blue hover:brightness-110 text-white font-bold py-1 px-3 rounded text-sm">{editingWhyIndex === index ? 'Save' : 'Edit'}</button>
                      <button onClick={() => handleRemoveWhy(index)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Remove</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoggedIn && (
              <div className="flex items-center justify-center bg-brand-dark rounded-lg border-2 border-dashed border-brand-light-gray hover:bg-brand-light-gray transition">
                <button onClick={handleAddWhy} className="text-text-heading font-bold text-lg p-8">+ Add Item</button>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/contact" className="bg-brand-blue hover:brightness-110 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Book a Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;