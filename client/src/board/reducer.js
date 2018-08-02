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
	BOARD_CURRENT
} from './constants'

import { DATA_REQUEST_SUCCESS } from '../dashboard/constants'
import { LIST_CREATE_SUCCESS, LIST_DELETE_SUCCESS } from '../list/constants'

import { deleteByObj, deleteById } from '../lib/reducers'

const initialState = {
	current: 'i',
	byId: {
		'i': {
			_id: '',
			title: '',
			description: '',
			lists: [],
		}
	},
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

const reducer = function(state = initialState, action) {
	switch(action.type) {

		case BOARD_CURRENT:
			return {
				...state,
				current: action.id
			}

		case BOARD_CREATE: 
		return {
			...state,
			requesting: true,
			successful: false,
			messages: [{
				body: `${action.board.title} being created...`,
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
				body: `${action.board._id} created!`,
				time: Date.now()
			}],
			errors: [],
			byId: {
				...state.byId,
				[action.board._id]: action.board
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
				[action.board._id]: {
					...state.byId[action.board._id],
					[action.field]: action.value
				}
			}
		}

		case BOARD_UPDATE_SUBMIT:
		return {
			...state,
			requesting: true,
			successful: false,
			messages: [{
				body: `${action.board._id} being updated...`,
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
				body: `${action.board._id} updated!`,
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
				body: `${action.board._id} being deleted...`,
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
				body: `${action.board._id} deleted!`,
				time: Date.now()
			}],
			errors: [],
			byId: deleteByObj(state.byId, action.board),
			current: Object.keys(state.byId)[1]
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
			current: Object.keys(action.data.boards)[0],
			byId: action.data.boards
		}

		case LIST_CREATE_SUCCESS:
		return {
			...state,
			byId: {
				...state.byId,
				[action.list.boardId]: {
					...state.byId[ action.list.boardId ],
					lists: [ ...state.byId[action.list.boardId].lists, action.list._id ]
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
					lists: deleteById(state.byId[action.list.boardId].lists, action.list._id)
				}
			}
		}

		default:
		return state
	}
}

export default reducer