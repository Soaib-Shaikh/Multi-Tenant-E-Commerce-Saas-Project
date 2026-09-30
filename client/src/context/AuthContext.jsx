import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecommerce_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-101',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      phone: '+1 (555) 234-5678',
      addresses: [
        {
          id: 'addr-1',
          type: 'Home',
          isDefault: true,
          street: '124 Tech Boulevard, Suite 400',
          city: 'San Francisco',
          state: 'CA',
          zip: '94107',
          country: 'United States'
        }
      ]
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ecommerce_user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('ecommerce_user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = async (email, password) => {
    // Simulated auth API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const loggedInUser = {
          id: 'usr-101',
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
          phone: '+1 (555) 019-2834',
          addresses: [
            {
              id: 'addr-1',
              type: 'Home',
              isDefault: true,
              street: '124 Tech Boulevard, Suite 400',
              city: 'San Francisco',
              state: 'CA',
              zip: '94107',
              country: 'United States'
            }
          ]
        };
        setUser(loggedInUser);
        resolve({ success: true, user: loggedInUser });
      }, 400);
    });
  };

  const register = async (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `usr-${Date.now()}`,
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          phone: '+1 (555) 999-0000',
          addresses: []
        };
        setUser(newUser);
        resolve({ success: true, user: newUser });
      }, 400);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
