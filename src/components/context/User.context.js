import { createContext, useEffect, useState } from "react";
import { onAuthChangeHandler } from "../utils/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
//wrapper adound children to subscribe to the valus in context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthChangeHandler((data) => {
      console.log("dara", data);
      setCurrentUser(data);
    });
    return unsubscribe;
    //clear subscriptions
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
