import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [apiUsers, setApiUsers] = useState(null);

  const fetchAndSetUsers = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users'); 
      const data = await res.json();
      setApiUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <UserContext.Provider value={{ apiUsers, fetchAndSetUsers }}>
      {children}
    </UserContext.Provider>
  );
};
