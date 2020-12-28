import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import PrivateRoute from './HOC/PrivateRoute';

function App() {
  return (
    <>
     <Router>
       <Switch>
         <PrivateRoute path='/' exact component={ Home }/>
         <Route path='/signin' component={ Signin }/>
         <Route path='/signup' component={ Signup } />
       </Switch>
     </Router>
    </>
  );
}

export default App;
