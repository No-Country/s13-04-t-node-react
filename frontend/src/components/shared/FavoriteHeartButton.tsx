import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../../hooks/favorites';

interface Props {
  id: string;
}

export const FavoriteHeartButton = ({ id }: Props) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const favorite = favorites.find((f) => f.garage.id === id);
  return (
    <>
      {favorite ? (
        <button type='button' onClick={() => removeFavorite(id)}>
          <FaHeart className='text-xl text-black' />
        </button>
      ) : (
        <button type='button' onClick={() => addFavorite(id)}>
          <FaRegHeart className='text-xl text-black' />
        </button>
      )}
    </>
  );
};
