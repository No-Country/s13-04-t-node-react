import { Link } from 'react-router-dom'

export default function Onboarding (): JSX.Element {
  return (
    <div>
      <Link to={'login'}> iniciar sesión </Link>
      <Link to={'register'}> registrarse </Link>
    </div>
  )
}
