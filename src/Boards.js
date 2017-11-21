import React from 'react';
import { connect } from 'redux-zero/react';
import './css/body.css';
import Header from './Header';
import Footer from './Footer';
import { NavLink, Redirect} from 'react-router-dom';
import { setView, addNewBoard, handleLoginClick, handleLogoutClick} from './actions';

const Usertwo = ({tboard}) => {
    return (
    <section>
        <header className="view-header">
            <h3><i className="fa fa-users"></i><span> Other boards</span></h3>
        </header>
        <div className='boards-wrapper'>
            {
                tboard.map((list, index) => {
                    return (
                        <div key={index} className='board'>
                            <div className='inner'>
                                <h4>{list.name}</h4>
                            </div>
                        </div>
                    );
                })
            }

        </div>
    </section>)
}

const LogoutButton = ({showReply}) => {
    return(
            !showReply && <div className="board add-new">
                <div className="inner">
                    <a id="add_new_board" onClick={() => handleLoginClick()}>Add new board...</a>
                </div>
            </div>
    )
}

const LoginButton = ({ databoard, userID, showReply }) => {
    const onSubmit = e => {
        e.preventDefault();
        if (databoard.value) {
            addNewBoard(databoard.value, userID)
            databoard.value = '';
        }

    };
    return(
            showReply && <div className='board form'>
                <div className='inner'>
                    <h4>New board</h4>
                    <form onSubmit={onSubmit} id='new_board_form'>
                        <div className="inner-wrap">
                            <input
                                type="text"
                                id="board_name"
                                name="name"
                                placeholder="User"
                                ref={e => (databoard = e)}
                            />
                            <button type="submit" name="submit">Create board</button>
                            <span> or </span>
                            <a onClick={() => handleLogoutClick()}>Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
    )
        
}

const Home = ({ successLogin, user, boards, stages, tasks, showReply, tboard }) => {

    let list = null;
    if (boards)
        list = boards.map((board, index) => {
            return(
                <div key={index} className="board">
                    <div className="inner">
                        <h4><NavLink onClick={() => { setView(index) }} to="/details/">{board.title}</NavLink></h4>
                    </div>
                </div>
            );
        })
    return (
        <div id='main_container'>
            <div>
                <div id='authentication_container' className='application-container'>
                    <Header />
                    <div className='main-container'>
                        <div className="view-container boards index">
                            <section>
                                <header className="view-header" >
                                    <h3><i className="fa fa-user"></i><span> My boards</span></h3>
                                </header>
                                <div className="boards-wrapper">
                                    {list}
                                    {
                                        !successLogin && <Redirect to="/signin" />
                                    }
                                    <LoginButton databoard={this.boardInputRef} userID={user.id} showReply={showReply} />
                                    <LogoutButton showReply={showReply} />
                                </div>
                            </section>
                            <Usertwo tboard={tboard} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapToProps = ({ successLogin, user, boards, stages, tasks, showReply, tboard }) => ({ successLogin, user, boards, stages, tasks, showReply, tboard })
export default connect(mapToProps)(Home) 
