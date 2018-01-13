import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Container from './Container'
import Appside from './Appside'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Container />, document.getElementById('app'));
ReactDOM.render(<Appside />, document.getElementById('app-side'));
registerServiceWorker();
