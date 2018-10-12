// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import {Runtime} from '@sensu/lib/runtime';

import AppRoot from '/component/AppRoot';

const root = document.createElement('div');
document.body && document.body.appendChild(root);

const renderApp = () => {
  ReactDOM.render(
    <Runtime>
      {() => (
        <Router>
          <AppRoot />
        </Router>
      )}
    </Runtime>,
    root,
  );
};

export default renderApp;
