import { client } from "../config/client";
import { IGarage } from "../types/garage";

export const garageService = {
  async list() {
    const res = await client.get<{ garages: IGarage[] }>("/garages", {
      params: {},
    });
    // console.log(res.data.garages);
    return res.data.garages;
  },
    async getById(idGarage: string) {
    const res = await client.get<{ garage: IGarage }>(`/garages/${idGarage}`, {
      params: {},
    });
    return res.data.garage;
  },
};
