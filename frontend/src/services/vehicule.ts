import { client } from '../config/client';
import { ICar, IVehicule } from '../types/vehicule';

export const vehiculeService = {
  async addVehicule(payload: IVehicule) {
    const res = await client.post<{ car: IVehicule }>('/cars', payload);
    return res;
  },

  async getByUserId(idUser: string) {
    const res = await client.get<{status: number, cars: ICar[]}>(`/cars/user/${idUser}`, {
      params: {},
    });
    return res;
  },

  async deleteCar(idCar: string) {
    const res = await client.delete(`/cars/${idCar}`, {
      params: {},
    });
    return res;
  },
};
