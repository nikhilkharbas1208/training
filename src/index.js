import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import global_en from './locales/en/global.json'
import global_tl from './locales/tl/global.json'
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import JiraContext from './JiraContext';
import { jiraApiToken, jiraUserName } from './Constants/JiraAccess';


const root = ReactDOM.createRoot(document.getElementById('root'));
  const username = jiraUserName
  const apiToken =jiraApiToken
  const userData = { auth : btoa(`${username}:${apiToken}`) }

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


    axios.interceptors.request.use(config => {
      config.headers['Authorization'] = `Basic ${userData.auth}`;
      config.headers['Content-Type'] = 'application/json';
      console.log(config);
      return config;
    });

    axios.interceptors.response.use((response)=>{
      console.log(response,"in axios response")
      return response;
    })
  
root.render(
  //<React.StrictMode>
    <Provider store={store}> 
    <I18nextProvider  i18n={i18next}>
      <JiraContext.Provider value={{userData}}>
          <App/>
      </JiraContext.Provider> 
    </I18nextProvider>
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
