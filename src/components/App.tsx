import React, {useContext} from 'react';
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Switch, Route } from 'react-router-dom'
import Index from "../views/Index";
import {storesContext} from "../stores";
import Auth from "../services/auth";
import User from "../models/user";
import About from "../views/About";
import Interests from "../views/Interests";
import Study from "../views/Study/Study";


function App() {
  const { userStore } = useContext(storesContext);

  if (localStorage.getItem('access_token')) {
    userStore.setInLoggingState(true);

    Auth.getUser().then(res => {
      userStore.setUser(new User(res.data));
      userStore.setIsLogged(true);
    })
      .finally(() => userStore.setInLoggingState(false))
  }

  return (
    <>
      <Header/>
      <main className="main">
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/about" component={About} />
          <Route path="/interests" component={Interests} />
          <Route path="/study" component={Study} />
        </Switch>
      </main>
      <Footer/>
    </>
  );
}

export default App;
