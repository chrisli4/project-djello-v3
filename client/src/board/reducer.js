import {
	BOARD_CREATE,
	BOARD_CREATE_SUCCESS,
	BOARD_CREATE_ERROR,
	BOARD_UPDATE,
	BOARD_UPDATE_SUBMIT,
	BOARD_UPDATE_SUCCESS,
	BOARD_UPDATE_ERROR,
	BOARD_DELETE,
	BOARD_DELETE_SUCCESS,
	BOARD_DELETE_ERROR,
} from './constants'

import { DATA_REQUEST_SUCCESS } from '../dashboard/constants'
import { LIST_CREATE_SUCCESS, LIST_DELETE_SUCCESS } from '../list/constants'

import { deleteByObj, deleteById } from '../lib/reducers'

const initialState = {
	byId: {},
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

const reducer = function(state = initialState, action) {
	switch(action.type) {

		case BOARD_CREATE: 
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `${action.board.id} being created...`,
					time: Date.now()
				}],
				errors: []
			}

		case BOARD_CREATE_SUCCESS:
			return {
				...state,
				requesting: false,
				successful: true,
				messages: [{
					body: `${action.board.id} created!`,
					time: Date.now()
				}],
				errors: [],
				byId: {
					...state.byId,
					[action.board.id]: action.board
				}
			}

		case BOARD_CREATE_ERROR:
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

		case BOARD_UPDATE: 
			return {
				...state,
				byId: {
					...state.byId,
					[action.board.id]: action.board
				}
			}

		case BOARD_UPDATE_SUBMIT:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `${action.board.id} being updated...`,
					time: Date.now()
				}],
				errors: [],
			}

		case BOARD_UPDATE_SUCCESS:
			return {
				...state,
				requesting: false,
				successful: true,
				messages: [{
					body: `${action.board.id} updated!`,
					time: Date.now()
				}],
				errors: [],
			}

		case BOARD_UPDATE_ERROR:
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

		case BOARD_DELETE: 
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `${action.board.id} being deleted...`,
					time: Date.now()
				}],
				errors: [],
			}

		case BOARD_DELETE_SUCCESS:
			return {
				...state,
				requesting: false,
				successful: true,
				messages: [{
					body: `${action.board.id} deleted!`,
					time: Date.now()
				}],
				errors: [],
				byId: deleteByObj(state.byId, action.board)
			}

		case BOARD_DELETE_ERROR:
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
				byId: action.data.boards
			}

		case LIST_CREATE_SUCCESS:
			return {
				...state,
				byId: {
					...state.byId,
					[action.list.boardId]: {
						...state.byId[ action.list.boardId ],
						lists: [ ...state.byId[action.list.boardId].lists, action.list.id ]
					}
				}
			}

		case LIST_DELETE_SUCCESS:
			return {
				...state,
				byId: {
					...state.byId,
					[action.list.boardId]: {
						...state.byId[action.list.boardId],
						lists: deleteById(state.byId[action.list.boardId].lists, action.list.id)
					}
				}
			}

		default:
			return state
	}
}

export default reducer