import React from 'react';
import { connect } from 'redux-zero/react';
import './css/body.css';
import Header from './Header'
import Footer from './Footer'
import { addStage, handleShowClick, handleHideClick, addTask, TodoHideClick, TodoShowClick } from './actions';
import { board } from './Databoards';

/* -----------------Agregar Comentarios--------------------------- */
const Task = ({ title }) => (
    <div className="cards-wrapper">
        <div className="card">
            <div className="card-content">
                <div className="tags-wrapper" >
                    <span>  {title} </span>
                </div>
                <footer>
                    <small>
                        <i className="fa fa-comment-o"></i><span></span><span>1</span>
                    </small>
                    <img alt="Gravatar for john@phoenix-trello.com" src="//www.gravatar.com/avatar/6a88cfcf7b76267b129b8dc477c4105e?d=retro&amp;r=g&amp;s=50" height="50" width="50" className="react-gravatar react-gravatar" />
                </footer>
            </div>
        </div>
    </div>
);

const TodoHide = ({selected, index }) => {
    return (
        <a className="add-new" onClick={() => TodoHideClick(selected, index)} > Add a new card...</a>
    )
}

const TodoShow = ({stageID, dataCard, selected }) => {
    const onSubmit = e => {
        e.preventDefault();
        if (dataCard.value) {
            console.log('this.taskInputRef.value', dataCard.value)
            addTask(stageID, dataCard.value);
            dataCard.value = '';
        }
    };
    return (
        <div className="list form">
            <div className='inner'>
                <h4>New board</h4>
                <div className="card form">
                    <form onSubmit={onSubmit} id="new_card_form">
                        <textarea type="text" required="" ref={e => (dataCard = e)}></textarea>
                        <button type="submit">Add</button><span> or </span><a onClick={() => TodoShowClick(selected)}>cancel</a>
                    </form>
                </div>
            </div>
        </div>
    )

}

/* --------------------------------------------**---------------------------------------------------------------- */
class Stage extends React.Component {
    render() {
        let list = null;
        if (this.props.tasks)
            list = this.props.tasks.map(task => {
                return <Task key={task.id} title={task.title} />
            })
        return (
            <div className="list">
                <div className="inner">
                    <header><h4>{this.props.title}</h4></header>
                    {list}
                    <footer>
                        <TodoShow stageID={this.props.stageId} dataCard={this.taskInputReference} selected={this.props.todostado} />
                        {/* <TodoHide selected={this.props.todostado} /> */}
                    </footer>
                </div>
            </div>
        )
    }
}

/* ***************************Agregar lista de tareas****************************** */
const LogoutButton = ({selected}) => {
    return (
        <div className="list add-new"><div className="inner" onClick={() => handleHideClick(selected)}>Add new list...</div></div>
    )
}

const LoginButton = ({ dataList, boardId, selected }) => {
    const onSubmit = e => {
        e.preventDefault();
        if (dataList.value) {
            addStage(dataList.value, boardId);
            dataList.value = '';
        }

    };
    return (
        <div className="list form">
            <div className='inner'>
                <h4>New board</h4>
                <form onSubmit={onSubmit} id='new_list_form'>
                    <div className="inner-wrap">
                        <input
                            type="text"
                            id="list_name"
                            name="name"
                            placeholder="Add a new list..." 
                            required="" 
                            ref={e => (dataList = e)}
                        />
                        <button type="submit">Save list</button>
                        <span> or </span>
                        <a onClick={() => handleShowClick(selected)}>Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    )

}

/* ***********************************ADD List and Cards*********************************************** */
class Board extends React.Component {
    render() {
        const { title, boardId, stages, tasks, toggle } = this.props;

        let list = null;
        if (stages)
            list = stages.map(stage => {
                return <Stage key={stage.id} title={stage.title} stageId={stage.id}
                    tasks={tasks == null ? null : tasks.filter(task => task.stageId === stage.id)}
                />
            });
        return (
                <div>
                    <div id='authentication_container' className='application-container'>
                        <Header />
                        <div className='main-container'>
                            <div className="view-container boards show">
                                <header className="view-header" >
                                    <h3>{title}</h3>
                                </header>
                                <div className="canvas-wrapper">
                                    <div className="canvas">
                                        <div className="lists-wrapper">
                                            {list}
                                            {/* <LogoutButton selected={this.props.toggle} /> */}
                                            <LoginButton dataList={this.refInput} boardId={boardId} selected={this.props.toggle} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const TrelloApp = ({ boards, title, boardId, stages, tasks, toggle}) => {
    let list = null;
    if (boards)
        list = boards.map(board => {
            return <Board key={board.id}
                title={board.title}
                boardId={board.id}
                stages={stages == null ? null :
                    stages.filter(e => e.board_id == board.id)}
                tasks={tasks} />
        }) 
    return (
    <div id='main_container' >
        {list}
        <Footer />
    </div>

    ) 

};
const mapToProps = ({ boards, title, boardId, stages, tasks}) => ({boards, title, boardId, stages, tasks })
export default connect(mapToProps)(TrelloApp);
