import React, { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneAuthError, setPhoneAuthError] = useState("");
  const [verifyCodeError, setVerifyCodeError] = useState("");

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

  const phoneAuth = async (number) => {
    setIsLoading(true);
    let result = true;
    try {
      const confirmationResult = await auth.signInWithPhoneNumber(
        number,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmationResult);
    } catch (err) {
      console.log(err);
      setPhoneAuthError("Phone number isn't valid or too short");
      result = false;
    }
    setIsLoading(false);

    return result;
  };

  const verifyCode = async (code) => {
    setIsLoading(true);
    try {
      await confirmationResult.confirm(code);
    } catch (err) {
      setVerifyCodeError("The OTP is invalid");
    }
    setIsLoading(false);
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        setCurrentUser,
        setVerifyCodeError,
        verifyCodeError,
        phoneAuthError,
        setPhoneAuthError,
        currentUser,
        logout,
        isLoading,
        setIsLoading,
        phoneAuth,
        verifyCode,
      }}
    >
      {!isFetchingUser && children}
    </AuthContext.Provider>
  );
};
