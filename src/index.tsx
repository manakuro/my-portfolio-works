/* tslint:disable */
import Layout from '@/components/Layout/Layout'

require('intersection-observer')

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Home from './components/Home/Home'
import { Provider } from 'react-redux'

import configureStore from './store/configure'
import registerServiceWorker from './registerServiceWorker'

// global css
import 'sanitize.css'
import './index.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-id-swiper/src/styles/css/swiper.css'
import 'github-markdown-css/github-markdown.css'

// modules
import { ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

const store = configureStore()
const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Layout history={history}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={Home} />
        </div>
      </ConnectedRouter>
    </Layout>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
