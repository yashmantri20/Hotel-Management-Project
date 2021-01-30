import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import Hotel from './pages/Hotel/Hotel';
import SingleHotel from './pages/Hotel/SingleHotel';
import CreateHotel from './pages/Hotel/CreateHotel';
import EditHotel from './pages/Hotel/EditHotel';
import Destination from './pages/Destination/Destination';
import CreateDestination from './pages/Destination/CreateDestination';
import SingleDestination from './pages/Destination/SingleDestination';
import EditDestination from './pages/Destination/EditDestination';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/hotels' component={Hotel} />
        <Route exact path='/hotels/create' component={CreateHotel} />
        <Route exact path='/hotels/:hotelId' component={SingleHotel} />
        <Route exact path='/hotels/:hotelId/edit' component={EditHotel} />
        <Route exact path='/destinations' component={Destination} />
        <Route exact path='/destinations/createdestination' component={CreateDestination} />
        <Route exact path='/destinations/:destinationId' component={SingleDestination} />
        <Route exact path='/destinations/:destinationId/edit' component={EditDestination} />
      </Switch>
    </Router>
  );
}

export default App;
