import { Car } from "../model/car.js";
import User from "../model/user.js";
import { AlreadyExist, NotFound } from "../middleware/errors.js";

export const getAllCars = async (req,res, next) => {
    try {
        const cars = await Car.findAll();
        res.status(200).json({"cars": cars});
    } catch (error) {
        next(error)
    }
}

export const getCar = async (req,res, next) => {
    try {
        const {id} = req.params;

        const car = await Car.findByPk(id, {include: [{ model: User , as: 'user' , attributes: {exclude: ['password','createdAt','updatedAt']}}]});

        if (!car) {
            throw new NotFound("Car not found")
        }

        res.status(200).json({"car": car});
    } catch (error) {
        next(error)
    }
}

export const getCarByUser = async (req,res, next) => {
    try {
        const {id} = req.params

        const user = await User.findByPk(id);

        if(!user){
            throw new NotFound("User not found")
        }

        const cars = await Car.findAll({where: {"user_id": id}});

        res.status(200).json({"cars": cars});
    } catch (error) {
        next(error)
    }
}

export const createCar = async (req,res, next) => {
    try {
        const {idUser, brand, model, plate, color} = req.body

        const car = await Car.create({"user_id": idUser, brand, model, plate, color})

        res.status(201).json({ "message": "Car created", "car": car});
    } catch (error) {
        next(error)
    }
}

export const updateCar = async (req, res, next) => {
    try {
        const {id} = req.params

        const car = await Car.findByPk(id);

        if(!car){
            throw new NotFound("Car not found")
        }

        car.set( {...req.body});
        car.save();
        return res.status( 200 ).json({"message" :"car updated", "car": car });
    } catch (error) {
        next(error)
    }
}

export const deleteCar = async (req,res, next) => {
    try {
        const {id} = req.params;

        const car = Car.findByPk(id);

        if(!car){
            throw new NotFound("Car not found")
        }

        await Car.destroy({"where": {"id": id}})

        return res.status(200).send({"message" : "Car deleted"})
    } catch (error) {
        next(error)
    }
}