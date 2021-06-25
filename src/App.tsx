import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />

        <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;