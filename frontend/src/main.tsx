import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Could not find the root element!');
}

ReactDOM.createRoot(root).render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <ToastContainer />
  </>
);
