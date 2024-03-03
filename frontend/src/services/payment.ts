import { client } from '../config/client';
import { Payment } from "../types/payment";
export const payMentService = {
  async payMercadoPago(data: Payment){
    const res = await client.post('/pagos', data);
    return await res.data;
  }
};