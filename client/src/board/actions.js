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

import makeActionCreator from '../makeActionCreator'

export const boardCreate 		= makeActionCreator(BOARD_CREATE, 'user', 'board')
export const boardCreateSuccess = makeActionCreator(BOARD_CREATE_SUCCESS, 'board')
export const boardCreateError 	= makeActionCreator(BOARD_CREATE_ERROR, 'error')

export const boardUpdate 		= makeActionCreator(BOARD_UPDATE, 'board', 'field', 'value')
export const boardUpdateSubmit	= makeActionCreator(BOARD_UPDATE_SUBMIT, 'user', 'board')
export const boardUpdateSuccess = makeActionCreator(BOARD_UPDATE_SUCCESS, 'board')
export const boardUpdateError 	= makeActionCreator(BOARD_UPDATE_ERROR, 'error')

export const boardDelete 		= makeActionCreator(BOARD_DELETE, 'user', 'board')
export const boardDeleteSuccess = makeActionCreator(BOARD_DELETE_SUCCESS, 'board')
export const boardDeleteError 	= makeActionCreator(BOARD_DELETE_ERROR, 'error')

export const boardCurrent 		= makeActionCreator(BOARD_CURRENT, 'id')