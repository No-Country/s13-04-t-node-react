import { client } from "../config/client";
import { IGarage, IGarageSearchParams, ISearchGarage } from "../types/garage";

export const garageService = {
  async list() {
    const res = await client.get<{ garages: IGarage[] }>("/garages", {
      params: {},
    });
    return res.data.garages;
  },

  async listRecomended() {
    const res = await client.get<{ garages: IGarage[] }>(
      "/garages/recommended",
      {
        params: {},
      }
    );
    return res.data.garages;
  },
  async getById(idGarage: string) {
    const res = await client.get<{ garage: IGarage }>(`/garages/${idGarage}`, {
      params: {},
    });
    return res.data.garage;
  },
  async getByUserId(idUser: string) {
    const res = await client.get(`/garages/user/${idUser}`, {
      params: {},
    });

    return res;
  },

  async search(params: IGarageSearchParams) {
    const res = await client.get<{ garages: ISearchGarage[] }>(
      "/garages/search",
      {
        params,
      }
    );
    return res.data.garages;
  },
  async createGaraje(payload: FormData) {
    const res = await client.post("/garages", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  },
  async updateGarage(idGarage: IGarage["id"], payload: Partial<IGarage>) {
    const res = await client.patch(`/garages/${idGarage}`, payload);
    return res;
  },
};
