import React, { createContext, useState, useEffect } from 'react';
import { getUserDetails } from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getUserDetails(token);
          setUser(userData);
        } catch (error) {
          console.error("Error loading user:", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (userData, token) => {
    console.log('Logging in user:', userData);
    setUser(userData);
    localStorage.setItem('token', token);
    try {
      const fullUserData = await getUserDetails(token);
      setUser(fullUserData);
    } catch (error) {
      console.error("Error fetching full user details:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateBalance = (newBalance) => {
    setUser(prevUser => ({
      ...prevUser,
      account: {
        ...prevUser.account,
        balance: newBalance
      }
    }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
};