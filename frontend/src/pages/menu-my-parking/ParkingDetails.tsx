import { useParams } from 'react-router-dom';
import { HeaderUser } from '../../components/shared/HeaderUser';

export const ParkingDetails = () => {
  const { idGaraje } = useParams();

  return (
    <>
      <HeaderUser />
      <main>{idGaraje}</main>
    </>
  );
};
