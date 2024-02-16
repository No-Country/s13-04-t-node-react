import Garages from "../model/garage.js";
import { NotFound } from "../middleware/errors.js";
import { uploadImages } from "../utils/imageService.js";
import { Image } from "../model/image.js";

const getAllGarages = async (req, res, next) => {
    try {
        const garages = await Garages.findAll({include: [{model: Image, as: "images", attributes: ["id","route"]}]})
        res.status(200).send({"garages": garages})
    } catch (err) {
        next(err)
    }
};

const getGarage = async(req, res, next) => {
    const {id} = req.params;

    try {
        const garage = await Garages.findByPk(id, {include: [{model: Image, as: "images", attributes: ["id","route"]}]});
        if(!garage) {
            throw new NotFound("Garage not found")
        }
        res.status(200).send({garage})
    } catch(err) {
        next(err)
    }
};

const createGarage = async(req, res, next) => {
    const {idUser, name, address, country, province, city, zipCode, capacity, price, whitConfirmation, coordinates} = req.body;
    let images = req.files?.images || null
    try {
        const garage = await Garages.create({idUser, name, address, country, province, city, zipCode, capacity, price, whitConfirmation, coordinates});

        if(images && images.length !== 0){
            images = await uploadImages(images)
            await Image.bulkCreate(images.map(image => ({route: image, garage_id: garage.id})))
        }

        return res.status(200).send({message: "Garage created", "garage": garage})
    } catch (err) {
        next(err)
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
