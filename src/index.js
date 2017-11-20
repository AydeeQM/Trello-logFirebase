import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Signup';
import Boards from './Boards';
import DetaBoards from './Detailsboard';
import { Provider } from 'redux-zero/react'
import store from './store';
import { userchange } from './actions';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Switch, Route } from 'react-router-dom'


const Index = () => (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/signin" component={App} />
                <Route path="/signup" component={Register} />
                <Route path="/boards" component={Boards} />
                <Route path="/details" component={DetaBoards} />
            </Switch>
        </HashRouter>
    </Provider>
)

userchange();

ReactDOM.render(<Index />, document.getElementById('main_container'));
registerServiceWorker();
