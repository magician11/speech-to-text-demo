import React from 'react';
import ReactDOM from 'react-dom';
import SpeechToTextDemo from './components/index';

// remove margins
document.body.style.margin = 0;

ReactDOM.render(<SpeechToTextDemo />, document.getElementById('app'));
