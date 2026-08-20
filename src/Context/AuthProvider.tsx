import { createContext, useEffect, useState, type ReactNode } from "react";

type AuthState = {
  user?: string;
  accessToken?: string;
  id?: string;
  role?: string;
  avatar?: string;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
};

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [auth, setAuth] = useState<AuthState>(() => {
  const storedAuth =
    localStorage.getItem("auth") ||
    sessionStorage.getItem("auth");

  return storedAuth ? JSON.parse(storedAuth) : {};
});

useEffect(() => {
  if (!auth.accessToken) return;

  const rememberMe = localStorage.getItem("rememberMe") === "true";

  if (rememberMe) {
    localStorage.setItem("auth", JSON.stringify(auth));
    sessionStorage.removeItem("auth");
  } else {
    sessionStorage.setItem("auth", JSON.stringify(auth));
    localStorage.removeItem("auth");
  }
}, [auth]);

  useEffect(() => {
    // console.log(auth);
  }, [auth]);


  // console.log("AuthProvider auth:", auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;