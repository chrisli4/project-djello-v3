import {
	LIST_SET,
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

import makeActionCreator from '../makeActionCreator'

export const listCreate 		= makeActionCreator(LIST_CREATE, 'user', 'list')
export const listCreateSuccess = makeActionCreator(LIST_CREATE_SUCCESS, 'list')
export const listCreateError 	= makeActionCreator(LIST_CREATE_ERROR, 'error')

export const listUpdate 		= makeActionCreator(LIST_UPDATE, 'list')
export const listUpdateSubmit	= makeActionCreator(LIST_UPDATE_SUBMIT, 'user', 'list')
export const listUpdateSuccess = makeActionCreator(LIST_UPDATE_SUCCESS, 'list')
export const listUpdateError 	= makeActionCreator(LIST_UPDATE_ERROR, 'error')

export const listDelete 		= makeActionCreator(LIST_DELETE, 'user', 'list')
export const listDeleteSuccess = makeActionCreator(LIST_DELETE_SUCCESS, 'list')
export const listDeleteError 	= makeActionCreator(LIST_DELETE_ERROR, 'error')