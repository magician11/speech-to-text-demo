import React from 'react';
import ReactDOM from 'react-dom';
import YourComponent from './components/your-component';

// remove margins
document.body.style.margin = 0;

ReactDOM.render(<YourComponent />, document.getElementById('app'));
