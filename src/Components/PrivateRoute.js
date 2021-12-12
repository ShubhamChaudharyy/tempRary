import {Redirect, Route} from 'react-router-dom'
import React, { useContext } from 'react'
import {AuthContext} from '../Components/Auth/AuthContext';

function PrivateRoute({ component:Component, ...rest }) {
    const { user } = useContext(AuthContext)

    return (
        <Route {...rest} render={props=>{
            return user !== null?<Component {...props}/> : <Redirect to="login"/>
        }} />
    )
}

export default PrivateRoute
