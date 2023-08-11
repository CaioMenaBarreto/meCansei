import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("name"));

  const login = (token, name) => {
    setToken(token);
    setName(name);
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
  };

  const logout = () => {
    setToken(null);
    setName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, name, setName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
