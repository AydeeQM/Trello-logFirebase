import createStore from 'redux-zero';
import {tboard } from './Databoards'

const initialState = {
    tboard: tboard,
    user: {
        id: null,
        email: null,
        fullname: null,
        lastname:null,
        password:null
    },
    boards: null,
    stages: null,
    tasks: null,
    idBoard: 0,
    showReply: false,
    successLogin: false,
};

const store = createStore(initialState);
export default store;