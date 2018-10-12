// @flow

import * as React from 'react';

import {register} from '@sensu/lib/runtime';

import Panel from '@sensu/lib/component/Panel';
import Button from '@sensu/lib/component/Button';

class ExampleRouteHandler extends React.PureComponent<mixed> {
  render() {
    return <Panel>Example <Button>Shared Component</Button></Panel>;
  }
}

register({
  id: 'some:module:id',
  routes: [
    {
      path: '/example',
      component: ExampleRouteHandler,
    },
  ],
  navigation: [{label: 'Example Route', location: 'example'}],
});
