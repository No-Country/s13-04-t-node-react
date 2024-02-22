import { Route, Routes } from 'react-router-dom';
import {
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
        <Route path='usuario/:type' element={<Register />} />
      </Route>     
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
