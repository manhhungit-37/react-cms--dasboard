import React from 'react'
import { Redirect, Route } from 'react-router';

function GuestGuard({ component: Component, isRestricted, ...rest }) {
  const isAuth = window.localStorage.getItem("accessToken");
  return (
    <Route 
      {...rest}
      render={props => 
        isAuth && isRestricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

export default GuestGuard
