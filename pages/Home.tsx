import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import GoogleMap from '../components/GoogleMap';
import { useAuth } from '../context/AuthContext';
import AdminToolbar from '../components/AdminToolbar';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getIcon } from '../components/IconLibrary';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { businessInfo, operatingHours } = useBusinessInfo();
  // FIX: Replaced useState with the useLocalStorage custom hook to persist content changes.
  const [content, setContent] = useLocalStorage('the-shop-home-content', {
    heroTitle: "Expert Collision Repair & Paint Specialists in **Burnaby**",
    heroSubtitle: "Trusted repairs, precision craftsmanship, and customer-first service.",
    heroImage: "https://res.cloudinary.com/dyjffxbef/image/upload/v1761022109/generate_a_photo_of_a_nice_car_preferably_a_porsche_as_a_cover_photo_for_an_autobody_website_e30rcr.jpg",
    servicesTitle: "Our **Core** Services",
    visitTitle: "Visit Our Shop"
  });
  const [editing, setEditing] = useState<string | null>(null);

  const handleSaveText = (field: keyof typeof content, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          // FIX: Addressed TypeScript error by assigning the narrowed type to a constant 
          // before using it in the state updater, which helps preserve the type within the closure.
          const newImageSrc = event.target.result;
          setContent(prev => ({ ...prev, heroImage: newImageSrc }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  return (
    <div>
      <SEO
        title="Best Auto Body Shop in Burnaby BC | Collision Repair & Painting"
        description="Looking for an autobody shop in Burnaby, BC? The Shop Autobody offers expert collision repair, auto painting, and dent removal. Call us for a free estimate!"
        keywords="Autobody shops Burnaby BC, Collision Repair Burnaby, Auto Body Repair Burnaby, Car Painting Burnaby, ICBC Claim Valet"
      />
      {isLoggedIn && (
        <div className="bg-yellow-500 text-black text-center py-2 sticky top-[68px] z-40">
          <strong>Admin Mode:</strong> You are currently editing the Home page.
        </div>
      )}
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh] md:h-[70vh] flex items-center" style={{ backgroundImage: `url('${content.heroImage}')` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          {editing === 'hero' ? (
            <div className='space-y-4 bg-black/50 p-6 rounded-lg max-w-4xl mx-auto'>
              <div>
                <label className="block text-left text-sm font-medium text-text-body mb-1">Headline</label>
                <textarea
                  className='bg-transparent border border-white rounded-md p-2 text-4xl md:text-6xl tracking-tight w-full leading-tight'
                  value={content.heroTitle}
                  onChange={(e) => handleSaveText('heroTitle', e.target.value)}
                  rows={2}
                />
                <p className="text-xs text-text-muted mt-1 text-left">Use **text** for bold.</p>
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-text-body mb-1">Subtext</label>
                <textarea
                  className='bg-transparent border border-white rounded-md p-2 text-lg md:text-2xl w-full'
                  value={content.heroSubtitle}
                  onChange={(e) => handleSaveText('heroSubtitle', e.target.value)}
                  rows={2}
                />
                <p className="text-xs text-text-muted mt-1 text-left">Use **text** for bold.</p>
              </div>
              <div className='flex flex-wrap justify-center items-center gap-4 pt-4'>
                <label className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer transition-colors duration-300">
                  Change Background Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleHeroImageChange} />
                </label>
                <button onClick={() => setEditing(null)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Done Editing</button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <h1 className="text-4xl md:text-6xl tracking-tight mb-4 text-text-heading">
                <MarkdownRenderer text={content.heroTitle} />
              </h1>
              <p className="text-lg md:text-2xl text-text-body mb-8"><MarkdownRenderer text={content.heroSubtitle} /></p>
              {isLoggedIn && <AdminToolbar onEdit={() => setEditing('hero')} />}
            </div>
          )}
          {editing !== 'hero' && (
            <div className="flex justify-center">
              <Link to="/contact" className="bg-brand-blue hover:brightness-110 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                Get a Free Estimate
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 relative group">
            {editing === 'services' ? (
              <div>
                <input
                  type="text"
                  defaultValue={content.servicesTitle}
                  onBlur={(e) => { handleSaveText('servicesTitle', e.target.value); setEditing(null); }}
                  className="text-3xl md:text-4xl font-bold bg-brand-light-gray p-2 rounded w-full max-w-lg text-center text-text-heading"
                  autoFocus
                />
                <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
              </div>
            ) : (
              <h2 className="text-3xl md:text-4xl text-text-heading"><MarkdownRenderer text={content.servicesTitle} /></h2>
            )}
            <p className="text-text-muted mt-2">From minor dings to major repairs, we've got you covered.</p>
            {isLoggedIn && editing !== 'services' && <AdminToolbar onEdit={() => setEditing('services')} />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, index) => (
              <div key={index} className="bg-brand-gray p-8 rounded-lg text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-brand-blue">
                {/* FIX: Dynamically render icon using getIcon and iconName to support serialization. */}
                <div className="flex justify-center mb-4">{getIcon(service.iconName, { className: "w-12 h-12 text-brand-blue" })}</div>
                <h3 className="text-2xl font-semibold mb-2 text-text-heading">{service.title}</h3>
                <p className="text-text-muted">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/service" className="text-brand-blue hover:brightness-125 font-semibold text-lg transition">
              View All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Location and Hours */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative group mb-4">
              {editing === 'visit' ? (
                <div>
                  <input
                    type="text"
                    defaultValue={content.visitTitle}
                    onBlur={(e) => { handleSaveText('visitTitle', e.target.value); setEditing(null); }}
                    className="text-3xl md:text-4xl font-bold bg-brand-light-gray p-2 rounded w-full text-text-heading"
                    autoFocus
                  />
                  <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
                </div>
              ) : (
                <h2 className="text-3xl md:text-4xl text-text-heading"><MarkdownRenderer text={content.visitTitle} /></h2>
              )}
              {isLoggedIn && editing !== 'visit' && <AdminToolbar onEdit={() => setEditing('visit')} isInline={false} />}
            </div>
            <p className="text-text-muted mb-4">{businessInfo.address}</p>
            <div className="bg-brand-gray p-6 rounded-lg border border-brand-light-gray">
              <h3 className="text-xl text-text-heading mb-4">Operating Hours</h3>
              <ul className="text-text-body space-y-2">
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <li key={day} className="flex justify-between">
                    <span>{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <GoogleMap className="h-96" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;