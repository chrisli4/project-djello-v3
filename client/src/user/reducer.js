import {
	USER_SET,
	USER_UNSET,
	USER_UPDATE
} from './constants';

const initialState = {
	username: '',
	email: '',
	firstName: '',
	lastName: '',
	token: '',
}

const reducer = function(state = initialState, action) {
	switch(action.type) {
		case USER_SET:
			return {
				...state,
				...action.data.user,
				token: action.data.token,
			};

		case USER_UNSET:
			return {
				username: '',
				email: '',
				firstName: '',
				lastName: '',
				token: '',
			};

		case USER_UPDATE:
			return {
				...state,
				[action.field]: action.value
			}

		default:
			return state;
	}
}

export default reducer;