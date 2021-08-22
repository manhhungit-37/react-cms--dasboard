import React from 'react'
import { Redirect, Route } from 'react-router';

function GuestGuard({ component: Component, isRestricted, ...rest }) {
  const accessToken = window.localStorage.getItem("accessToken");
  return (
    <Route 
      {...rest}
      render={props => 
        accessToken && isRestricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

export default GuestGuard
