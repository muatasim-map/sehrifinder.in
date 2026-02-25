import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import { SehriProvider } from './context/SehriContext';
import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <SehriProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SehriProvider>
      </LanguageProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// Signal to vite-plugin-prerender that we're done
const timer = setTimeout(() => {
  document.dispatchEvent(new Event('render-event'));
}, 1000);

// Service Worker is registered automatically by vite-plugin-pwa (Workbox).
// Do NOT manually register /sw.js here — it conflicts with the generated SW.
