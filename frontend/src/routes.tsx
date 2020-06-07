import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import CreateCollectPoint from './pages/create_collect_point';


const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreateCollectPoint} path="/create-collect-point" />
    </BrowserRouter>
  );
}

export default Routes;