import {
	CARD_CREATE,
	CARD_CREATE_SUCCESS,
	CARD_CREATE_ERROR,
	CARD_UPDATE,
	CARD_UPDATE_SUBMIT,
	CARD_UPDATE_SUCCESS,
	CARD_UPDATE_ERROR,
	CARD_DELETE,
	CARD_DELETE_SUCCESS,
	CARD_DELETE_ERROR,
	CARD_ADD_MEMBER,
	CARD_DELETE_MEMBER,
	CARD_RECEIVE_UPDATE,
	CARD_RECEIVE_DELETE
} from './constants'

import { DATA_REQUEST_SUCCESS } from '../dashboard/constants'
import { BOARD_DELETE_SUCCESS } from '../board/constants'
import { LIST_DELETE_SUCCESS } from '../list/constants'

import { deleteByObj, deleteByProp, deleteById } from '../lib/reducers'

const initialState = {
	byId: {},
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

const reducer = function(state = initialState, action) {
	switch(action.type) {

		case CARD_CREATE: 
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `${action.card.title} being created...`,
					time: Date.now()
				}],
				errors: []
			}

		case CARD_CREATE_SUCCESS:
			return {
				...state,
				requesting: false,
				successful: true,
				messages: [{
					body: `${action.card._id} created!`,
					time: Date.now()
				}],
				errors: [],
				byId: {
					...state.byId,
					[action.card._id]: action.card
				}
			}

		case CARD_CREATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: Date.now(),
				}])
			}

		case CARD_UPDATE: 
			return {
				...state,
				byId: {
					...state.byId,
					[action.card._id]: {
						...state.byId[action.card._id],
						[action.field]: action.value
					}
				}
			}

		case CARD_UPDATE_SUBMIT:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `${action.card._id} being updated...`,
					time: Date.now()
				}],
				errors: [],
			}

		case CARD_UPDATE_SUCCESS:
			return {
				...state,
				requesting: false,
				successful: true,
				messages: [{
					body: `${action.card._id} updated!`,
					time: Date.now()
				}],
				errors: [],
			}

		case CARD_UPDATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: Date.now(),
				}])
			}

		case CARD_RECEIVE_UPDATE:
			return {
				...state,
				byId: {
					...state.byId,
					[action.card._id]: action.card
				}
			}

		case CARD_RECEIVE_DELETE:
			return {
				...state,
				byId: deleteByObj(state.byId, action.card)
			}

		case CARD_DELETE: 
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `${action.card._id} being deleted...`,
					time: Date.now()
				}],
				errors: [],
			}

		case CARD_DELETE_SUCCESS:
			return {
				...state,
				requesting: false,
				successful: true,
				messages: [{
					body: `${action.card._id} deleted!`,
					time: Date.now()
				}],
				errors: [],
				byId: deleteByObj(state.byId, action.card)
			}

		case CARD_DELETE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: Date.now(),
				}])
			}

		case CARD_ADD_MEMBER:
			return {
				...state,
				byId: {
					...state.byId,
					[action.card._id]: {
						...state.byId[action.card._id],
						members: [...state.byId[action.card._id].members, action.member]
					}
				}
			}

		case CARD_DELETE_MEMBER:
			return {
				...state,
				byId: {
					...state.byId,
					[action.card._id]: {
						...state.byId[action.card._id],
						members: deleteById(state.byId[action.card._id].members, action.member)
					}
				}
			}

		case DATA_REQUEST_SUCCESS: 
			return {
				...state,
				byId: action.data.cards
			}

		case BOARD_DELETE_SUCCESS:
			return {
				...state,
				byId: deleteByProp(state.byId, 'listId', action.board.lists)
			}

		case LIST_DELETE_SUCCESS:
			return {
				...state,
				byId: deleteByProp(state.byId, 'listId', action.list._id)
			}

		default:
			return state
	}
}

export default reducer