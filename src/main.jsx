import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {Store,persistor} from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);