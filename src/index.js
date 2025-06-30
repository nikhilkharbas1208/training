import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import global_en from './locales/en/global.json'
import global_tl from './locales/tl/global.json'
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

export const jiraContext = createContext();
const root = ReactDOM.createRoot(document.getElementById('root'));
  const username = process.env.REACT_APP_USERNAME
  const apiToken =process.env.REACT_APP_API_TOKEN
  const userData = {
      auth : btoa(`${username}:${apiToken}`)
    }

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { global: global_en },
      tl: { global: global_tl }
    },
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'global',
    ns: ['global'],
    interpolation: { escapeValue: false }
  });
root.render(
  <React.StrictMode>
    <I18nextProvider  i18n={i18next}>
      <jiraContext.Provider value={{userData}}>
          <App/>
      </jiraContext.Provider> 
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
