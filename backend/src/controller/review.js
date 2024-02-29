import {Review} from "../model/Review.js";
import { AlreadyExist, NotFound } from "../middleware/errors.js";

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

    if (id_author && id_receiver && type && comment && rating) {
        try {
           
            const existingReview = await Review.findOne({ where: { id_receiver } });

            if (existingReview) {
             
                const newRating = (existingReview.rating + rating) / 2;

              
                await existingReview.update({ rating: newRating, comment, type });

                return res.status(200).send({ message: "Review updated with new average rating" });
            } else {
              
                const newReview = await Review.create({ id_author, id_receiver, type, comment, rating });
                return res.status(200).send({ message: "Review created" });
            }
        } catch (err) {
            next(err);
        }
    } else {
        res.status(400).send({
            message: 'Missing data',
            fields: {
                id_author: 'UUID',
                id_receiver: 'UUID',
                type: 'ENUM',
                comment: 'string',
                rating: 'float'
            }
        });
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
