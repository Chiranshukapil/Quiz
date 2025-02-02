import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
// import './App.css';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create root
root.render(
    <StrictMode>
      <App />
    </StrictMode>
);