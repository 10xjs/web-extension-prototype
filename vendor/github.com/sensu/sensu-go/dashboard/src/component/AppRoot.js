// @flow

import * as React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import {Runtime} from '@sensu/lib/runtime';
import Button from '@sensu/lib/component/Button';

class AppRoot extends React.Component<{}> {
  static rootElementId = 'app';

  render() {
    return (
      <Runtime>
        {({modules}) => {
          let routes = [];

          let navigation = [];

          modules.forEach((module) => {
            routes = routes.concat(
              module.routes.map((route) => ({...route, scope: module.id})),
            );

            navigation = navigation.concat(
              module.navigation.map((item) => ({...item, scope: module.id})),
            );
          });

          return (
            <div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Link to="/">Home</Link>
                {navigation.map(({label, location, scope}) => (
                  <Link key={`${scope}:${location}`} to={location}>
                    {label}
                  </Link>
                ))}
              </div>
              <div>
                <Switch>
                  <Route exact path="/" render={() => 'Landing'} />
                  {routes.map(({path, component, scope}) => (
                    <Route
                      key={`${scope}:${path}`}
                      path={path}
                      component={component}
                    />
                  ))}
                  <Route render={() => 'Not Found'} />
                </Switch>
              </div>
            </div>
          );
        }}
      </Runtime>
    );
  }
}

export default AppRoot;
