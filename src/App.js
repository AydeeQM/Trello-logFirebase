import React from 'react';
import Signin from './Signin'
import Footer from './Footer';
import { connect } from 'redux-zero/react';

const App = ({ successLogin }) => {
  return (
    <div id='main_container'>
        <Signin successLogin={successLogin}/>
        <Footer />
    </div>
  )
}

const mapToProps = ({ successLogin }) => ({ successLogin });
export default connect(mapToProps)(App);

