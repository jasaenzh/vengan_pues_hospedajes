import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ApartmentProvider } from './context/ApartmentContext';
import { BookingProvider } from './context/BookingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ApartmentProvider>
        <BookingProvider>
          <App />
        </BookingProvider>
      </ApartmentProvider>
    </AuthProvider>

  </React.StrictMode>
);


