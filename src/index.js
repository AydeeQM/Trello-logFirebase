import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "redux-zero/react";
import { userchange } from './actions';
import store from "./store";

const Index = () => (
    <Provider store={store}>
        <App />
    </Provider>
);


userchange();

ReactDOM.render(<Index />, document.getElementById('main_container'));
registerServiceWorker();

