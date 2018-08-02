import React from 'react';
import ReactDOM from 'react-dom';
import Saleit from './components/Saleit'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Saleit />, document.getElementById('root'));
registerServiceWorker();
