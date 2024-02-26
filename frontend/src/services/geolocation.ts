import { geo } from '../config/maps';
import { Inputs } from '../pages/register-parking/AddNewParking';

export const geolocationService = {
  async getCoordinates(data: Partial<Inputs>){
    const fullAddress = `${data.address},+${data.city},+${data.province},+${data.country}`;
    const res = await geo.get(`${fullAddress.replace(' ', '+')}`);
    return await res.data;
  }
};