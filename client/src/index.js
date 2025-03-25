import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from "./contexts/Auth.jsx";
import { AdminProvider } from './contexts/Admin.jsx';
import { CookiesProvider } from "react-cookie"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>
);
