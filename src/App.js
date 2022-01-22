import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import TriviaHome from './pages/TriviaHome';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/triviahome" component={ TriviaHome } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
