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
const Home: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/Home')
)
const NotFound: React.LazyExoticComponent<() => JSX.Element> = lazy(
  async () => await import('../pages/NotFound')
)

export { Onboarding, Home, NotFound, Login, Register }
