import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

const PrivateRoute = (props: RouteProps) => {
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        localStorage.getItem('ACCESS_TOKEN') == 'true' ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
