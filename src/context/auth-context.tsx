import React, { useEffect, useState } from "react";
import { getFromStorage, useStorageState } from "utils/storage-utils";
import { asRole, UserRole } from "constants/user";
 
import { rmCsrfToken } from "helpers";
import { useDispatch, useSelector } from "react-redux";
import { alertPush, selectAuthError, signInUserRequest } from "modules";
 
 

const uidKey = "userUid";
const roleKey = "userRole";
const storage: Storage = sessionStorage;

type AuthContextType = {
  authorized: boolean;
  uid: string | undefined;
  role: UserRole | undefined;
  setUid: (uid: string | undefined) => void;
  setRole: (role: string | undefined) => void;
  logoutUser: () => void;
  loginUser: () => void;
};

const defaultAuthContext: AuthContextType = {
  authorized: true,
  uid: getFromStorage(storage, uidKey),
  role: asRole(getFromStorage(storage, roleKey)),
  setRole: () => {},
  setUid: () => {},
  logoutUser: () => {},
  loginUser: () => {},
};

const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);

 

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [authorized, setAuthorized] = useState(false);
  const [uid, setUid] = useStorageState(storage, uidKey);
  const [role, setRole] = useStorageState(storage, roleKey);
   
  const dispatch = useDispatch();
  const errr = useSelector(selectAuthError)

  useEffect(() => {
    if (uid && role) {
      setAuthorized(true);
    }
  }, [uid, role]);

  const resetUser = () => {
    setRole(undefined);
    setUid(undefined);
    setAuthorized(false);
  };

  const handleLogout =  () => {
     
    resetUser();
    logoutFetch();
    rmCsrfToken()
  };


  useEffect(() =>{
    if ( errr && errr === 'page.header.signUp.message.error') { 
      resetUser();
      rmCsrfToken();
      dispatch(alertPush({ message: [  errr ] }))
    }
  }, [  errr ])

  const handleLogin =  ( ) => dispatch(signInUserRequest())

  return (
    <AuthContext.Provider
      value={{
        authorized,
        role: asRole(role),
        logoutUser: handleLogout,
        loginUser: handleLogin,
        uid,
        setRole,
        setUid,
      }}
    >
       { children } 
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);

 

const logoutFetch = async ()  => {
  
};
