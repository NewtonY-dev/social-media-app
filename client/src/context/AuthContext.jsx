/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "6901aa50b052075f4e783c4c",
    username: "hey",
    email: "hey@gmail.com",
    followers: [],
    followings: ["69020a8a9ce7abdca3ad4154"],
    isAdmin: false,
    city: "bekoji",
    desc: "hey from bekoji",
    from: "jimma",
    relationship: 2,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
