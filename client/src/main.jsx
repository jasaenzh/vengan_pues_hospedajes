import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { AuthProvider } from "./context/AuthContext";
import { ApartmentProvider } from "./context/ApartmentContext"



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <AuthProvider>
      <ApartmentProvider>
        <App />
      </ApartmentProvider>
    </AuthProvider>
  </>
)