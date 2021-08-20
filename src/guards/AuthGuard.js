import React from 'react'
import { Redirect, Route } from 'react-router';

function AuthGuard({ component: Component, ...rest }) {
  const token = window.localStorage.getItem("token");
  return (
    <Route 
      {...rest} 
      render={props => 
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default AuthGuard
