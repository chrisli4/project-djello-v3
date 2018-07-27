import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import boards from './board/reducer';
import lists from './list/reducer';
import cards from './card/reducer';

const IndexReducer = combineReducers({
	boards,
	lists,
	cards,
	router: routerReducer
})

export default IndexReducer;