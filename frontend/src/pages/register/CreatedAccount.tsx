import { Link } from 'react-router-dom';

export default function CreatedAccount(): JSX.Element {
  return (
    <main className='p-6'>
      {/* Titulos de la pantalla */}
      <h1 className='font-bold'>¡FELICITACIONES!</h1>
      <p className='mb-64'>Tu cuenta se ha creado correctamente</p>

      {/* Botón de acción */}
      <Link to='/home'>
        <button
          className='bg-gray-300 text-black rounded-md px-16 py-2 font-bold mt-64 w-full'
          style={{ height: '40px', borderRadius: '10px', gap: '8px' }}
        >
          Ir a mi cuenta
        </button>
      </Link>
    </main>
  );
}
