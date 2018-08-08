import { 
	dataRequestSuccess, 
	dataRequestError 
} from './actions'

import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAPI, makeOptions } from '../lib/api'
import { DATA_REQUEST } from './constants'

function* dataRequestFlow(action) {
	try {
		const { user } = action
		const URL = `http://localhost:3001/users/${user.username}/data/`
		const data = yield call(fetchAPI, URL, makeOptions('GET', user))
		yield put(dataRequestSuccess(data))
	} catch(e) {
		yield put(dataRequestError(e))
	}
}

function* dataWatcher() {
	yield takeLatest(DATA_REQUEST, dataRequestFlow)
}

export default dataWatcher