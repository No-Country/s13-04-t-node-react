import { geo } from '../config/maps';
import { CreateGaraje } from '../types/garage';

export const geolocationService = {
  async getCoordinates(data: Partial<CreateGaraje>){
    const fullAddress = `${data.address},+${data.city},+${data.province},+${data.country}`;
    const res = await geo.get(`${fullAddress.replace(' ', '+')}`);
    return await res.data;
  }
};