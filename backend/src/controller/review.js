import {Review} from "../model/Review.js";
import { AlreadyExist, NotFound } from "../middleware/errors.js";
import User from "../model/user.js"
import Garages from "../model/garage.js";
import { parse } from "dotenv";

const getAllReviews = async (req, res, next) => {
    try {
        const Reviews = await Review.findAll()
        res.status(200).send({Reviews})
    } catch (err) {
        next(err)
    }
};

const getReview = async(req, res, next) => {
    const {id} = req.params;

    try {
        const Reviews = await Review.findByPk(id);
        if(!Reviews) {
            throw new NotFound("Review not found")
        }
        res.status(200).send({Review})
    } catch(err) {
        next(err)
    }
};

const createReview = async(req, res, next) => {
    const { id_author, id_receiver, type, comment, rating } = req.body;

    try {
       
        let receiverModel = type === 'User' ? User : Garages;

        const receiverExists = await receiverModel.findByPk(id_receiver);
        if (!receiverExists) {
            return res.status(404).send({ error: true, message: "Receiver not found", statusCode: 404 });
        }

        const review = await Review.create({ id_author, id_receiver, type, comment, rating });

        await updateAverageRating(id_receiver, type);

        return res.status(200).send({ 
            message: `Review created and ${type.toLowerCase()} rating updated`,
            review 
        });
    } catch (err) {
        next(err);
    }
};

async function updateAverageRating(id_receiver, type) {
    const reviews = await Review.findAll({
        where: { id_receiver, type }
    });

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    if (type === 'User') {
        await User.update({ rating: averageRating }, { where: { id: id_receiver } });
    } else if (type === 'Garage') {
        await Garages.update({ rating: averageRating }, { where: { id: id_receiver } });
    }
    
};

const updateReview = async(req, res, next) => {
    const {id} = req.params;
    const {id_author, id_receiver, type, comment,rating} = req.body;

    try {
        const checkReview = await Review.findByPk(id)
        if(!checkReview) {
            throw new NotFound({message:"Review not found"})
        }

        const Reviews = await Review.update({id_author, id_receiver, type, comment,rating},{
            where: {
                id
        }});
        return res.status(200).send({message:"Review updated"})
    } catch (err) {
        next(err)
    }
};

const deleteReview = async(req, res,next) => {
    const {id} = req.params;
    
    try {
        const Reviews = await Review.findByPk(id);

        if(!Review) {
            throw new NotFound({message:"Review not found"})
        }
        const deletedReview = await Review.destroy({
            where: {
                id
            }
        });
        
        return res.status(200).send({message:"Review deleted"})
    } catch(err) {
        next(err)
    }
};

export {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
}
