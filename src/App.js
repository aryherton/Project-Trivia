import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import TriviaHome from './pages/TriviaHome';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
// import { getTokenLocalStorage } from './server';

// Verifica a existencia do token no localStorage, para renderizar componentes
/* function checkTokenRenderComponent() {
  const token = getTokenLocalStorage();
  console.log(token);
  if (token) {
    return (
      <>
        <Route path="/triviahome" component={ TriviaHome } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
      </>
    );
  }
} */

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* { checkTokenRenderComponent() } */}
      <Route path="/triviahome" component={ TriviaHome } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/notfound" component={ NotFound } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
