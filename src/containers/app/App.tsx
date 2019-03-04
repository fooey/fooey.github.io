import React, { Suspense, lazy } from 'react';
import { Route, Switch } from "react-router-dom";

import Header from '@/components/layout/header/Header'

import Home from '@/containers/home/Home';
const Contact = lazy(() => import('@/containers/contact/Contact'));

import './App.scss';

const App: React.FunctionComponent = () => (
  <div className="--app">
    <Header />
    <Suspense fallback={<></>}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/projects" exact component={Contact} />
        <Route path="/knowledge" exact component={Contact} />
        <Route path="/resume" exact component={Contact} />

        <Route path="*" exact render={() => <h1>Not Found</h1>} />
      </Switch>
    </Suspense>
  </div>
)

export default App;
