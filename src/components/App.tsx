import React from 'react';
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import {Switch, Route} from 'react-router-dom'
import Index from "../views/Index";
import Stores from "../stores";
import About from "../views/About";
import Interests from "../views/Interests";
import Study from "../views/Study/Study";
import {provider} from 'react-ioc'
import ModelsData from "../models";
import AuthService from "../services/auth";
import {AppStore} from "../stores/app";


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
  AppStore,
  Stores,
  /* services */
  AuthService,
  /* models */
  ModelsData
)(App);
