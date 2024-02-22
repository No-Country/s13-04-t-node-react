import { useCurrentUser } from '../hooks/auth';
import { FormBooking } from '../components/Booking';
import { HeaderUser } from '../components/home-driver/HeaderUser';


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
