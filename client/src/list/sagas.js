import {
	listCreateSuccess,
	listCreateError,
	listUpdateSuccess,
	listUpdateError,
	listDeleteSuccess,
	listDeleteError,
} from './actions'

import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAPI, makeOptions } from '../lib/api' 
import { LIST_CREATE, LIST_UPDATE_SUBMIT, LIST_DELETE } from './constants'

function* listCreateFlow(action) {
	try {
		const { user, list } = action
		const URL = `http://localhost:3001/users/${user.username}/boards/${list.boardId}/lists/`
		const created = yield call(fetchAPI, URL, makeOptions('POST', user, { list: list }))
		yield put(listCreateSuccess(created))
	} catch(e) {
		yield put(listCreateError(e))
	}
}

function* listUpdateFlow(action) {
	try {
		const { user, list } = action
		const URL = `http://localhost:3001/users/${user.username}/boards/${list.boardId}/lists/${list._id}`
		const updated = yield call(fetchAPI, URL, makeOptions('PUT', user, { list: list }))
		yield put(listUpdateSuccess(updated))
	} catch(e) {
		yield put(listUpdateError(e))
	}
}

function* listDeleteFlow(action) {
	try {
		const { user, list } = action
		const URL = `http://localhost:3001/users/${user.username}/boards/${list.boardId}/lists/${list._id}`
		const deleted = yield call(fetchAPI, URL, makeOptions('DELETE', user, { list: list }))
		yield put(listDeleteSuccess(deleted))
	} catch(e) {
		yield put(listDeleteError(e))
	}
}

function* listWatcher() {
	yield [
		takeLatest(LIST_CREATE, listCreateFlow),
		takeLatest(LIST_UPDATE_SUBMIT, listUpdateFlow),
		takeLatest(LIST_DELETE, listDeleteFlow),
	]
}

export default listWatcher