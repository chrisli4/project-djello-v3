import {
	cardCreateSuccess,
	cardCreateError,
	cardUpdateSubmit,
	cardUpdateSuccess,
	cardUpdateError,
	cardDeleteSuccess,
	cardDeleteError,
} from './actions'

import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchAPI, makeOptions } from '../lib/api' 
import { CARD_CREATE, CARD_UPDATE_SUBMIT, CARD_DELETE } from './constants'

function* cardCreateFlow(action) {
	try {
		const { user, card } = action
		const URL = `${process.env.REACT_APP_API_URL}/users/${user.username}/boards/boardId/lists/${card.listId}/cards`
		const created = yield call(fetchAPI(URL, makeOptions('POST', user, card)))
		yield put(cardCreateSuccess(created))
	} catch(e) {
		yield put(cardCreateError(e))
	}
}

function* cardUpdateFlow(action) {
	try {
		const { user, card } = action
		const URL = `${process.env.REACT_APP_API_URL}/users/${user.username}/boards/boardId/lists/${card.listId}/cards/${card.id}/`
		const updated = yield call(fetchAPI(URL, makeOptions('PUT', user, card)))
		yield put(cardUpdateSuccess(updated))
	} catch(e) {
		yield put(cardCreateError(e))
	}
}

function* cardDeleteFlow(action) {
	try {
		const { user, card } = action
		const URL = `${process.env.REACT_APP_API_URL}/users/${user.username}/boards/boardId/lists/${card.listId}/cards/${card.id}/`
		const deleted = yield call(fetchAPI(URL, makeOptions('DELETE', user, card)))
		yield put(cardDeleteSuccess(deleted))
	} catch(e) {
		yield put(cardDeleteError(e))
	}
}

function* cardWatcher() {
	yield [
		takeLatest(CARD_CREATE, cardCreateFlow),
		takeLatest(CARD_UPDATE_SUBMIT, cardUpdateFlow),
		takeLatest(CARD_DELETE, cardDeleteFlow),
	]
}

export default cardWatcher