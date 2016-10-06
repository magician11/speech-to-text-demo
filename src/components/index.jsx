import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';

import styling from '../styling/main.scss';

class SpeechToTextDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      interimText: '',
      finalisedText: [],
      listening: false,
    };
  }

  componentWillMount() {
    const onAnythingSaid = (text) => {
      this.setState({ interimText: text });
    };

    const onFinalised = (text) => {
      this.setState({ finalisedText: this.state.finalisedText.concat(text) });
    };

    const onFinishedListening = () => {
      this.setState({ listening: false });
    };

    try {
      this.listener = new SpeechToText(onAnythingSaid, onFinalised, onFinishedListening);
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { error, interimText, finalisedText, listening } = this.state;

    let title;
    if (error) {
      title = error;
    } else {
      title = listening ? 'Listening...' : 'Finished listening';
    }

    return (
      <div className={styling['speech-to-text-demo']}>
        <h1>{title}</h1>
        <h2>Current utterances</h2>
        <p>{interimText}</p>
        <h2>Finalised text</h2>
        <ul>{finalisedText.map((str, index) => <li key={index}>{str}</li>)}</ul>
      </div>
    );
  }
}

export default SpeechToTextDemo;
