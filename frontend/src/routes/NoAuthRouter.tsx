import { Route, Routes } from 'react-router-dom';
import {
  AddNewParking,
  Home,
  Landing,
  Login,
  MenuRegister,
  NotFound,
  Register
} from './LazyRoutes';

export default function NoAuthRouter () {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/acceso' element={<Login />} />
      <Route path='/registro' >
        <Route index element={<MenuRegister />} />
        <Route path='usuario' element={<Register />} />
        {/* <Route path='conductor' element={< />} /> */}
        <Route path='estacionamiento' element={<AddNewParking />} />
      </Route>
      <Route path='/home' element={<Home />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
