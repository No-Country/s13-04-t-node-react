import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useFormContext } from 'react-hook-form';

export default function ParkingLotPhotos() {
  const { getValues, setValue } = useFormContext();
  const [imgStringList, setImgStringList] = useState<string[]>([]);
  const newImageToString = (newImage: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(newImage);
    reader.onload = (e) => {
      setImgStringList((prevState: string[]) => {
        return [
          ...prevState,
          e.target?.result as string

        ];
      });
    };
  };
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,

  };
  return (
    <section>
      <div className=''>
        <h2 className='text-xl'>FOTO</h2>
        <p className='text-base mt-2 mb-10'>Sube fotos de tu estacionamiento</p>
        <section className='h-[200px]'>
          {
            imgStringList.length ?
              <Slider {...settings}>
                {imgStringList.map((image: string, index: number) =>
                  <div key={index}>
                    <img
                      src={image}
                      className='max-w-[70vw] max-h-[200px] object-cover m-auto'
                      alt={`Imagen de garaje ${index + 1}`}

                    />
                  </div>
                )}
              </Slider>
              :
              <img
                src='/public/images/add-photo.svg'
                className='w-1/2 m-auto aspect-square object-contain rounded-3xl'
                alt='user profile'
              />
          }
        </section>

        <div className='flex items-center relative mt-10'>
          <img src='/images/add.svg' alt='agregar' />
          <span className='font-semibold'>Selecciona las imágenes</span>
          <input
            onChange={(e) => {
              if (e.target.files?.item(0)) {
                const file = e.target.files[0];
                newImageToString(file);
                setValue('images', [
                  ...getValues('images'),
                  file
                ]);
              }
            }}
            type='file'
            className='absolute border-4 opacity-0 w-full h-full z-10'
          />
        </div>

        <div className='flex flex-col gap-3 fixed bottom-6 inset-x-0 px-4'>
          <button
            type='submit'
            className='py-2 text-center bg-[#D58418] rounded-3xl font-semibold'
          >
            Guardar
          </button>
          <button
            type='button'
            className='py-2 text-center bg-white border border-[#D58418] rounded-3xl font-semibold'
          >
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}
