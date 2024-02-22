import { client } from "../config/client";
import { IVehicule } from "../types/vehicule";
//import { appStorage } from '../config/storage';

export const vehiculeService = {
  async addVehicule(payload: IVehicule) {
       
    const res = await client.post<{ car: IVehicule }>("/cars", payload);
    return res;
  },
};


