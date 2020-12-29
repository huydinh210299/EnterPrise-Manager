import React from 'react'
import { Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux'

import Home from './Home';
import Candidate from './Candidate/Candidate';
import Appoinment from './Appoinment/Appoinment';
import Post from './Post/Post';
import Login from './Acount/Login';
import Signin from './Acount/Signin';
import CreatePost from './Post/CreatePost';
import CVinfo from './CV/CVinfo';
import EditPost from './Post/EditPost';

function Routes() {

    const login = useSelector(state => state.login);
    
    return (
        <Switch>
            <ProtectedRoute exact path="/" login={login} component={Home} />
            <ProtectedRoute path="/appoinment" login={login} component={Appoinment} />
            <ProtectedRoute path="/candidate" login={login} component={Candidate} />
            <ProtectedRoute path="/post" login={login} component={Post} />
            <ProtectedRoute path="/login" login={true} component={Login} />
            <ProtectedRoute path="/signin" login={true} component={Signin} />
            <ProtectedRoute path="/creatpost" login={login} component={CreatePost} />
            <ProtectedRoute path="/cvinfo/:userID" login={login} component={CVinfo}/>
            <ProtectedRoute path="/apointment/:postID" login={login} component={Appoinment}/>
            <ProtectedRoute path="/editpost/:postID" login={login} component={EditPost}/>
        </Switch>
    )
}

export default Routes
