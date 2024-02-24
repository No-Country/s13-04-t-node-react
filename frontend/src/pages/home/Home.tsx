import { useCurrentUser } from '../../hooks/auth';
import { HeaderUser } from '../../components/shared/HeaderUser';
import { HomeDriver } from '../home-driver/HomeDriver';
import { HomeParking } from '../home-parking/HomeParking';

export const Home = () => {
  const user = useCurrentUser();

  return (
    <>
      <HeaderUser />
      {user.role === 'user' ? <HomeDriver /> : <HomeParking />}
    </>
  );
};
