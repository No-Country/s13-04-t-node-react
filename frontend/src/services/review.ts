import { client } from "../config/client";
import { IReview } from "../types/review";

export const reviewService = {
  async createReview(payload: IReview) {
    const res = await client.post(`/reviews`, payload);
    return res;
  },
};
