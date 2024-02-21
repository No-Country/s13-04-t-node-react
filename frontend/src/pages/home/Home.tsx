import { useCurrentUser } from '../../hooks/auth';
import { HeaderUser } from '../../components/home-driver/HeaderUser';
import { HomeDriver } from '../home-driver/HomeDriver';
import { HomeParking } from '../home-parking/HomeParking';

export default function Home() {
  const user = useCurrentUser();

  return (
    <>
      <HeaderUser />
      {user.role === 'user' ? <HomeDriver /> : <HomeParking />}
    </>
  );
}
