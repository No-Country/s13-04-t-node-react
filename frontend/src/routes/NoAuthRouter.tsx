import { Route, Routes } from 'react-router-dom'
import Onboarding from '../pages/Onboarding'
import { Login, NotFound, Register } from './LazyRoutes'

export default function NoAuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<Onboarding/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
