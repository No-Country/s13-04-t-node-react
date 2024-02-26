import { client } from '../config/client';
import { IFavoriteGarage } from '../types/garage';

export const favoriteService = {
  async list() {
    const res = await client.get<IFavoriteGarage[]>('/garages/my_favorite');
    return res.data;
  },

  async add(id: string) {
    const res = await client.post(`/garages/my_favorite/${id}`);
    return res.data;
  },

  async delete(id: string) {
    const res = await client.delete(`/garages/my_favorite/${id}`);
    return res.data;
  },
};
