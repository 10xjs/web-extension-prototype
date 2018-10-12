// @flow

import * as React from 'react';

type Props = {
  children: React.Node,
};

class Panel extends React.PureComponent<Props> {
  render() {
    return (
      <div
        style={{
          display: 'inline-block',
          outline: '1px solid blue',
          paddding: 10,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Panel;
