import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors';
import { fetchAPI, makeOptions } from '../lib/api'


import {
	teamSendSuccess,
	teamSendNotFound, 
	teamSendError, 
	teamAcceptSuccess, 
	teamAcceptError, 
	teamDeclineSuccess, 
	teamDeclineError
} from './actions'


import { TEAM_SEND, TEAM_SEND_CANCEL, TEAM_ACCEPT, TEAM_DECLINE } from './constants'

function* teamSendFlow(action) {
	try {
		console.log(user, userToSend)
		const { user, userToSend } = action
		const URL = `http://localhost:3001/users/${user.username}/team/send`
		const found = yield call(fetchAPI, URL, makeOptions('POST', user, { receiveId: userToSend }))
		
		if(found)
			yield put(teamSendSuccess(found))
		else
			yield put(teamSendNotFound)
	} catch(e) {
		yield put(teamSendError(e))
	}
}

function* teamSendCancelFlow(action) {
	try {
		const { user, userToCancel } = action
		const URL = `http://localhost:3001/users/team/cancel`
		const found = yield call(fetchAPI, URL, makeOptions('POST', user, { receiveId: userToCancel }))
		yield put(teamSendSuccess(found))
	} catch(e) {
		yield put(teamSendError(e))
	}
}

function* teamAcceptFlow(action) {
	try {
		const { user, userToAccept } = action
		const URL = `http://localhost:3001/users/team/accept`
		const accept = yield call(fetchAPI, URL, makeOptions('POST', user, { sendId: userToAccept }))
		yield put(teamAcceptSuccess(accept))
	} catch(e) {
		yield put(teamAcceptError(e))
	}
}

function* teamDeclineFlow(action) {
	try {
		const { user, userToDecline } = action
		const URL = `http://localhost:3001/users/team/decline`
		const decline = yield call(fetchAPI, URL, makeOptions('POST', user, { sendId: userToDecline }))
		yield put(teamDeclineSuccess(decline))
	} catch(e) {
		yield put(teamDeclineError(e))
	}
}

function* teamWatcher() {
	yield [
		takeLatest(TEAM_SEND, teamSendFlow),
		takeLatest(TEAM_SEND_CANCEL, teamSendCancelFlow),
		takeLatest(TEAM_ACCEPT, teamAcceptFlow),
		takeLatest(TEAM_DECLINE, teamDeclineFlow)
	]
}

export default teamWatcher
