import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// global css
import 'sanitize.css';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-id-swiper/src/styles/css/swiper.css';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
