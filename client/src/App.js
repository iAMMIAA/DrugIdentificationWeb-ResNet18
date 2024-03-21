import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppIntro  from './routes/Intro';
import AppUser from './routes/User';

function App() {
  return (
    <Router>
        <Switch>
            <Route path='/' exact component={AppIntro} />
            <Route path='/user' component={AppUser} />
        </Switch>
    </Router>
  );
}

export default App;
