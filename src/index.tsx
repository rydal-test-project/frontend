import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/scss/index.scss';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react'
import stores from "./stores";
import {ApolloProvider} from "@apollo/client";
import apollo from "./common/apollo";
require('dotenv').config();


ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
        <ApolloProvider client={apollo}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);