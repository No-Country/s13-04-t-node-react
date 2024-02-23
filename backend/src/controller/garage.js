import Garages from "../model/garage.js";
import { NotFound, Unauthorized } from "../middleware/errors.js";
import { uploadImages } from "../utils/imageService.js";
import { Image } from "../model/image.js";
import User from "../model/user.js";
import { Op, fn, col, where } from "sequelize"
import { Booking } from "../model/booking.js";

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
        const garage = await Garages.findByPk(id, {include: 
            [
                {model: Image, as: "images", attributes: ["id","route"]},
                {model: User , as: 'user' , attributes: {exclude: ['password','createdAt','updatedAt']}},

            ]});
        if(!garage) {
            throw new NotFound("Garage not found")
        }
        res.status(200).send({garage})
    } catch(err) {
        next(err)
    }
};

export const getFilteredGarages = async(req, res, next) => {
    try{
        const {location, startDate, endDate} = req.query
        let garages = await Garages.findAll({where: {
            [Op.or]: [
                where(fn('LOWER', col('country')), 'LIKE', `%${location.toLowerCase()}%`),
                where(fn('LOWER', col('province')), 'LIKE', `%${location.toLowerCase()}%`),
                where(fn('LOWER', col('city')), 'LIKE', `%${location.toLowerCase()}%`),
                where(fn('LOWER', col('address')), 'LIKE', `%${location.toLowerCase()}%`)
            ]
        }, 
        attributes: {exclude: ['createdAt','updatedAt', 'idUser', 'id_user']},
        include:[{model: User , as: 'user' , attributes: {exclude: ['password','createdAt','updatedAt']}}]})

        const garageIds = garages.map(garage => garage.id)

        const bookingsCount = await Booking.findAll({
            attributes: ['id_garage', [fn('COUNT', col('*')), 'totalBookings']],
            where: {
              id_garage: { [Op.in]: garageIds },
              date_start: { [Op.between]: [startDate, endDate] },
              date_end: { [Op.between]: [startDate, endDate] }
            },
            group: ['id_garage']
        });
        
        if(bookingsCount.length > 0){
            bookingsCount.map((booking) => {
                const id = booking.dataValues.id_garage
                const totalBookings = booking.dataValues.totalBookings
                garages = garages.filter(garage => (garage.id !== id) || (garage.id == id && garage.capacity > totalBookings))
            })
        }
        
        res.status(200).send({"garages": garages})
    }catch(error){
        next(error)
    }
}

const createGarage = async(req, res, next) => {
    const {idUser, name, address, country, province, city, zipCode, capacity, price, whitConfirmation, coordinates, schedule} = req.body;
    let images = req.files?.images || null

    try {
        const user = await User.findByPk(idUser)

        if(!user){
            throw new NotFound("User not found")
        }

        if(user.role !== 'parking'){
            throw new Unauthorized("You are not authorized to create a garage")
        }

        const garage = await Garages.create({idUser, name, address, country, province, city, zipCode, capacity, price, whitConfirmation, coordinates, schedule: JSON.parse(schedule)});

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

    try {
        const garage = await Garages.findByPk(id)
        if(!garage) {
            throw new NotFound("Garage not found")
        }

        garage.set( {...req.body});
        garage.save();
        return res.status(200).send({"message" :"Garage updated", "garage": garage})
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
