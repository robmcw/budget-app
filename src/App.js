import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Overview from './containers/Dashboard/Dashboard'
import Planner from './containers/Planner/Planner';
import Layout from './components/Layout/Layout'

function App() {
  return (
    <BrowserRouter>
      <Route path="/overview">
        <Layout>
          <Overview />
        </Layout>
      </Route>
      <Route path="/planner">
        <Layout>
          < Planner />
        </Layout>
      </Route>
    </BrowserRouter>
  );
}

export default App;
