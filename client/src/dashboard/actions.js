import {
	DATA_REQUEST,
	DATA_REQUEST_SUCCESS,
	DATA_REQUEST_ERROR,
} from './constants'

import makeActionCreator from '../makeActionCreator'

export const dataRequest 		= makeActionCreator(DATA_REQUEST, 'user')
export const dataRequestSuccess = makeActionCreator(DATA_REQUEST_SUCCESS, 'data')
export const dataRequestError 	= makeActionCreator(DATA_REQUEST_ERROR, 'error')