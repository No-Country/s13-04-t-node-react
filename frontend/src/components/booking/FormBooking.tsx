import { useEffect, useState } from 'react';
import { garageService } from '../../services/garage';
import { IGarage } from '../../types/garage';
import Carousel from './Carousel';
import Header from './Header';
import Schedule from './Schedule';
import CustomButton from '../utilities/CustomButton';
import { BackArrowIcon } from '../shared/BackArrowIcon';
import {
  APIProvider,
  AdvancedMarker,
  Pin,
  Map,
} from '@vis.gl/react-google-maps';
import { KEY_MAPS, MAP_ID } from '../../constants/mapsApi';
import { LoadingIcon } from '../shared/LoadingIcon';

interface FormBookingProps {
  garajeId: string;
  userId: string;
}
export const FormBooking: React.FC<FormBookingProps> = ({
  garajeId,
  userId,
}) => {
  const [garaje, setGaraje] = useState<IGarage>();
  const [openModal, setOpenModal] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    garageService.getById(garajeId).then((res) => setGaraje(res));
  }, [garajeId, userId]);

  const reservationSearchParams = new URLSearchParams({
    garage: garajeId,
  });

  const reservationUrl = `/reservar-horario-vehiculo?${reservationSearchParams.toString()}`;
  useEffect(() => {
    if (garaje) {
      const [latString, lngString] = garaje.coordinates.split(', ');
      setCoordinates({
        lat: +latString,
        lng: +lngString,
      });
    }
  }, [garaje]);
  if (!garaje) {
    return (
      <div className='flex min-h-dvh'>
        <LoadingIcon width={50} />
      </div>
    );
  }
  return (
    <div className='px-4 py-6 flex flex-col gap-6 w-full relative overflow-hidden'>
      <BackArrowIcon />
      {/* Carrusel de imagenes */}
      {garaje && <Carousel images={garaje.images} garajeId={garajeId} />}
      {/* encabezado */}
      {garaje && (
        <Header
          rating={garaje.rating}
          name={garaje.name}
          address={`${garaje.address}, ${garaje.city}, ${garaje.province}, ${garaje.country}`}
          price={garaje.price}
        />
      )}
      {/* horairos */}
      {garaje && <Schedule garage={garaje} />}
      {/* mapa */}
      <div
        onClick={() => setOpenModal(true)}
        className='flex  bg-[#FFE9CC] px-8 py-4 rounded-md justify-center gap-4 cursor-pointer'
      >
        <img src='/images/location.svg' alt='localizacion' />
        <h4 className='text-xl font-semibold'>Ver mapa</h4>
      </div>
      {/* boton */}
      <CustomButton to={reservationUrl} text='Reservar' type='primary' />
      {openModal && (
        <section className='absolute inset-0 h-full flex p-2 bg-[#0000002f]'>
          <APIProvider apiKey={KEY_MAPS}>
            <div className='w-full aspect-square m-auto p-5 max-w-[500px] bg-white rounded-lg'>
              <div className='flex items-center justify-between pb-2'>
                <p>{`${garaje.address}, ${garaje.city}, ${garaje.province}, ${garaje.country}`}</p>
                <img
                  className='cursor-pointer'
                  onClick={() => setOpenModal(false)}
                  src='/images/close.svg'
                  alt='icon-close'
                />
              </div>
              <Map defaultZoom={18} defaultCenter={coordinates} mapId={MAP_ID}>
                <AdvancedMarker position={coordinates} draggable={false}>
                  <Pin
                    background={'red'}
                    borderColor={'red'}
                    glyphColor={'white'}
                  />
                </AdvancedMarker>
              </Map>
            </div>
          </APIProvider>
        </section>
      )}
    </div>
  );
};
