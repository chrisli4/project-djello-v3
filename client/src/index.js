import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'

import createSagaMiddleware from 'redux-saga'
import registerServiceWorker from './registerServiceWorker'

import {
	ConnectedRouter,
	routerMiddleware,
} from 'react-router-redux'

import App from './App'
import IndexReducer from './index-reducer'  
import IndexSagas from './index-sagas'

import 'bootstrap/dist/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css';

const history = createHistory()
const middleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
	IndexReducer,
	composeSetup(applyMiddleware(sagaMiddleware, middleware)), 
  )

sagaMiddleware.run(IndexSagas)
registerServiceWorker();

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>, 
	document.getElementById('root')
	);

export { history };
