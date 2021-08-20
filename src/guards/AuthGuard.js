import React from 'react'
import { Redirect, Route } from 'react-router';

function AuthGuard({ component: Component, ...rest }) {
  const isAuth = window.localStorage.getItem("accessToken");
  return (
    <Route 
      {...rest} 
      render={props => 
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default AuthGuard
