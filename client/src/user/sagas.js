import { userUpdateSuccess, userUpdateError } from './actions'

import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAPI, makeOptions } from '../lib/api' 
import { USER_UPDATE_SUBMIT } from './constants'

function* userUpdateFlow(action) {
	try {
		const { user } = action
		const URL = `http://localhost:3001/users/${user.username}/`
		const updated = yield call(fetchAPI, URL, makeOptions('PUT', user, {}))
		yield put(userUpdateSuccess(updated))
	} catch(e) {
		yield put(userUpdateError(e))
	}
}

function* userWatcher() {
	yield takeLatest(USER_UPDATE_SUBMIT, userUpdateFlow)
}

export default userWatcher