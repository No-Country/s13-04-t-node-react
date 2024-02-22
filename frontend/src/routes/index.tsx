import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NoAuthRouter from './NoAuthRouter';
import AuthRouter from './AuthRouter';
import { useIsAuthenticated } from '../hooks/auth';

export default function Navigation(): JSX.Element {
  const isAuth = useIsAuthenticated();

  return (
    <Suspense fallback={<p>cargando...</p>}>
      <BrowserRouter>
        {!isAuth && 
          <NoAuthRouter/>
        }
        {isAuth && 
          <AuthRouter/>
        }
      </BrowserRouter>
    </Suspense>
  );
}
