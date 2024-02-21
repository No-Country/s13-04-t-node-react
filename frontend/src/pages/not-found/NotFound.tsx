import { Link } from 'react-router-dom'

export default function NotFound (): JSX.Element {
  return (
    <div>
      <p>NotFound</p> 
      <Link to={'/'}>ir a inicio</Link>
    </div>
  )
}
