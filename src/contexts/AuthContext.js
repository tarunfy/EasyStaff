import React, { createContext, useState, useEffect, useContext } from "react";
import { BusinessContext } from "./BusinessContext";
import { auth } from "../services/firebase";
import Spinner from "../components/Spinner/Spinner";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signinError, setSigninError] = useState("");

  const { setBusiness, setStaffList } = useContext(BusinessContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setIsFetchingUser(false);
    });
  }, []);

  const signin = async (email, password) => {
    setIsLoading(true);
    let result = true;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      setSigninError(err.message);
      result = false;
    }
    setIsLoading(false);

    return result;
  };

  const signup = async (email, password) => {
    setIsLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      setSignupError(err.message);
    }
    setIsLoading(false);
  };

  const logout = () => {
    auth.signOut();
    setBusiness(null);
    setStaffList(null);
  };

  if (isFetchingUser) return <Spinner />;

  return (
    <AuthContext.Provider
      value={{
        setCurrentUser,
        signinError,
        setSigninError,
        signupError,
        setSignupError,
        currentUser,
        logout,
        isLoading,
        setIsLoading,
        signin,
        signup,
      }}
    >
      {!isFetchingUser && children}
    </AuthContext.Provider>
  );
};
