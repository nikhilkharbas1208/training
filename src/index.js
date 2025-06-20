import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Pprops} from './funComponents/Pprops';
import { Provider } from 'react-redux';
import Store from './Redux_Counter/Store';
import store from './Redux_Application/components/redux/Store';
import { orderBurgerCount } from './Redux_Application/components/BurgerBox';
import  { OrderCountPovider}  from './ContextAPI/OrderCount';
import { ErrorBoundary } from 'react-error-boundary';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store ={store}>
     <ErrorBoundary fallback={<p> couldn't find the APP COMPONENT</p>}> 
     <OrderCountPovider>
           <App />
    </OrderCountPovider>
     </ErrorBoundary> 
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//  </OrderCountPovider>