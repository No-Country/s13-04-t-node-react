import { lazy } from 'react'

const Onboarding: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/Onboarding')
)
const Login: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/Login')
)
const Register: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/Register')
)
const Landing: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/Landing')
)
const Home: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/Home')
)
const MenuRegister: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/MenuRegister')
)
const NotFound: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/NotFound')
)
const AddNewParking: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/AddNewParking')
)

export { Onboarding, Landing, NotFound, Login, Register, Home, MenuRegister, AddNewParking }
