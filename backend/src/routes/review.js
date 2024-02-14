import { Router } from "express";
import {getAllReviews, getReview, createReview, updateReview, deleteReview } from '../controller/review.js';

const route=Router();

route.get("/",getAllReviews)
route.get("/:id",getReview)
route.post("/",createReview)
route.patch("/:id",updateReview)
route.delete("/:id",deleteReview)


export default route;