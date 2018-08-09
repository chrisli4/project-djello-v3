import {
	USER_SET,
	USER_UNSET,
	USER_UPDATE,
	USER_UPDATE_SUBMIT,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_ERROR
} from './constants';

import makeActionCreator from '../makeActionCreator';

export const userSet 			= makeActionCreator(USER_SET, 'data');
export const userUnset 			= makeActionCreator(USER_UNSET);
export const userUpdate 		= makeActionCreator(USER_UPDATE, 'field', 'value')
export const userUpdateSubmit 	= makeActionCreator(USER_UPDATE_SUBMIT, 'user')
export const userUpdateSuccess 	= makeActionCreator(USER_UPDATE_SUCCESS)
export const userUpdateError 	= makeActionCreator(USER_UPDATE_ERROR, 'error')