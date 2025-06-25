import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Store } from './reducers/Store';
import { Provider } from "react-redux";
import { UserProvider } from './Context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <UserProvider>
    <App />
    </UserProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
