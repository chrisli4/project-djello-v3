import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import signup from './signup/reducer'
import login from './login/reducer'
import user from './user/reducer'
import dashboard from './dashboard/reducer'
import boards from './board/reducer';
import lists from './list/reducer';
import cards from './card/reducer';
import team from './team/reducer'


const IndexReducer = combineReducers({
	signup,
	login,
	user,
	dashboard,
	boards,
	lists,
	cards,
	team,
	router: routerReducer, 
	form: formReducer
})

export default IndexReducer;