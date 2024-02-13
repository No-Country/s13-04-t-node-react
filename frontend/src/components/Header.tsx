export const Header = () => {
  return (
    <div className='p-4 flex justify-between bg-[#D9D9D9]'>
      <img src='/images/logo.png' alt='logo' />
      <div className='flex items-center gap-2'>
        <button
          type='button'
          className='px-3 py-1 font-bold rounded-xl bg-white'
        >
          Inicia sesión
        </button>
        <button
          type='button'
          className='px-3 py-1 font-bold rounded-xl bg-white'
        >
          Registrate
        </button>
      </div>
    </div>
  );
};
