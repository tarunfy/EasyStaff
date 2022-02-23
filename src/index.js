import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import {BusinessProvider} from './contexts/BusinessContext';

ReactDOM.render(
  <BusinessProvider>
  <AuthProvider>
  <Router>
    <App />
  </Router>
  </AuthProvider>
  </BusinessProvider>,
  document.getElementById('root')
);

