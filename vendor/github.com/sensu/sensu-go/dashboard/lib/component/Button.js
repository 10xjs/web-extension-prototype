// @flow

import * as React from 'react';

type Props = {
  children: React.Node,
};

class Button extends React.PureComponent<Props> {
  render() {
    const {children, ...props} = this.props;

    return <button {...props}>{children}</button>;
  }
}

export default Button;
