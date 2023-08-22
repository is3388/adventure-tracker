import { createContext, useReducer, useCallback } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: ''
      };
    case 'logout':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: ''
      };
    case 'rejected':
        return {
          ...state,
          isAuthenticated: false,
          error: action.payload,
        };
      case 'clearLoginError': 
        return { 
          ...state, error: ''
      }
    default:
      throw new Error('Unknown action type');
  }
}

const FAKE_USER = {
  name: "robert",
  email: "robert@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      {
        dispatch({type: 'login', payload: FAKE_USER})
      }
    else {
      dispatch({type: 'rejected', payload: 'Error logging in...'})
    }
    }

  function logout() {
    dispatch({ type: 'logout' });
  }

  // using useCallback hook to turn this function into memoized function to prevent rerender the login component
  const clearLoginError = useCallback(function clearLoginError() {
    dispatch({ type: 'clearLoginError' });
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        error,
        clearLoginError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
