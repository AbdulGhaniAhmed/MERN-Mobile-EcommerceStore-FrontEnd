import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import PrivateRoute from './HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isUserLoggedIn , getAllCategory, getInitialData } from './actions'
import Products from './container/Products';
import Orders from './container/Orders';
import Category from './container/category';

function App() {

  const dispatch = useDispatch();
  //work as mapStatetoProps, useSelector Allows you to extract data from the Redux store state
  const auth = useSelector(state =>state.auth);
//useEfect work as componenet did mount
useEffect(()=>{
  if(!auth.authenticate){
  dispatch(isUserLoggedIn())
  }
  dispatch(getInitialData());
},[]);


  return (
    <>
       <Switch>
         <PrivateRoute path='/' exact component={ Home }/>
         <PrivateRoute path='/products' component={ Products }/>
         <PrivateRoute path='/orders' component={ Orders }/>
         <PrivateRoute path='/category' component={ Category } />

         <Route path='/signin' component={ Signin }/>
         <Route path='/signup' component={ Signup } />
       </Switch>
    </>
  );
}

export default App;
