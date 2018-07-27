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
} from './constants'

import { DATA_REQUEST_SUCCESS } from '../dashboard/constants'
import { BOARD_DELETE_SUCCESS } from '../board/constants'
import { LIST_DELETE_SUCCESS } from '../list/constants'

import { deleteByObj, deleteByArr, deleteByProp } from '../lib/reducers'

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
					body: `${action.card.id} being created...`,
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
					body: `${action.card.id} created!`,
					time: Date.now()
				}],
				errors: [],
				byId: {
					...state.byId,
					[action.card.id]: action.card
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
					[action.card.id]: action.card
				}
			}

		case CARD_UPDATE_SUBMIT:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `${action.card.id} being updated...`,
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
					body: `${action.card.id} updated!`,
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

		case CARD_DELETE: 
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `${action.card.id} being deleted...`,
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
					body: `${action.card.id} deleted!`,
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
				byId: deleteByProp(state.byId, 'listId', action.list.id)
			}

		default:
			return state
	}
}

export default reducer