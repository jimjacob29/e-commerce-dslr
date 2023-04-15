import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Screens/home';
import ProductDetails from './Screens/productDetails';
import { MainContextProvider } from './utils/contextData';
import './App.css';

function App() {
  return (
    <MainContextProvider>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/product-details' component={ProductDetails} />
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </MainContextProvider>
  );
}

export default App;
