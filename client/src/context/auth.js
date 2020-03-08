import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

let initialState = {
  user: null
};

// Check if token already exists
if (localStorage.getItem('jwtToken')) {
  // Check if expired
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  if (decodedToken.exp * 1000 < Date.now()) {
    // Expired
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

// store
const AuthContext = createContext({
  user: null,
  login: data => {},
  logout: () => {}
});

// reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = userData => {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    dispatch({
      type: 'LOGOUT'
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
