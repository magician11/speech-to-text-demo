import React, { Component } from 'react';

import styling from '../styling/main.scss';

class YourComponent extends Component {
  render() {
    const content = <h1>Your React app starting point</h1>;

    return (
      <div className={styling['your-component']}>
        {content}
      </div>
    );
  }
}

export default YourComponent;
