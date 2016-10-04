import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';

import styling from '../styling/main.scss';

class SpeechToTextDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };

    this.initListener = this.initListener.bind(this);
    this.initListener();
  }

  initListener() {
    const onAnythingSaid = text => console.log(`Interim text: ${text}`);
    const onFinalised = text => console.log(`Finalised text: ${text}`);

    try {
      this.listener = new SpeechToText(onAnythingSaid, onFinalised);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { error } = this.state;

    let content;
    if (error) {
      content = <h1>{error}</h1>;
    } else {
      content = <h1>Looking good!</h1>;
    }

    return (
      <div className={styling['speech-to-text-demo']}>
        {content}
      </div>
    );
  }
}

export default SpeechToTextDemo;
