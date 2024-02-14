import Garages from "../model/garage.js";
import { AlreadyExist, NotFound } from "../middleware/errors.js";

const getAllGarages = async (req, res, next) => {
    try {
        const garages = await Garages.findAll()
        res.status(200).send({garages})
    } catch (err) {
        next(err)
    }
};

const getGarage = async(req, res, next) => {
    const {id} = req.params;

    try {
        const garage = await Garages.findByPk(id);
        if(!garage) {
            throw new NotFound("Garage not found")
        }
        res.status(200).send({garage})
    } catch(err) {
        next(err)
    }
};

const createGarage = async(req, res, next) => {
    const {idUser, name, address, capacity, amount, whitConfirmation, available,coordinates,rating, image } = req.body;
    if(idUser && name && address && capacity && amount && whitConfirmation && available && coordinates && rating) {
        try {
            const garage = await Garages.create({idUser, name, address, capacity, amount, whitConfirmation, available,coordinates,rating, image});
            return res.status(200).send({message: "Garage created"})
        } catch (err) {
            next(err)
        }
    } else {
        res.status(400).send({
            message: 'Missing data',
            fields: {
                idUser: 'UUID',
                name: 'string',
                address: 'string',
                capacity: 'integer',
                amount: 'double',
                whitConfirmation: 'boolean',
                available: 'boolean',
                coordinates: 'string',
                rating: 'float'
            }
        })
    }
    
};

const updateGarage = async(req, res, next) => {
    const {id} = req.params;
    const {idUser, name, address, capacity, amount, whitConfirmation, available,coordinates,rating, image} = req.body;

    try {
        const checkGarage = await Garages.findByPk(id)
        if(!checkGarage) {
            throw new NotFound("Garage not found")
        }

        const garage = await Garages.update({idUser, name, address, capacity, amount, whitConfirmation, available,coordinates,rating, image},{
            where: {
                id
        }});
        return res.status(200).send("Garage updated")
    } catch (err) {
        next(err)
    }
};

const deleteGarage = async(req, res,next) => {
    const {id} = req.params;
    
    try {
        const garage = await Garages.findByPk(id);

        if(!garage) {
            throw new NotFound("Garage not found")
        }
        const deletedGarage = await Garages.destroy({
            where: {
                id
            }
        });
        
        return res.status(200).send("Garage deleted")
    } catch(err) {
        next(err)
    }
};

export {
    getAllGarages,
    getGarage,
    createGarage,
    updateGarage,
    deleteGarage
}
