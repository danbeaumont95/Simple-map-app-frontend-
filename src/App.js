import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import MainMap from './Components/MainMap/MainMap';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute exact path={["/map", "/"]} component={MainMap} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
