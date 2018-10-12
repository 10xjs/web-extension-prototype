// @flow

import * as React from 'react';

// flowlint unclear-type: off
type RouteHandler = React.ComponentType<any>;
// flowlint unclear-type: error

type Module = {
  id: string,
  routes: Array<{path: string, component: RouteHandler}>,
  navigation: Array<{location: string, label: string}>,
};

let modules: Array<Module> = [];
let listeners: Array<(Array<Module>) => void> = [];

export const register = (module: Module) => {
  if (modules.find(({id}) => id === module.id)) {
    throw new Error(`Duplicate module: ${module.id}`);
  }

  modules = modules.concat([module]);
  listeners.slice().forEach((listener) => listener(modules));
};

export const getModules = () => modules;

export const addListener = (listener: (Array<Module>) => void): void => {
  listeners = listeners.concat([listener]);
};

export const removeListener = (listener: (Array<Module>) => void): void => {
  const index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners = listeners.slice(0, index).concat(listeners.slice(index + 1));
  }
};

type State = {
  modules: Array<Module>,
};

type Props = {
  children: (State) => React.Node,
};

export class Runtime extends React.PureComponent<Props, State> {
  state = {
    modules: getModules(),
  };

  handleModules = (modules: Array<Module>) => {
    this.setState({modules});
  };

  componentDidMount() {
    addListener(this.handleModules);
  }

  componentWillUnmount() {
    removeListener(this.handleModules);
  }

  render() {
    return this.props.children(this.state);
  }
}
