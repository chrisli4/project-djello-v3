import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux' 
import { Provider } from 'react-redux' 
import createSagaMiddleware from 'redux-saga'
import IndexReducer from './index-reducer'  
import IndexSagas from './index-sagas'

import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";

import { ConnectedRouter, routerMiddleware, push } from "react-router-redux";


import App from './App';

const history = createHistory();
const middleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware()

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(  
	IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware, middleware)), // allows redux devtools to watch sagas
  )

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

// Setup the top level router component for our React Router
ReactDOM.render(  
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root'),
	)

export { history };
