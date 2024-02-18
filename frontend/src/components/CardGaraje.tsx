export const CardGaraje = () => {
  return (
    <div>
      <div className='w-36'>
        <img
          src='/images/image.png'
          alt='garaje'
          className='rounded-md w-full object-cover'
        />
        <div className='flex justify-between font-semibold'>
          <h3>El garaje de Juan</h3>
          <span>4,5</span>
        </div>
        <p className='line-clamp-1'>Av. Directorio 3452</p>
        <span className='font-semibold'>$2000 x hora</span>
      </div>
    </div>
  );
};
