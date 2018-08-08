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
	TEAM_DECLINE_ERROR,
	TEAM_REMOVE,
	TEAM_REMOVE_SUCCESS,
	TEAM_REMOVE_ERROR,
	INVITE_RECEIVE,
	INVITE_CANCEL,
	INVITE_DECLINE,
	INVITE_ACCEPT,
} from './constants'

import { DATA_REQUEST_SUCCESS } from '../dashboard/constants'

import { deleteById } from '../lib/reducers'

const initialState = {
	userId: '',
	found: '',
	team: [],
	teamSend: [],
	teamReceived: [],
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

function isEmpty(state, action, func) {
	if(action === null) {
		return [...state] 
	}
	else
		return func(state, action)
}

function concat(state, action) {
	return [...state, action]
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
				teamSend: isEmpty(state.teamSend, action.user, concat)
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
				teamSend: isEmpty(state.teamSend, action.user, deleteById),
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
				team: isEmpty(state.team, action.user, concat),
				teamSend: deleteById(state.teamSend, action.user),
				teamReceived: deleteById(state.teamReceived, action.user),
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
				teamReceived: isEmpty(state.teamReceived, action.user, deleteById),
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

		case TEAM_REMOVE:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `removing ${action.userToRemove} from team...`,
					time: Date.now()
				}],
			}

		case TEAM_REMOVE_SUCCESS:
			return {
				...state,
				requesting: false,
				successful: true,
				team: deleteById(state.team, action.user)
			}

		case TEAM_REMOVE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: Date.now(),
				}])
			}

		case INVITE_RECEIVE:
			return {
				...state,
				teamReceived: [...state.teamReceived, action.user ]
			}

		case INVITE_CANCEL:
			return {
				...state,
				teamReceived: deleteById(state.teamSend, action.user)
			}

		case INVITE_ACCEPT:
			return {
				...state,
				team: [...state.team, action.user],
				teamSend: deleteById(state.teamSend, action.user)
			}

		case INVITE_DECLINE:
			return {
				...state,
				teamSend: deleteById(state.teamSend, action.user)
			}

		default:
			return state
	}
}

export default reducer