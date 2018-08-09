import {
	TEAM_SEND,
	TEAM_SEND_SUCCESS,
	TEAM_SEND_NOT_FOUND,
	TEAM_SEND_ERROR,
	TEAM_SEND_CANCEL,
	TEAM_SEND_CANCEL_SUCCESS,
	TEAM_SEND_CANCEL_ERROR,
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
	INVITE_ACCEPT,
	INVITE_DECLINE
} from './constants'

import makeActionCreator from '../makeActionCreator'

export const teamSend 				= makeActionCreator(TEAM_SEND, 'user', 'userToSend')
export const teamSendSuccess 		= makeActionCreator(TEAM_SEND_SUCCESS, 'user')
export const teamSendNotFound 		= makeActionCreator(TEAM_SEND_NOT_FOUND)
export const teamSendError 			= makeActionCreator(TEAM_SEND_ERROR, 'error')

export const teamSendCancel 		= makeActionCreator(TEAM_SEND_CANCEL, 'user', 'userToCancel')
export const teamSendCancelSuccess 	= makeActionCreator(TEAM_SEND_CANCEL_SUCCESS, 'user')
export const teamSendCancelError 	= makeActionCreator(TEAM_SEND_CANCEL_ERROR, 'error')

export const teamAccept 			= makeActionCreator(TEAM_ACCEPT, 'user', 'userToAccept')
export const teamAcceptSuccess 		= makeActionCreator(TEAM_ACCEPT_SUCCESS, 'user')
export const teamAcceptError 		= makeActionCreator(TEAM_ACCEPT_ERROR, 'error')

export const teamDecline 			= makeActionCreator(TEAM_DECLINE, 'user', 'userToDecline')
export const teamDeclineSuccess 	= makeActionCreator(TEAM_DECLINE_SUCCESS, 'user')
export const teamDeclineError 		= makeActionCreator(TEAM_DECLINE_ERROR, 'error')

export const teamRemove 			= makeActionCreator(TEAM_REMOVE, 'user', 'userToRemove')
export const teamRemoveSuccess 		= makeActionCreator(TEAM_REMOVE_SUCCESS, 'user')
export const teamRemoveError 		= makeActionCreator(TEAM_REMOVE_ERROR, 'error')

export const inviteReceive 			= makeActionCreator(INVITE_RECEIVE, 'user')
export const inviteCancel 			= makeActionCreator(INVITE_CANCEL, 'user')
export const inviteAccept 			= makeActionCreator(INVITE_ACCEPT, 'user')
export const inviteDecline 			= makeActionCreator(INVITE_DECLINE, 'user')
