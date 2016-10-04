import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';

import styling from '../styling/main.scss';

class SpeechToTextDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      interimText: '',
    };

    this.initListener = this.initListener.bind(this);
    this.initListener();
    this.listener.startListening();
  }

  initListener() {
    const onAnythingSaid = text => this.setState({ interimText: text });
    const onFinalised = text => this.setState({ finalisedText: text });

    try {
      this.listener = new SpeechToText(onAnythingSaid, onFinalised);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { error, interimText } = this.state;

    let content;
    if (error) {
      content = { error };
    } else if (interimText === '') {
      content = 'Say anything you like :)';
    } else {
      content = this.state.interimText;
    }

    return (
      <div className={styling['speech-to-text-demo']}>
        <h1>{content}</h1>
      </div>
    );
  }
}

export default SpeechToTextDemo;
