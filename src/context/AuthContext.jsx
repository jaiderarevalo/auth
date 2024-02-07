import { createContext, useContext, useEffect, useState } from "react";
import { LoginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used withing an Authprovider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user); // VER EL auth URL y el backend el cors  for connection
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  };
  const signin = async (user) => {
    try {
      const res = await LoginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  };

const logout = ()=>{
  Cookies.remove("token")
  setIsAuthenticated(false)
  setUser(null)

}


  useEffect(() => {
    if (errors.length > 0) {
      const timeout = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [errors]);

  useEffect(() => {
    // es para comprobar si existe  lacookie  por medio de el npm  js-cookie es cuando se quiere entrar a tasks osea a rutas protegidas
    const checklogin = async () => {
      //AUTENTIFICACION DE TOKEN
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checklogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, errors, signin, loading,logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
