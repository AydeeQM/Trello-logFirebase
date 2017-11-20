import store from './store';
import firebase from "firebase";
import { auth, database } from './firebase';

export function signUp(fullname, lastname, email, pass) {
    console.log('signUp' + fullname + lastname + email + pass);

    auth.createUserWithEmailAndPassword(email, pass).then(user => {
        let newuser = {
            fullname, lastname, email, pass
        }
        database.ref('users/' + user.uid).set(newuser);

        // database.ref ('users/' + user.uid + '/options').update ( 'option1, option2, option3...');   
        //  database.ref ('users/').push (newuser);   

        database.ref('users/' + user.uid).once('value').then(res => {
            const fullUserInfo = res.val();

            console.log('full info ', fullUserInfo);
            store.setState({
                user: {
                    id: user.uid,
                    email: fullUserInfo.email,
                    fullname: fullUserInfo.fullname,
                    lastname: fullUserInfo.lastname,
                    password: fullUserInfo.password,


                }
            })
        })

    })

}

export function signOut() {
    auth.signOut();
    store.setState({
        successLogin: false,
        user: {
            id: '',
            email: ''
        }
    })
}

export function signIn(user, pass) {
    auth.signInWithEmailAndPassword(user, pass).then(userObj => {

        database.ref('users/' + userObj.uid).once('value').then(res => {
            const fullUserInfo = res.val();

            console.log('full info ', fullUserInfo);
            store.setState({
                user: {
                    id: userObj.uid,
                    email: fullUserInfo.email,
                    fullname: fullUserInfo.fullname,
                    password: fullUserInfo.password,  

                }
            })
        })
    })
}

export const userchange = () => {
    firebase.auth().onAuthStateChanged(usuario => {
        if (usuario) {
            console.log('si');
            firebase.database().ref('users/' + usuario.uid).once('value').then(res => {
                const fullUserInfo = res.val();
                store.setState({
                    user: {
                        id: 'users/' + usuario.uid,
                        fullname: fullUserInfo.fullName,
                        lastName: fullUserInfo.lastName
                    },
                    successLogin: true
                })
                console.log('fullinfo', fullUserInfo);

            })
            readBoard('users/' + usuario.uid);
        } else {
            console.log('no')
        }
    });
}
/* auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user', user);
        let usersRef = database.ref('/users');
        let userRef = usersRef.child(user.uid);
        store.setState({
            successLogin: true
        })
    }
}); */

/* --------------------boards firebase----------------------- */
export function readBoard(user) {
    firebase.database().ref(user + '/boards').on('value', res => {
        let stages = [];
        res.forEach(snap => {
            const stage = snap.val();
            stages.push(stage);
        })
        console.log(stages);
        store.setState({
            boards: stages
        })
    });
}

export const addComment = (value) => {
    let user = store.getState().user;
    let boards = [...store.getState().boards];
    console.log(value);
    let newBoard = {
        name: value,
        id: boards.length + '-' + value
    }
    firebase.database().ref(user.id + '/boards/' + newBoard.id).set(newBoard).then(() => console.log('nooo'));
}

/*----------------------------Add board-------------------------------------- */

/* export const addComment = (name) => {
    let oldList = store.getState().board;
    const change = store.getState().showReply;
    const newState = !change;
    const newList = oldList.concat({
        id: oldList.length,
        name: name,
        cards:[],
        toggle: false
    });
    store.setState({
        board: newList,
        showReply: newState
    });

    console.log(newList);
}; */

export const setView = (index) => {
    store.setState({
        idBoard: index
    })
}

export const handleLoginClick = () => {
    const change = store.getState().showReply;
    const newState = !change;
    store.setState({ showReply: newState});
}

export const handleLogoutClick = () =>  {
    let bolean = store.getState().showReply ? false : true;
    store.setState({ showReply: bolean });
}

/********************** Lista de board *********************************/
export const addList = (value, board) => {
    let user = store.getState().user;
    let list = board.list ? board.list : [];
    list.push({ name: value });
    firebase.database().ref(user.id + '/boards/' + board.id + '/list').set(list).then(() => console.log('lol'));

}

/* export const addList = (selected, name) => {
    let oldList = [...store.getState().board];
    oldList[selected].toggle = false;
    oldList[selected].cards.push({
        name: name,
        commit: [],
        todostado: false
    });
    store.setState({
        board: oldList,
    });

}; */

export const handleHideClick = (selected) => {
    let oldList = [...store.getState().board];
    oldList[selected].toggle = true;
    store.setState({
        board: oldList
    })
}

export const handleShowClick = (selected) => {
    let oldList = [...store.getState().board];
    oldList[selected].toggle = false;
    store.setState({
        board: oldList
    })
    /* let bolean = store.getState().toggle ? false : true;
    store.setState({ toggle: bolean}); */
}

/********************* add works Comments ******************************/
export const addTodo = (value, board, list) => {
    let user = store.getState().user;
    let newList = board.list.map(b => {
        if (b.name === list) {
            if (b.cards) {
                b.cards.push(value);
            } else {
                b.cards = [value];
            }
        }
        return b;
    });

    firebase.database().ref(user.id + '/boards/' + board.id + '/list').set(newList).then(() => console.log('sip'));

}

/* export const addTodo = (selected, index, todocoment) => {
    let oldList = [...store.getState().board];
    oldList[selected].cards[index].todostado = false;
    oldList[selected].cards[index].commit.push(todocoment);
    console.log('nuevo comentario...')
    store.setState({
        board: oldList,
    });
}; */

export const TodoHideClick = (selected, index) => {
    let oldList = [...store.getState().board];
    oldList[selected].cards[index].todostado = true;
    store.setState({ board: oldList });
}

export const TodoShowClick = (selected, index) => {
    let oldList = [...store.getState().board];
    oldList[selected].cards[index].todostado = false;
    /* let bolean = store.getState().todostado ? false : true; */
    store.setState({ board: oldList });
}