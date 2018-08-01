import {
	DATA_REQUEST,
	DATA_REQUEST_SUCCESS,
	DATA_REQUEST_ERROR,
} from './constants';

const initialState = {
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

const reducer = function(state = initialState, action) {
	switch(action.type) {
		case DATA_REQUEST:
		return {
			...state,
			requesting: true,
			successful: false,
			messages: [{
				body: 'Fetching data...',
				time: new Date(),
			}],
			errors: [],
		}

		case DATA_REQUEST_SUCCESS:
		return {
			requesting: false,
			successful: true,
			messages: [{
				body: 'Data fetched.',
				time: new Date(),
			}],
			errors: [],
		}

		case DATA_REQUEST_ERROR:
		return {
			...state,
			requesting: false,
			successful: false,
			messsages: [],
			errors: state.errors.concat([{
				body: action.error.toString(),
				time: new Date(),
			}])
		}
		default:
		return state
	}
}

export default reducer