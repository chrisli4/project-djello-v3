import React from 'react'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user/reducer'
import dashboard from './dashboard/reducer'
import boards from './board/reducer';
import lists from './list/reducer';
import cards from './card/reducer';
import { reducer as formReducer } from 'redux-form'

const initialState = {
	title: '',
	description: ''
};

const IndexReducer = combineReducers({
	user,
	dashboard,
	boards,
	lists,
	cards,
	router: routerReducer, 
	form: formReducer
})

export default IndexReducer;