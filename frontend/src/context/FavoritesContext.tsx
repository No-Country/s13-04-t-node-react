import { FC, ReactNode, createContext } from 'react';
import useSWR from 'swr';
import { favoriteService } from '../services/favorites';
import { useIsAuthenticated } from '../hooks/auth';
import { IFavoriteGarage } from '../types/garage';

interface FavoritesContextValue {
  favorites: IFavoriteGarage[];
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextValue>(
  {} as FavoritesContextValue
);

export const FavoritesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isAuth = useIsAuthenticated();

  const { data: favorites = [], mutate } = useSWR(
    isAuth ? ['favorites'] : null,
    () => favoriteService.list().catch(() => [])
  );

  const addFavorite = async (id: string) => {
    await favoriteService.add(id);
    await mutate();
  };

  const removeFavorite = async (id: string) => {
    await favoriteService.delete(id);
    await mutate();
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
