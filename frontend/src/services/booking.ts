import { client } from '../config/client';
export const bookingService = {
  async getById(idBooking: string){
    const res = await client.get(`/bookings/${idBooking}`);
    return await res.data;
  }
};