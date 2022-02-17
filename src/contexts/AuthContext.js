import React, {createContext, useState, useEffect} from 'react'
import { auth, db } from '../services/firebase';

export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState({});


  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(!user){
        setCurrentUser(null);
      }else{
        return;
      }
    });
  });
  
  const phoneAuth = async (number) =>{
    setIsLoading(true);
    try{
      const confirmationResult = await auth.signInWithPhoneNumber(number, window.recaptchaVerifier);
      console.log(confirmationResult);
      setConfirmationResult(confirmationResult);
    }catch(err){
      console.log(err);
    }
    setIsLoading(false);
  };

  const verifyCode = async (code) =>{
    console.log('Called verify code')
    setIsLoading(true);
    try{
      const result = await confirmationResult.confirm(code);
      console.log(result.user);
      setIsLoading(false);
    }catch(err){
      console.log(err);
      setIsLoading(false);
    }
  } 

  return (
    <AuthContext.Provider value={{currentUser, isLoading, setIsLoading, phoneAuth, verifyCode}}>
        {children}
    </AuthContext.Provider>
  );
}