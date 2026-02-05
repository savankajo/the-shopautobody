
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ThemeEditor from './components/ThemeEditor';
import BusinessInfoEditor from './components/BusinessInfoEditor';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BusinessInfoProvider } from './context/BusinessInfoContext';

import Home from './pages/Home';
import Service from './pages/Service';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FloatingCallButton from './components/FloatingCallButton';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BusinessInfoProvider>
          <div className="flex flex-col min-h-screen bg-brand-dark">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/service" element={<Service />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <FloatingCallButton />
            <LoginModal />
            <ThemeEditor />
            <BusinessInfoEditor />
          </div>
        </BusinessInfoProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;