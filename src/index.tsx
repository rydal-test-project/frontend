import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/scss/index.scss';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from "@apollo/client";
import apollo from "./api/apollo";
import {appDebugger} from "@debug";
import {env} from "@constants";


localStorage.debug = env.USE_DEBUG ? '*' : '';

appDebugger('booting...');

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
