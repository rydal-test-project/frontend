import React from "react";
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Subjects from "./Subjects";



export default function Study () {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/subject/:id`}/>
      <Route path={match.url} exact component={Subjects}/>
    </Switch>
  )
};