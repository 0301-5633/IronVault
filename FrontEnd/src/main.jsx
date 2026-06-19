import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrapping the App component with BrowserRouter to enable routing in the application. 
    This allows us to use React Router features like 
    Link and Route within our App component and its children. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
