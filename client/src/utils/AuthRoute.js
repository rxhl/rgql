import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// utils
import { AuthContext } from '../context/auth.js';

// HOC
const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export default AuthRoute;
