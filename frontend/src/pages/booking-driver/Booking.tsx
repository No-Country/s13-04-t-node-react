import { useCurrentUser } from '../../hooks/auth';
import { FormBooking } from '../../components/booking/FormBooking';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { useParams } from 'react-router-dom';

export default function Booking() {
  const user = useCurrentUser();
  const { idGaraje } = useParams();

  return (
    <>
      <HeaderUser />
      {user.role === 'user' ? (
        <div className=''>
          {idGaraje && <FormBooking garajeId={idGaraje} userId={''} />}
        </div>
      ) : (
        <h1>No estas registrado</h1>
      )}
    </>
  );
}
