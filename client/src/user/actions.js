import {
	USER_SET,
	USER_UNSET,
	USER_UPDATE,
	USER_UPDATE_SUBMIT,
} from './constants';

import makeActionCreator from '../makeActionCreator';

export const userSet = makeActionCreator(USER_SET, 'data');
export const userUnset = makeActionCreator(USER_UNSET);