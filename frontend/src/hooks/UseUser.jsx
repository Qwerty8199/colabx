import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  let initialUserState = {
    user:"",
    userId:-1
  }

  const [userState, setUserState] = useState(initialUserState);

  const updateUserData = (newUserData) => {
    console.log("in updating", newUserData)
    setUserState(newUserData);
  };

  return (
    <UserContext.Provider value={{ userState, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const { userState, updateUserData } = useContext(UserContext);
  return { userState, updateUserData };
}