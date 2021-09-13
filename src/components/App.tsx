import React, {useEffect} from 'react';
import {provider, useInstance} from 'react-ioc'
import {Switch, Route} from 'react-router-dom'

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Index from "../views/Index";
import About from "../views/About";
import Interests from "../views/Interests";
import Study from "../views/Study/Study";
import {AuthStore, AppStore, Stores} from "@stores";
import {AuthService} from "@services";


const App: React.FC = () => {
  const authService = useInstance(AuthService);

/*  useEffect(() => {
    authService.init();
  }, [authService]);*/

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
  AppStore,
  Stores,
  AuthStore,
  /* services */
  AuthService,
)(App);
