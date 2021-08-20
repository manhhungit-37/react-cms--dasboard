import React from 'react'
import { Redirect, Route } from 'react-router';

function GuestGuard({ component: Component, isRestricted, ...rest }) {
  const token = window.localStorage.getItem("token");
  return (
    <Route 
      {...rest}
      render={props => 
        token && isRestricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

export default GuestGuard
