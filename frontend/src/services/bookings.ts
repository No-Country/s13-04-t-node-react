import { client } from "../config/client";
import { IBookingResponse } from "../types/bookings";

export const bookingsService = {
    async PendingList(idUser: string) {
      const res = await client.get<IBookingResponse>(`/bookings/user/${idUser}/status/pending`);
      
      return res.data;
    },

    async PastList(idUser: string) {
      const res = await client.get<IBookingResponse>(`/bookings/user/${idUser}/status/inactive`);
      
      return res.data;
    },

    async ActiveList(idUser: string) {
      const res = await client.get<IBookingResponse>(`/bookings/user/${idUser}/status/active`);
      
      return res.data;
    },

    async PendingListByGarage(idGarage: string) {
      const res = await client.get<IBookingResponse>(`/bookings/garage/${idGarage}/status/pending`);
      
      return res.data;
    },

    async PastListByGarage(idGarage: string) {
      const res = await client.get<IBookingResponse>(`/bookings/garage/${idGarage}/status/inactive`);
      
      return res.data;
    },

    async ActiveListByGarage(idGarage: string) {
      const res = await client.get<IBookingResponse>(`/bookings/garage/${idGarage}/status/active`);
      
      return res.data;
    },

    async ConfirmBooking(idUser: string) {
      const res = await client.patch<IBookingResponse>(`/bookings/status/${idUser}/accept`);
      
      return res.data;
    },

    async RejectBooking(idUser: string) {
      const res = await client.patch<IBookingResponse>(`/bookings/status/${idUser}/reject`);
      
      return res.data;
    },

    async PendingListCar(idUser: string) {
      const res = await client.get<IBookingResponse>(`/bookings/user/${idUser}/status/pending`);
      
      return res.data;
    },

    async PastListCar(idUser: string) {
      const res = await client.get<IBookingResponse>(`/bookings/user/${idUser}/status/inactive`);
      
      return res.data;
    },

    async ActiveListCar(idUser: string) {
      const res = await client.get<IBookingResponse>(`/bookings/user/${idUser}/status/active`);
      
      return res.data;
    },

    async PendingListByCar(idCar: string) {
      const res = await client.get<IBookingResponse>(`/bookings/car/${idCar}/status/pending`);
      
      return res.data;
    },

    async PastListByCar(idCar: string) {
      const res = await client.get<IBookingResponse>(`/bookings/car/${idCar}/status/inactive`);
      
      return res.data;
    },

    async ActiveListByCar(idCar: string) {
      const res = await client.get<IBookingResponse>(`/bookings/car/${idCar}/status/active`);
      
      return res.data;
    },
};