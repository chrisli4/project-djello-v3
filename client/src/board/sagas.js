import {
	boardCreateSuccess,
	boardCreateError,
	boardUpdateSubmit,
	boardUpdateSuccess,
	boardUpdateError,
	boardDeleteSuccess,
	boardDeleteError,
} from './actions'

import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAPI, makeOptions } from '../lib/api' 
import { BOARD_CREATE, BOARD_UPDATE_SUBMIT, BOARD_DELETE } from './constants'

function* boardCreateFlow(action) {
	try {
		const { user, board } = action
		const URL = `${process.env.REACT_APP_API_URL}/users/${user.username}/boards/`
		const created = yield call(fetchAPI(URL, makeOptions('POST', user, board)))
		yield put(boardCreateSuccess(created))
	} catch(e) {
		yield put(boardCreateError(e))
	}
}

function* boardUpdateFlow(action) {
	try {
		const { user, board } = action
		const URL = `${process.env.REACT_APP_API_URL}/users/${user.username}/boards/${board.id}`
		const updated = yield call(fetchAPI(URL, makeOptions('PUT', user, board)))
		yield put(boardUpdateSuccess(updated))
	} catch(e) {
		yield put(boardCreateError(e))
	}
}

function* boardDeleteFlow(action) {
	try {
		const { user, board } = action
		const URL = `${process.env.REACT_APP_API_URL}/users/${user.username}/boards/${board.id}`
		const deleted = yield call(fetchAPI(URL, makeOptions('DELETE', user, board)))
		yield put(boardDeleteSuccess(deleted))
	} catch(e) {
		yield put(boardDeleteError(e))
	}
}

function* boardWatcher() {
	yield [
		takeLatest(BOARD_CREATE, boardCreateFlow),
		takeLatest(BOARD_UPDATE_SUBMIT, boardUpdateFlow),
		takeLatest(BOARD_DELETE, boardDeleteFlow),
	]
}

export default boardWatcher