import { useCurrentUser } from '../hooks/auth';
import { HeaderUser } from '../components/HeaderUser';
import { HomeDriver } from '../components/HomeDriver';
import { HomeParking } from '../components/HomeParking';

export default function Home() {
  const user = useCurrentUser();

  return (
    <>
      <HeaderUser />
      {user.role === 'user' ? <HomeDriver /> : <HomeParking />}
    </>
  );
}
