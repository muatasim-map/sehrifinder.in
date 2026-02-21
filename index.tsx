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

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service worker registered.', reg))
      .catch((err) => console.log('Service worker registration failed.', err));
  });
}
