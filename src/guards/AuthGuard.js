import React from 'react'
import { Redirect, Route } from 'react-router';

function AuthGuard({ component: Component, ...rest }) {
  const accessToken = window.localStorage.getItem("accessToken");
  return (
    <Route 
      {...rest} 
      render={props => 
        accessToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default AuthGuard
