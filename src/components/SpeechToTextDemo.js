import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';

import '../styling/main.css';

class SpeechToTextDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      interimText: '',
      finalisedText: [],
      listening: false
    };
  }

  componentDidMount() {
    const onAnythingSaid = text => {
      this.setState({ interimText: text });
    };

    const onFinalised = text => {
      this.setState({ finalisedText: this.state.finalisedText.concat(text) });
    };

    const onFinishedListening = () => {
      this.setState({ listening: false });
    };

    try {
      this.listener = new SpeechToText(
        onAnythingSaid,
        onFinalised,
        onFinishedListening
      );
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { error, interimText, finalisedText, listening } = this.state;

    let content;
    if (error) {
      content = <h1>{error}</h1>;
    } else {
      content = (
        <div>
          <h1>{listening ? 'Listening...' : 'Finished listening.'}</h1>
          <h2>Current utterances</h2>
          <p>{interimText}</p>
          <h2>Finalised text</h2>
          <ul>
            {finalisedText.map((str, index) => <li key={index}>{str}</li>)}
          </ul>
        </div>
      );
    }

    return <div className="speech-to-text-demo">{content}</div>;
  }
}

export default SpeechToTextDemo;
