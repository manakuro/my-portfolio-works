/* tslint:disable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './components/Home/Home';
import { Provider } from 'react-redux';

import configureStore from './store/configure';
import registerServiceWorker from './registerServiceWorker';

// global css
import 'sanitize.css';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-id-swiper/src/styles/css/swiper.css';
import 'github-markdown-css/github-markdown.css';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
