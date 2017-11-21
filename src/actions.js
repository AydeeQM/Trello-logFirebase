import store from './store';
import firebase from "firebase";
import { auth, database } from './firebase';

export function signUp(fullname, lastname, email, pass) {
    //console.log('signUp' + fullname + lastname + email + pass);

    auth.createUserWithEmailAndPassword(email, pass).then(user => {
        let newuser = {
            fullname, lastname, email, pass
        }
        database.ref('users/' + user.uid).set(newuser);
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

export const setView = (index) => {
    store.setState({
        idBoard: index
    })
}

/*----------------------------Add board-------------------------------------- */
export function addNewBoard(title, userId) {
    const change = store.getState().showReply;
    const newState = !change;
    database.ref('boards/').push({
        title: title,
        user_id: userId
    }).then(res => {
        console.log('board id: ', res.key)
    });
    store.setState({
        showReply: newState,
    });

}

/* export const addComment = (value) => {
    let user = store.getState().user;
    let boards = [...store.getState().board];
    const change = store.getState().showReply;
    const newState = !change;
    console.log(value);
    let newBoard = {
        name: value,
        id: boards.length + '-' + value
    }
    firebase.database().ref(user.id + '/boards/' + newBoard.id).set(newBoard).then(() => console.log('data firebase!!'));
    store.setState({
        showReply: newState,
    });
} */

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

export function addStage(text, board_id) {
    let newobj = {
        title: text,
        board_id: board_id,
        toggle:false
    }
    console.log('stage', newobj)

    database.ref('stages').push(newobj);
}

/* export const addList = (selected, value) => {
    let user = store.getState().user;
    let list = board.list ? board.list : [];
    list.push({ 
        name: value,
        todostado: false
     });
    firebase.database().ref(user.id + '/boards/' + board.id + '/list').set(list).then(() => console.log('Lista ingresada ok'));

} */

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

export function addTask(stageId, text) {
    console.log('addTask:', stageId + ' - ' + text);

    let tasks = [...store.getState().tasks];

    let newTask = {
        id: store.getState().tasks.length,
        title: text,
        stageId: stageId,
        todostado:false,
    }
    database.ref('tasks/' + newTask.id).set(newTask);
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

/* -----------------------------Recover Data-------------------------------------------------- */
export const userchange = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('user', user);
            let usersRef = database.ref('/users');
            let userRef = usersRef.child(user.uid);

            database.ref('users/' + user.uid).once('value').then(res => {
                const fullUserInfo = res.val();

                store.setState({
                    successLogin: true,
                    user: {
                        id: user.uid,
                        email: fullUserInfo.email,
                        fullname: fullUserInfo.fullname,
                        lastname: fullUserInfo.lastname,
                        password: fullUserInfo.password,
                    }
                })
            });

            database.ref('boards').on('value', res => {
                let boards = [];
                res.forEach(snap => {
                    const board = snap.val();
                    board.id = snap.key;
                    boards.push(board)
                })
                store.setState({
                    boards: boards.filter(board => board.user_id === user.uid)
                })
            });

            database.ref('stages').on('value', res => {
                let stages = []
                res.forEach(snap => {
                    const stage = snap.val();
                    stage.id = snap.key;
                    stages.push(stage);
                })
                store.setState({
                    stages: stages
                })
            });

            database.ref('tasks').on('value', res => {
                let tasks = [];
                res.forEach(snap => {
                    const task = snap.val();
                    tasks.push(task)
                })
                store.setState({
                    tasks: tasks
                })
            });

        }
    });
};
