import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/scss/index.scss';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from "@apollo/client";
import apollo from "./common/apollo";
import appLogger from "./debug/app";
import {USE_DEBUG} from "./constants/env";


localStorage.debug = USE_DEBUG ? '*' : ''

appLogger('booting...')

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apollo}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
