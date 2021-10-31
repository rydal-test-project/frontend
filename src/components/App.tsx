import React, {useEffect} from 'react';
import {provider, toFactory, useInstance} from 'react-ioc'
import {Switch, Route} from 'react-router-dom'

import {AuthStore, stores, Stores, UiStore} from "@stores";
import {AuthService} from "@services";

import Footer from "./layouts/Footer";
import Index from "../views/Index";
import About from "../views/About";
import Interests from "../views/Interests";
import Study from "../views/Study/Study";
import {throttle} from "lodash";
import {ROUTE_INDEX, ROUTE_INTERESTS, ROUTE_STUDY} from "@constants";
import Header from "./layouts/header";


const App: React.FC = () => {
    const authService = useInstance(AuthService)
    const auth = useInstance(AuthStore)
    const ui = useInstance(UiStore)

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            authService.getUser()
        } else {
            auth.serverActions.getUser.setFinished()
        }
    }, [auth.serverActions.getUser, authService])

    useEffect(() => {
        const dandleResize = throttle(ui.updateSize, 100);

        window.addEventListener('resize', dandleResize);

        return () => {
            window.removeEventListener('resize', dandleResize);
        }
    }, [ui])

  return (
    <>
      <Header/>
      <main className="main">
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path={ROUTE_INDEX} component={About}/>
          <Route path={ROUTE_INTERESTS} component={Interests}/>
          <Route path={ROUTE_STUDY} component={Study}/>
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
    [UiStore, toFactory(() => stores.ui)],
    /* services */
    AuthService,
)(App);
