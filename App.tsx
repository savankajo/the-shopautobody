import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import SEO from './SEO';
import {
  DEFAULT_BUSINESS_INFO,
  DEFAULT_OPERATING_HOURS,
  OUR_WORK_GALLERY,
  SERVICES,
  TESTIMONIALS,
  WHY_CHOOSE_US,
} from './constants';

const heroImage = 'https://res.cloudinary.com/dyjffxbef/image/upload/v1761022109/generate_a_photo_of_a_nice_car_preferably_a_porsche_as_a_cover_photo_for_an_autobody_website_e30rcr.jpg';
const shopImage = heroImage;
const bookingUrl = 'https://app.shopmonkey.cloud/public/quote-request/eb3be441-fedd-4a91-bb70-5b54b244be85?noExternalScripts=1';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/service' },
  { label: 'About', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
];

function iconFor(name: string) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'PaintBrushIcon':
      return <svg {...common}><path d="M18.4 3.6 20.4 5.6a2 2 0 0 1 0 2.8l-8.7 8.7-4.8-4.8 8.7-8.7a2 2 0 0 1 2.8 0Z" /><path d="M6.2 13.1 4.5 14.8a3.2 3.2 0 0 0-.8 3.2l.5 1.8 1.8.5a3.2 3.2 0 0 0 3.2-.8l1.7-1.7" /></svg>;
    case 'ShieldCheckIcon':
      return <svg {...common}><path d="M12 3 19 6v5c0 4.6-2.9 8.8-7 10-4.1-1.2-7-5.4-7-10V6l7-3Z" /><path d="m9 12 2 2 4-5" /></svg>;
    case 'SparklesIcon':
      return <svg {...common}><path d="m12 3 1.6 5.1L19 10l-5.4 1.9L12 17l-1.6-5.1L5 10l5.4-1.9L12 3Z" /><path d="m18 16 .7 2.2L21 19l-2.3.8L18 22l-.7-2.2L15 19l2.3-.8L18 16Z" /></svg>;
    case 'Cog6ToothIcon':
      return <svg {...common}><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" /><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2 3.5-.2-.1a1.8 1.8 0 0 0-2 .4l-.4.4H8.7l-.4-.4a1.8 1.8 0 0 0-2-.4l-.2.1-2-3.5.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.6-1.2H3v-4h.1a1.8 1.8 0 0 0 1.6-1.2 1.8 1.8 0 0 0-.4-2l-.1-.1 2-3.5.2.1a1.8 1.8 0 0 0 2-.4l.4-.4h6.6l.4.4a1.8 1.8 0 0 0 2 .4l.2-.1 2 3.5-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1.2h.1v4h-.1A1.8 1.8 0 0 0 19.4 15Z" /></svg>;
    case 'CarIcon':
      return <svg {...common}><path d="M5 13 7 7.5A2.3 2.3 0 0 1 9.2 6h5.6A2.3 2.3 0 0 1 17 7.5l2 5.5" /><path d="M4 13h16v5H4z" /><path d="M6.5 18v2" /><path d="M17.5 18v2" /><path d="M7 15h.1" /><path d="M17 15h.1" /></svg>;
    default:
      return <svg {...common}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-5.1 5.1a2 2 0 1 0 2.8 2.8l5.1-5.1a4 4 0 0 0 5.4-5.4l-2.7 2.7-2.2-2.2 2.7-2.7Z" /></svg>;
  }
}

function useReveal(dependency: string) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [dependency]);
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="The Shop Autobody home">
          <img src={DEFAULT_BUSINESS_INFO.logoUrl} alt="" />
          <span>
            <strong>The Shop Autobody</strong>
            <small>Burnaby collision repair</small>
          </span>
        </Link>
        <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen((value) => !value)}>
          <span></span><span></span><span></span>
          <span className="sr-only">Menu</span>
        </button>
        <nav id="primary-nav" className={open ? 'primary-nav open' : 'primary-nav'} aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : undefined}>
              {item.label}
            </NavLink>
          ))}
          <a className="nav-call" href={DEFAULT_BUSINESS_INFO.phone_tel}>Call now</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <img className="footer-logo" src={DEFAULT_BUSINESS_INFO.logoUrl} alt="The Shop Autobody" />
          <p>Premium collision repair, refinishing, and auto body service for Burnaby and Metro Vancouver drivers.</p>
        </div>
        <div>
          <h3>Contact</h3>
          <a href={DEFAULT_BUSINESS_INFO.phone_tel}>{DEFAULT_BUSINESS_INFO.phone_office}</a>
          <a href={DEFAULT_BUSINESS_INFO.email_mailto}>{DEFAULT_BUSINESS_INFO.email}</a>
          <span>{DEFAULT_BUSINESS_INFO.address}</span>
        </div>
        <div>
          <h3>Hours</h3>
          {Object.entries(DEFAULT_OPERATING_HOURS).map(([day, hours]) => <span key={day}>{day}: {hours}</span>)}
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} The Shop Autobody. All rights reserved.</div>
    </footer>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-intro" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="hero-overlay" />
      <div className="hero-content" data-reveal>
        <h1>Collision Repair That Brings Your Vehicle Back With Confidence.</h1>
        <p className="hero-copy">From accident damage and precision paint matching to dents, panels, wraps, tint, oil, and brakes, The Shop Autobody delivers premium workmanship with clear communication.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={bookingUrl} target="_blank" rel="noreferrer">Book appointment</a>
          <a className="btn btn-secondary" href={DEFAULT_BUSINESS_INFO.phone_tel}>Call {DEFAULT_BUSINESS_INFO.phone_office}</a>
        </div>
        <div className="trust-strip" aria-label="Business highlights">
          <span><strong>Lifetime</strong> workmanship warranty</span>
          <span><strong>OEM-grade</strong> materials</span>
          <span><strong>Metro Vancouver</strong> service area</span>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview({ full = false }: { full?: boolean }) {
  const services = full ? SERVICES : SERVICES.slice(0, 6);
  return (
    <section className="section services-section">
      <SectionIntro
        eyebrow="Services"
        title="Everything your vehicle needs after impact, wear, or weather."
        text="A focused repair process, professional refinishing standards, and service that keeps the experience straightforward."
      />
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title} data-reveal style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}>
            <div className="icon-wrap">{iconFor(service.iconName)}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
      {!full && <div className="center-action" data-reveal><Link className="btn btn-outline" to="/service">View all services</Link></div>}
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section split-section">
      <div className="split-media" data-reveal>
        <img src={shopImage} alt="A freshly repaired vehicle showing high quality paint finish" />
      </div>
      <div className="split-copy" data-reveal>
        <p className="eyebrow">Why drivers choose us</p>
        <h2>A cleaner repair experience from booking to final polish.</h2>
        <p>Great auto body work is equal parts precision, transparency, and finish quality. We keep the process organized so customers know what is happening, what matters, and when their vehicle is ready.</p>
        <div className="feature-list">
          {WHY_CHOOSE_US.map((item) => (
            <div key={item.title}>
              <span aria-hidden="true">✓</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="section dark-band">
      <SectionIntro
        eyebrow="Recent work"
        title="Before and after repairs with a finish that feels factory."
        text="Panel alignment, color matching, refinishing, and detailing come together in work that looks clean from every angle."
      />
      <div className="work-grid">
        {OUR_WORK_GALLERY.map((item, index) => (
          <article className="work-card" key={item.title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
            <div className="work-images">
              <img src={item.before} alt={`${item.title} before repair`} />
              <img src={item.after} alt={`${item.title} after repair`} />
            </div>
            <div className="work-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section testimonials">
      <SectionIntro
        eyebrow="Customer confidence"
        title="Trusted by owners who care about the details."
        text="Clear updates, careful repairs, and workmanship that gives customers their vehicle back looking right."
      />
      <div className="testimonial-grid">
        {TESTIMONIALS.map((item, index) => (
          <blockquote className="testimonial-card" key={item.author} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
            <p>"{item.quote}"</p>
            <footer>{item.author}<span>{item.vehicle}</span></footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function ContactPanel() {
  return (
    <section className="section contact-section">
      <div className="contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">Book appointment</p>
          <h2>Schedule your repair visit online.</h2>
          <p>Use the booking link to share your vehicle details and preferred appointment time, or call the shop if you would rather speak with the team first.</p>
          <div className="contact-methods">
            <a href={DEFAULT_BUSINESS_INFO.phone_tel}><strong>Office</strong>{DEFAULT_BUSINESS_INFO.phone_office}</a>
            <a href={DEFAULT_BUSINESS_INFO.phone_sms}><strong>Cell / SMS</strong>{DEFAULT_BUSINESS_INFO.phone_cell}</a>
            <a href={DEFAULT_BUSINESS_INFO.email_mailto}><strong>Email</strong>{DEFAULT_BUSINESS_INFO.email}</a>
            <span><strong>Address</strong>{DEFAULT_BUSINESS_INFO.address}</span>
          </div>
        </div>
        <div className="booking-card" data-reveal>
          <p className="eyebrow">Online booking</p>
          <h3>Start your appointment request with Shopmonkey.</h3>
          <p>Add your contact information, vehicle details, and repair notes in the secure booking form.</p>
          <a className="btn btn-primary" href={bookingUrl} target="_blank" rel="noreferrer">Book appointment</a>
          <a className="btn btn-secondary" href={DEFAULT_BUSINESS_INFO.phone_tel}>Call the shop</a>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="map-section" aria-label="Map and business hours">
      <div className="map-card" data-reveal>
        <iframe
          title="The Shop Autobody location map"
          src={DEFAULT_BUSINESS_INFO.map_embed_url}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="hours-card" data-reveal>
        <p className="eyebrow">Visit the shop</p>
        <h2>Burnaby location, easy access from Metro Vancouver.</h2>
        {Object.entries(DEFAULT_OPERATING_HOURS).map(([day, hours]) => (
          <div className="hours-row" key={day}><span>{day}</span><strong>{hours}</strong></div>
        ))}
        <a className="btn btn-outline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DEFAULT_BUSINESS_INFO.address)}`}>Get directions</a>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <SEO pageType="home" url="https://theshopautobody.com" />
      <Hero />
      <ServicesPreview />
      <WhyChoose />
      <ContactPanel />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <SEO pageType="service" url="https://theshopautobody.com/service" />
      <PageHero eyebrow="Services" title="Premium auto body, paint, repair, and protection services." text="Whether it is collision damage, a scuffed bumper, paint correction, wrap, tint, oil, or brakes, the work is handled with a high standard of fit, finish, and communication." />
      <ServicesPreview full />
      <WhyChoose />
      <ContactPanel />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <SEO pageType="about" url="https://theshopautobody.com/about-us" />
      <PageHero eyebrow="About The Shop" title="A local Burnaby auto body team built around careful work." text="The Shop Autobody helps drivers move from damage and uncertainty to a repaired vehicle they can trust again." />
      <section className="section split-section about-split">
        <div className="split-copy" data-reveal>
          <p className="eyebrow">Our approach</p>
          <h2>Premium repairs should feel organized, honest, and easy to understand.</h2>
          <p>We focus on the details customers actually feel: an organized appointment process, careful repair planning, precise paint work, and a finished vehicle that looks ready for the road.</p>
          <p>Serving Burnaby and Metro Vancouver, the shop handles collision repair, refinishing, dent and scratch repair, detailing, wrap, tint, oil, and brake service.</p>
        </div>
        <div className="split-media" data-reveal>
          <img src={heroImage} alt="A professionally finished black sports car after auto body work" />
        </div>
      </section>
      <ContactPanel />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <SEO pageType="contact" url="https://theshopautobody.com/contact" />
      <PageHero eyebrow="Contact" title="Book an appointment for your next repair." text="Schedule online, call the shop, or visit us at 5156 Still Creek Ave in Burnaby." />
      <ContactPanel />
      <MapSection />
    </>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  useReveal(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<ServicesPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
