import { HOME_PATH, LOGIN_PATH } from "../routes/consts";
import { createContext, useState } from "react";

import { toast } from "react-hot-toast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [change, setChange] = useState(false)
  const [user, setUser] = useLocalStorage("userObject", null);
  const [userObject, setUserObject] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  if (!userObject) {
    const storage = JSON.parse(localStorage.getItem("userObject") || "{}");
    if (storage !== null) {
      setUserObject(JSON.parse(localStorage.getItem("userObject") || "{}"));
    }
  }

  const handleLogOut = () => {
    setUser(null);
    setUserObject("");
    toast.error('Logout')
    navigate(LOGIN_PATH);
  };

  const handleLogIn = (user) => {
    setUserObject(user);
    setUser(user);
    navigate(HOME_PATH)
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, setUser, handleLogOut, handleLogIn, userObject, change, setChange }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };