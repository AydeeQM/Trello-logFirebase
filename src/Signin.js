import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { signIn} from './actions'
import './App.css';

const InitPage = ({ successLogin }) => {
    return (
        <div className='view-container sessions new'> 
            {
                successLogin && <Redirect to="/boards" />
            }
            <main>
                <header>
                    <div className='logo'></div>
                </header>
                <form id='sign_in_form' onSubmit={
                    e => {
                        e.preventDefault();
                        signIn(this.emailInputRef.value, this.passwordInputRef.value)
                    }
                }>
                    <div className='field'>
                        <input type="email" id='user_email' placeholder="Email" ref={e => this.emailInputRef = e} required />
                    </div>
                    <div className='field'>
                        <input type="password" id='user_password' placeholder="Password" ref={e => this.passwordInputRef = e} required />
                    </div>
                    <button type='submit'>Sign in</button>
                    <div className='second_view'>
                        <NavLink to={"/signup"}>Create new account</NavLink>
                    </div>
                </form>
            </main> 
        </div>
    )
}

const Signin = ({ successLogin }) => {
    return (
        <div>
            <InitPage successLogin={successLogin}/>
        </div>)
}

export default Signin;
