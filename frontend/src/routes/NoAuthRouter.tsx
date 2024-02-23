import { Route, Routes } from 'react-router-dom';
import {
  AccountCreated,
  Landing,
  Login,
  NotFound,
  Register,
} from './LazyRoutes';

export default function NoAuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/acceso' element={<Login />} />
      <Route path='/registro'>
        <Route path='usuario/:role' element={<Register />} />
      </Route>
      <Route path='/cuenta-creada' element={<AccountCreated />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
