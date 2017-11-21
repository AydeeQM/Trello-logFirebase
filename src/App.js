import React from 'react';
import './index.css';
import Signin from './Signin';
import Register from './Signup';
import Boards from './Boards';
import DetaBoards from './Detailsboard';
import { HashRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'redux-zero/react';

const App = ({ successLogin, user}) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Register} />
        <Route path="/boards" component={Boards} />
        <Route path="/details" component={DetaBoards} />
      </Switch>
    </HashRouter>
  )
}

const mapToProps = ({ successLogin, user }) => ({ successLogin, user });
export default connect(mapToProps)(App);

