import { Route, Routes } from 'react-router-dom';
import {
  Landing,
  Login,
  MenuRegister,
  NotFound,
  Register,
} from './LazyRoutes';

export default function NoAuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/acceso' element={<Login />} />
      <Route path='/registro' element={<Register />} />
      <Route path='/menu/registro' element={<MenuRegister />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
