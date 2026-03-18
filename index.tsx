import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// FIX (Critical): Switched from HashRouter to BrowserRouter.
// HashRouter causes all routes to use /#/ prefix which Google does NOT index as separate pages.
// BrowserRouter uses real URL paths (/service, /about-us, /contact) that Google can crawl.
// IMPORTANT: You must also add the 404.html redirect file (see public/404.html) so
// GitHub Pages knows to serve the React app on all routes — otherwise direct URL
// visits will return a 404 error from GitHub's servers.
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
