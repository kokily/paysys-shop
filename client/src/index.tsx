import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import client from 'libs/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
