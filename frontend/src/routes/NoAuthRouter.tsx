import { Route, Routes } from 'react-router-dom';
import { Landing } from '../pages/landing/Landing';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/register/Register';
import { NotFound } from '../pages/not-found/NotFound';

export default function NoAuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/acceso' element={<Login />} />
      <Route path='/registro'>
        <Route path='usuario/:role' element={<Register />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
