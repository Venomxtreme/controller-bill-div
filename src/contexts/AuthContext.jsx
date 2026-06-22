import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/config";

const AuthContext = createContext({});

export function AuthProvider({ children }) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  async function login(
    email,
    password
  ) {

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async function register(
    email,
    password
  ) {

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async function logout() {

    return signOut(auth);
  }

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (userLogged) => {

          console.log(
            "AUTH USER:",
            userLogged?.uid
          );

          setUser(
            userLogged || null
          );

          setLoading(false);
        }
      );

    return unsubscribe;

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(
    AuthContext
  );
}