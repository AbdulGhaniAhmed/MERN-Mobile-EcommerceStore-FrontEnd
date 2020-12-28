import React from 'react';
import { Route,Redirect } from 'react-router-dom';

const PrivateRoute =({component:Component, ...rest})=>{
    return <Route {...rest} component={()=>{
        const token = window.localStorage.getItem('token')
        if(token){
            return <Component {...rest}/>
        }else{
            return <Redirect to='/signin' />
        }
    }} />
}

export default PrivateRoute;