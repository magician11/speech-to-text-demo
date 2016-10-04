import React from 'react';
import ReactDOM from 'react-dom';
import SpeechToTextDemo from './components/speech-to-text-demo';

// remove margins
document.body.style.margin = 0;

ReactDOM.render(<SpeechToTextDemo />, document.getElementById('app'));
