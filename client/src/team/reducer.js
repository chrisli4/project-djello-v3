import {
	TEAM_SEND,
	TEAM_SEND_SUCCESS,
	TEAM_SEND_NOT_FOUND,
	TEAM_SEND_ERROR,
	TEAM_SEND_CANCEL,
	TEAM_SEND_CANCEL_ERROR,
	TEAM_SEND_CANCEL_SUCCESS,
	TEAM_ACCEPT,
	TEAM_ACCEPT_SUCCESS,
	TEAM_ACCEPT_ERROR,
	TEAM_DECLINE,
	TEAM_DECLINE_SUCCESS,
	TEAM_DECLINE_ERROR
} from './constants'

import { DATA_REQUEST_SUCCESS } from '../dashboard/constants'

import { deleteByObj, deleteById } from '../lib/reducers'

const initialState = {
	userId: '',
	found: '',
	team: [],
	teamSent: [],
	teamReceived: [],
	cards: [],
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

const reducer = function(state = initialState, action) {
	switch(action.type) {

		case DATA_REQUEST_SUCCESS: 
			return {
				...state,
				...action.data.team
			}

		case TEAM_SEND:
			return {
				...state,
				found: '',
				requesting: true,
				successful: false,
				messages: [{
					body: `sending team invite to ${action.userToSend}...`,
					time: Date.now()
				}],
			}

		case TEAM_SEND_SUCCESS:
			return {
				...state,
				found: true,
				requesting: false,
				successful: true,
				teamSent: [ ...state.teamSent, action.user ]
			}

		case TEAM_SEND_NOT_FOUND:
			return {
				...state,
				found: false
			}

		case TEAM_SEND_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: Date.now(),
				}])
			}

		case TEAM_SEND_CANCEL:
			return {
				...state,
				requesting: true,
				successful: false,
			}

		case TEAM_SEND_CANCEL_SUCCESS:
			return {
				...state,
				teamSent: deleteById(state.teamSent, action.user),
				requesting: false,
				successful: true,
			}

		case TEAM_SEND_CANCEL_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: Date.now(),
				}])
			}

		case TEAM_ACCEPT:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `accepting invite from ${action.userToAccept}...`,
					time: Date.now()
				}],
			}

		case TEAM_ACCEPT_SUCCESS:
			return {
				...state,
				team: [ ...state.team, action.user ],
				requesting: false,
				successful: true,
			}

		case TEAM_ACCEPT_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: Date.now(),
				}])
			}

		case TEAM_DECLINE:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `declining invite from ${action.userToDecline}...`,
					time: Date.now()
				}],
			}

		case TEAM_DECLINE_SUCCESS:
			return {
				...state,
				teamReceived: deleteById(state.teamReceived, action.user),
				requesting: false,
				successful: true,
			}

		case TEAM_DECLINE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: Date.now(),
				}])
			}


		default:
			return state
	}
}

export default reducer