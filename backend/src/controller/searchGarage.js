import Sequelize from "sequelize";
import Garages from "../model/garage.js";
import { Image } from "../model/image.js";
import { BadRequest } from "../middleware/errors.js";

const searchGarage = async (req, res) => {
    try {
        const {clienteUbicacion} = req.body 

        if (!clienteUbicacion) {
            throw new BadRequest("Required customer location user")
        }
        const garajesCercanos = await Garages.findAll({
            attributes: [
                'id',
                'name',
                'address',
                'country',
                'province',
                'city',
                'zipCode',
                'capacity',
                'amount',
                'price',
                'whitConfirmation',
                'available',
                'coordinates',
                'rating',
                [
                    Sequelize.fn(
                        'ST_Distance_Sphere',
                        Sequelize.fn('POINT',
                            Sequelize.cast(Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('coordinates'), ',', -1), 'DECIMAL(9,6)'), // Longitud
                            Sequelize.cast(Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('coordinates'), ',', 1), 'DECIMAL(8,6)')  // Latitud
                        ),
                        Sequelize.fn('POINT', clienteUbicacion.longitude, clienteUbicacion.latitude)
                    ),
                    'distancia',
                ],
            ],
            include: [
                {
                    model: Image,
                    as: 'images', 
                    attributes: ['route'] 
                }
            ],
            where: Sequelize.where(
                Sequelize.fn('ST_Distance_Sphere',
                    Sequelize.fn('POINT',
                        Sequelize.cast(Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('coordinates'), ',', -1), 'DECIMAL(9,6)'), // Longitud
                        Sequelize.cast(Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('coordinates'), ',', 1), 'DECIMAL(8,6)')  // Latitud
                    ),
                    Sequelize.fn('POINT', clienteUbicacion.longitude, clienteUbicacion.latitude)
                ),
                '<=', 10000
            ), // 10 km de distancia
            order: Sequelize.literal('distancia ASC'),
        });
        if(!garajesCercanos){
            throw new BadRequest("Garajes not found")
        }
        res.status(200).send({garajesCercanos:garajesCercanos})
    } catch (error) {
        console.error('Error al obtener garajes cercanos:', error);
        next(err)
    }
};

export { searchGarage };

