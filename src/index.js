import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// css
import './index.css';

import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    {/* context provider for the entire app */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);