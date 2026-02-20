import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import { SehriProvider } from './context/SehriContext';
import { BrowserRouter } from 'react-router-dom';
import posthog from 'posthog-js';

// Safely initialize PostHog Analytics if the developer has provided a key in their .env
if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    autocapture: true, // Automatically captures button clicks and form inputs
    capture_pageview: true, // Automatically intercepts React Router History API for route tracking
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <SehriProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SehriProvider>
    </LanguageProvider>
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
