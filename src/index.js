import React from 'react';
import ReactDOM from 'react-dom';
import 'spectre.css/dist/spectre.css'
import './index.css';
import App from './App';
import Appside from './Appside'
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Appside />, document.getElementById('app-side'));
registerServiceWorker();
