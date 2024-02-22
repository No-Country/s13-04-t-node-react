import { UserProvider } from './context/UserContext';
import Navigation from './routes';

function App(): JSX.Element {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}

export default App;
