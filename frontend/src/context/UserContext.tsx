import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { IUser } from '../types/user';
import { authService } from '../services/auth';
import { appStorage } from '../config/storage';

export const UserContext = createContext<IUser | null>(null);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(() => authService.getUser());

  useEffect(() => {
    appStorage.onChange(() => setUser(authService.getUser()));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
