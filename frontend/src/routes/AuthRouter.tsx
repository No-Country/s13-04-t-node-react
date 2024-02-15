import { Route, Routes } from 'react-router-dom'
import { Home, NotFound } from './LazyRoutes'

export default function AuthRouter () {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
