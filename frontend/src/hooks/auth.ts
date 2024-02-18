import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useIsAuthenticated = () => {
  const user = useContext(UserContext);
  return !!user;
};

export const useCurrentUser = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error('useCurrentUser must be used within the AuthRouter');
  }

  return user;
};
