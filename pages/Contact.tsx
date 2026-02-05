
import React, { useState } from 'react';
import GoogleMap from '../components/GoogleMap';
import { useAuth } from '../context/AuthContext';
import AdminToolbar from '../components/AdminToolbar';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useBusinessInfo } from '../context/BusinessInfoContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SEO from '../components/SEO';


const Contact: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { businessInfo, operatingHours } = useBusinessInfo();
  // FIX: Page content state is now persisted to localStorage.
  const [content, setContent] = useLocalStorage('the-shop-contact-header', {
    title: "Get in Touch",
    subtitle: "We're here to help. Contact us for a **free estimate** or any questions you may have."
  });
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-brand-dark">
      <SEO
        title="Contact Us - The Shop Autobody Burnaby"
        description="Get a free estimate for your auto body repair. Visit The Shop Autobody at 5156 Still Creek Ave, Burnaby, BC or call us at 778-998-1778."
      />
      {isLoggedIn && (
        <div className="bg-yellow-500 text-black text-center py-2 sticky top-[68px] z-40">
          <strong>Admin Mode:</strong> You are currently editing the Contact page.
        </div>
      )}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12 relative group">
          {editing ? (
            <div className='max-w-3xl mx-auto space-y-4'>
              <input value={content.title} onChange={e => setContent(c => ({ ...c, title: e.target.value }))} className="text-4xl md:text-5xl text-text-heading bg-brand-gray p-2 rounded w-full text-center" />
              <textarea value={content.subtitle} onChange={e => setContent(c => ({ ...c, subtitle: e.target.value }))} className="text-text-muted mt-4 text-lg bg-brand-gray p-2 rounded w-full" rows={2} />
              <p className="text-xs text-text-muted mt-1">Use **text** for bold.</p>
              <button onClick={() => setEditing(false)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Save</button>
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl text-text-heading"><MarkdownRenderer text={content.title} /></h1>
              <p className="text-text-muted mt-4 text-lg"><MarkdownRenderer text={content.subtitle} /></p>
            </>
          )}
          {isLoggedIn && !editing && <AdminToolbar onEdit={() => setEditing(true)} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form replaced with mailto link */}
          <div className="bg-brand-gray p-8 rounded-lg shadow-lg flex flex-col justify-center items-center text-center border border-brand-light-gray">
            <h3 className="text-2xl text-text-heading mb-4">Send Us an Email</h3>
            <p className="text-text-body mb-6 max-w-sm">
              Click the button below to open your default email client and send a message directly to us.
            </p>
            <a
              href={businessInfo.email_mailto}
              className="w-full max-w-xs bg-brand-blue hover:brightness-110 text-white font-bold py-3 px-4 rounded-full transition duration-300 transform hover:scale-105 inline-block"
            >
              Email: {businessInfo.email}
            </a>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-brand-gray p-8 rounded-lg shadow-lg border border-brand-light-gray">
              <h3 className="text-2xl text-text-heading mb-4">Contact Details</h3>
              <p className="text-text-body mb-2"><strong>Address:</strong> {businessInfo.address}</p>
              <p className="text-text-body mb-2"><strong>Tel:</strong> <a href={businessInfo.phone_tel} className="text-brand-blue hover:underline">{businessInfo.phone_office}</a></p>
              <p className="text-text-body mb-2"><strong>Cell:</strong> <a href={`tel:${(businessInfo.phone_cell || '').replace(/\D/g, '')}`} className="text-brand-blue hover:underline">{businessInfo.phone_cell}</a></p>
              <p className="text-text-body"><strong>Email:</strong> <a href={businessInfo.email_mailto} className="text-brand-blue hover:underline">{businessInfo.email}</a></p>

              <h3 className="text-2xl text-text-heading mt-8 mb-4">Hours</h3>
              <ul className="text-text-body space-y-2">
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <li key={day} className="flex justify-between">
                    <span>{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <GoogleMap className="h-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;