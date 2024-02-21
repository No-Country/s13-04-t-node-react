import { useCurrentUser } from '../hooks/auth';
import { HeaderUser } from '../components/HeaderUser';
import { FormBooking } from '../components/Booking';


export default function Booking() {
  const user = useCurrentUser();

  return (
    <>
      <HeaderUser />
      {user.role === 'user' ?
        <div className=''>
          <FormBooking />
        </div>
        : <h1>No estas registrado</h1>}
    </>
  );
}
