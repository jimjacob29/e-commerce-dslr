import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Screens/home';
import ProductDetails from './Screens/productDetails';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/product-details' component={ProductDetails} />
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
