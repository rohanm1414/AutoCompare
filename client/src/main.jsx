import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { CompareProvider } from './context/CompareContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <CompareProvider>
          <App />
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        </CompareProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
