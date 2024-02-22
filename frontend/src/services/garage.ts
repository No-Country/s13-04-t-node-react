import { client } from '../config/client';
import { IGarage, IGarageSearchParams, ISearchGarage } from '../types/garage';

export const garageService = {
  async list() {
    const res = await client.get<{ garages: IGarage[] }>('/garages', {
      params: {},
    });
    return res.data.garages;
  },

  async search(params: IGarageSearchParams) {
    const res = await client.get<{ garages: ISearchGarage[] }>(
      '/garages/search',
      {
        params,
      }
    );
    return res.data.garages;
  },
};
