import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';

import styling from '../styling/main.scss';

class SpeechToTextDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      interimText: '',
      finalisedText: '',
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
    const { error, interimText, finalisedText } = this.state;

    let content;
    if (error) {
      content = <h1>{ error }</h1>;
    } else if (finalisedText) {
      content = (
        <div>
          <h1>Status: finished listening</h1>
          <p>You said: {finalisedText}</p>
        </div>
      );
    } else if (interimText === '') {
      content = <h1>Say anything you like :)</h1>;
    } else {
      content = (
        <div>
          <h1>Status: I'm listening...</h1>
          <p>{interimText}</p>
        </div>
      );
    }

    return (
      <div className={styling['speech-to-text-demo']}>
        {content}
      </div>
    );
  }
}

export default SpeechToTextDemo;
