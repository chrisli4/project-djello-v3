import {
	USER_SET,
	USER_UNSET,
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

		default:
			return state;
	}
}

export default reducer;