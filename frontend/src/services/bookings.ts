import { client } from "../config/client";
import { IBooking } from "../types/bookings";

export const bookingsService = {
    async PendingList(idUser: string) {
      const res = await client.get<IBooking[]>(`/bookings/user/${idUser}/status/pending`);
      
      return res.data;
    },

    async PastList(idUser: string) {
      const res = await client.get<IBooking[]>(`/bookings/user/${idUser}/status/inactive`);
      
      return res.data;
    },

    async ActiveList(idUser: string) {
      const res = await client.get<IBooking[]>(`/bookings/user/${idUser}/status/active`);
      
      return res.data;
    },

    async ConfirmBooking(idUser: any) {
      const res = await client.patch<IBooking[]>(`/bookings/status/${idUser}/accept`);
      
      return res.data;
    },

    async RejectBooking(idUser: any) {
      const res = await client.patch<IBooking[]>(`/bookings/status/${idUser}/reject`);
      
      return res.data;
    },
};