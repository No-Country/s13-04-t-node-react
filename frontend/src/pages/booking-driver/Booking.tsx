import { useCurrentUser } from '../../hooks/auth';
import { FormBooking } from '../../components/booking/FormBooking';
import { HeaderUser } from '../../components/shared/HeaderUser';

export default function Booking() {
  const user = useCurrentUser();

  return (
    <>
      <HeaderUser />
      {user.role === 'user' ? (
        <div className=''>
          <FormBooking />
        </div>
      ) : (
        <h1>No estas registrado</h1>
      )}
    </>
  );
}
