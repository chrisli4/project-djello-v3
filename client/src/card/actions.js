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
	CARD_RECEIVE_UPDATE
} from './constants'

import makeActionCreator from '../makeActionCreator'

export const cardCreate 		= makeActionCreator(CARD_CREATE, 'user', 'card')
export const cardCreateSuccess = makeActionCreator(CARD_CREATE_SUCCESS, 'card')
export const cardCreateError 	= makeActionCreator(CARD_CREATE_ERROR, 'error')

export const cardUpdate 		= makeActionCreator(CARD_UPDATE, 'card', 'field', 'value')
export const cardUpdateSubmit	= makeActionCreator(CARD_UPDATE_SUBMIT, 'user', 'card')
export const cardUpdateSuccess = makeActionCreator(CARD_UPDATE_SUCCESS, 'card')
export const cardUpdateError 	= makeActionCreator(CARD_UPDATE_ERROR, 'error')

export const cardReceiveUpdate = makeActionCreator(CARD_RECEIVE_UPDATE, 'card')

export const cardDelete 		= makeActionCreator(CARD_DELETE, 'user', 'card')
export const cardDeleteSuccess = makeActionCreator(CARD_DELETE_SUCCESS, 'card')
export const cardDeleteError 	= makeActionCreator(CARD_DELETE_ERROR, 'error')

export const cardAddMember		= makeActionCreator(CARD_ADD_MEMBER, 'card', 'member')
export const cardDeleteMember	= makeActionCreator(CARD_DELETE_MEMBER, 'card', 'member')