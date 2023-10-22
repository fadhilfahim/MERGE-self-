import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ProductsContextProvider } from './context/ProductsContext';
import { store } from './features/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <ProductsContextProvider> 
      <App />
    </ProductsContextProvider>
  </React.StrictMode>
  </Provider>
  
)

