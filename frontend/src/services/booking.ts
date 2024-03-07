import { client } from '../config/client';
import {CreateBooking} from '../types/booking';
export const bookingService = {
  async getById(idBooking: string){
    const res = await client.get(`/bookings/${idBooking}`);
    return await res.data;
  },
  async createBooking(payload: CreateBooking){
    const res = await client.post(`/bookings`, payload);
    return res;
  },
  async deleteBooking(idBooking: string){
    const res = await client.delete(`/bookings/${idBooking}`);
    return res
  }
};