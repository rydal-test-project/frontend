import React from 'react';
import {provider, toFactory} from 'react-ioc'
import {Switch, Route} from 'react-router-dom'

import {AppStore, AuthStore, stores, Stores} from "@stores";
import {AuthService} from "@services";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Index from "../views/Index";
import About from "../views/About";
import Interests from "../views/Interests";
import Study from "../views/Study/Study";


const App: React.FC = () => {
  return (
    <>
      <Header/>
      <main className="main">
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/about" component={About}/>
          <Route path="/interests" component={Interests}/>
          <Route path="/study" component={Study}/>
        </Switch>
      </main>
      <Footer/>
    </>
  );
}

export default provider(
    /* stores */
    [Stores, toFactory(() => stores)],
    [AuthStore, toFactory(() => stores.auth)],
    [AppStore, toFactory(() => stores.app)],
    /* services */
    AuthService,
)(App);
