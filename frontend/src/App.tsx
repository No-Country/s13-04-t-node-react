import { FavoritesProvider } from './context/FavoritesContext';
import { UserProvider } from './context/UserContext';
import Navigation from './routes';

function App(): JSX.Element {
  return (
    <UserProvider>
      <FavoritesProvider>
        <Navigation />
      </FavoritesProvider>
    </UserProvider>
  );
}

export default App;
