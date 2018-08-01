import {
	LIST_CREATE,
	LIST_CREATE_SUCCESS,
	LIST_CREATE_ERROR,
	LIST_UPDATE,
	LIST_UPDATE_SUBMIT,
	LIST_UPDATE_SUCCESS,
	LIST_UPDATE_ERROR,
	LIST_DELETE,
	LIST_DELETE_SUCCESS,
	LIST_DELETE_ERROR,
} from './constants'

import { DATA_REQUEST_SUCCESS } from '../dashboard/constants'
import { BOARD_DELETE_SUCCESS } from '../board/constants'
import { CARD_CREATE_SUCCESS, CARD_DELETE_SUCCESS } from '../card/constants'

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

		case LIST_CREATE: 
		return {
			...state,
			requesting: true,
			successful: false,
			messages: [{
				body: `${action.list.title} being created...`,
				time: Date.now()
			}],
			errors: []
		}

		case LIST_CREATE_SUCCESS:
		return {
			...state,
			requesting: false,
			successful: true,
			messages: [{
				body: `${action.list._id} created!`,
				time: Date.now()
			}],
			errors: [],
			byId: {
				...state.byId,
				[action.list._id]: action.list
			}
		}

		case LIST_CREATE_ERROR:
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

		case LIST_UPDATE: 
		return {
			...state,
			byId: {
				...state.byId,
				[action.list._id]: {
					...state.byId[action.list._id],
					[action.field]: [action.value]
				}
			}
		}

		case LIST_UPDATE_SUBMIT:
		return {
			...state,
			requesting: true,
			successful: false,
			messages: [{
				body: `${action.list._id} being updated...`,
				time: Date.now()
			}],
			errors: [],
		}

		case LIST_UPDATE_SUCCESS:
		return {
			...state,
			requesting: false,
			successful: true,
			messages: [{
				body: `${action.list._id} updated!`,
				time: Date.now()
			}],
			errors: [],
		}

		case LIST_UPDATE_ERROR:
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

		case LIST_DELETE: 
		return {
			...state,
			requesting: true,
			successful: false,
			messages: [{
				body: `${action.list._id} being deleted...`,
				time: Date.now()
			}],
			errors: [],
		}

		case LIST_DELETE_SUCCESS:
		return {
			...state,
			requesting: false,
			successful: true,
			messages: [{
				body: `${action.list._id} deleted!`,
				time: Date.now()
			}],
			errors: [],
			byId: deleteByObj(state.byId, action.list)
		}

		case LIST_DELETE_ERROR:
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
			byId: action.data.lists
		}

		case BOARD_DELETE_SUCCESS:
		return {
			...state,
			byId: deleteByProp(state.byId, 'boardId', action.board._id)
		}

		case CARD_CREATE_SUCCESS:
		return {
			...state,
			byId: {
				...state.byId,
				[action.card.listId]: {
					...state.byId[ action.card.listId ],
					cards: [ ...state.byId[action.card.listId].cards, action.card._id ]
				}
			}
		}

		case CARD_DELETE_SUCCESS:
		return {
			...state,
			byId: {
				...state.byId,
				[action.card.listId]: {
					...state.byId[ action.card.listId ],
					cards: deleteById(state.byId[action.card.listId].cards, action.card._id)
				}
			}
		}

		default:
		return state
	}
}

export default reducer