import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}
export default function ParkingLotPhotos({ setStep, isLoading }: Props) {
  const { getValues, setValue } = useFormContext();
  const [imgStringList, setImgStringList] = useState<string[]>([]);
  const newImageToString = (newImage: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(newImage);
    reader.onload = (e) => {
      setImgStringList((prevState: string[]) => {
        return [...prevState, e.target?.result as string];
      });
    };
  };
  return (
    <section>
      <h2 className='text-xl'>FOTO</h2>
      <p className='text-base mt-2 mb-10'>Sube fotos de tu estacionamiento</p>
      <section className='h-[200px] w-full'>
        {imgStringList.length ? (
          <article className='flex overflow-x-scroll  w-auto  gap-x-4'>
            {imgStringList.map((image, index) => (
              <div key={index} className='min-w-max h-[200px] relative'>
                <img
                  src={image}
                  className='max-h-full aspect-square m-auto object-contain'
                  alt={`Imagen de garaje ${index + 1}`}
                />
              </div>
            ))}
          </article>
        ) : (
          <img
            src='/images/addImgParking.svg'
            className='h-full m-auto aspect-square object-contain'
            alt='user profile'
          />
        )}
      </section>

      <div className='flex items-center relative mt-10'>
        <img src='/images/add.svg' alt='agregar' />
        <span className='font-semibold'>Selecciona las imágenes</span>
        <input
          multiple
          onChange={(e) => {
            if (e.target.files?.length) {
              [...e.target.files].map((item) => {
                newImageToString(item);
                setValue('images', [...getValues('images'), item]);
              });
            }
          }}
          type='file'
          className='absolute border-4 opacity-0 w-full h-full z-10 cursor-pointer'
        />
      </div>

      <div className='flex flex-col gap-3 mt-10'>
        <button
          type='submit'
          className={`py-2 text-center ] rounded-3xl font-semibold w-full ${
            isLoading ? 'bg-[#FFE9CC]' : 'bg-[#D58418]'
          }`}
        >
          {isLoading ? (
            <img
              src='/images/Loading.svg'
              width={20}
              height={20}
              className='animate-spin m-auto'
            />
          ) : (
            'Guardar'
          )}
        </button>
        <button
          className='border border-[#D58418]  rounded-3xl p-2 font-bold text-center w-full my-4 max-w-[600px] mx-auto'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setStep(0);
          }}
        >
          cancelar
        </button>
      </div>
    </section>
  );
}
