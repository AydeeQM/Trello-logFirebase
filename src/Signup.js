import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'redux-zero/react';
import { signUp } from './actions'
import Footer from './Footer';
import './css/body.css';

const SecondView = ({ successLogin }) => {
    return (
        <div className="view-container registrations new">
            {
                successLogin && <Redirect to="/boards" />
            }
            <main>
                <header> 
                    <div className="logo"></div>
                    </header>
                    <form id="sign_up_form" onSubmit={
                        e => {
                            e.preventDefault();
                            signUp(this.fullNameRef.value, this.lastnameRef.value, this.emailRef.value, this.passwordRef.value)
                        }
                    }>
                        <div className="field">
                            <input id="user_first_name" type="text" placeholder="First name" ref={e => this.fullNameRef = e} required="" />
                        </div>
                        <div className="field">
                        <input id="user_last_name" type="text" placeholder="Last name" ref={e => this.lastnameRef = e}  required=""  />
                        </div>
                        <div className="field">
                        <input id="user_email" type="email" placeholder="Email" ref={e => this.emailRef = e} required="" />
                        </div>
                        <div className="field">
                        <input id="user_password" type="password" placeholder="Password" ref={e => this.passwordRef = e} required="" />
                        </div>
                        {/* <div className="field">
                        <input id="user_password_confirmation" type="password" placeholder="Confirm password" ref={e => this.passwordattRef = e}  required="" />
                        </div> */}
                        <button type="submit">Sign up</button>
                    </form>
                    <div className='second_view'>
                        <NavLink to={"/signin"}>Sign in</NavLink>
                    </div>
            </main>
        </div>
    )
}

const Register= ({ successLogin }) => {
    return (
        <div id='main_container'>
            <div>
                <SecondView successLogin={successLogin }/>
            </div>
            <Footer/>
        </div>
        
        )
}

const mapToProps = ({ successLogin }) => ({ successLogin })
export default connect(mapToProps)(Register);