import { useEffect, useState } from 'react';
import { KEY_MAPS } from '../../constants/mapsApi';
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { useFormContext } from 'react-hook-form';
import { MAP_ID } from '../../constants/mapsApi';

interface Props {
  coordinates: {
    lat: number;
    lng: number;
  };
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function ModalMapConfirm({ coordinates, setOpenModal, setStep }: Props) {
  const { setValue } = useFormContext();

  const [markerPosition, setMarkerPosition] = useState(coordinates);

  const onMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };
  useEffect(() => {
    setMarkerPosition(coordinates);
  }, [coordinates]);
  const confirmLocation = () => {
    setValue('coordinates', `${coordinates.lat}, ${coordinates.lng}`);
    setStep(1);
  };
  return (
    <section className='fixed z-10 top-0 left-0 flex min-w-[100vw] min-h-[100vh] bg-[#00000030] p-2'>
      <article className='  flex flex-col w-[100%] max-h-[75vh] m-auto bg-white p-6 border gap-2 rounded-lg max-w-[600px]'>
        <h2 className='text-xl'>DIRECCIÓN</h2>
        <p className='text-base'>Confirma la ubicación en el mapa</p>
        <APIProvider apiKey={KEY_MAPS}>
          <div className='w-full aspect-square m-auto'>
            <Map defaultZoom={18} defaultCenter={markerPosition} mapId={MAP_ID}>
              <AdvancedMarker
                position={markerPosition}
                draggable
                onDragEnd={onMarkerDragEnd}
              >
                <Pin
                  background={'red'}
                  borderColor={'red'}
                  glyphColor={'white'}
                />
              </AdvancedMarker>
            </Map>
          </div>
        </APIProvider>
        <button
          className='border rounded-3xl p-2 font-bold bg-[#D58418] text-center'
          type='button'
          onClick={() => confirmLocation()}
        >
          Aceptar
        </button>
        <button
          className='border  border-[#D58418]  rounded-3xl p-2 font-bold text-center'
          type='button'
          onClick={() => setOpenModal(false)}
        >
          cancelar
        </button>
      </article>
    </section>
  );
}

export default ModalMapConfirm;
