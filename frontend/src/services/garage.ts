import { client } from '../config/client';
import { IGarage } from '../types/garage';

export const garageService = {
  async list() {
    const res = await client.get<{ garages: IGarage[] }>('/garages', {
      params: {},
    });
    return res.data.garages;
  },
};
