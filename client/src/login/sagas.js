import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { userSet, userUnset } from '../user/actions';
import { USER_UNSET } from '../user/constants';
import { history } from '../index.js';
import { fetchAPI, makeUserOptions } from '../lib/api'


function* logout() {
	yield put(userUnset())
	localStorage.removeItem('token')
	history.push('/login')
}

function* loginFlow(email, password){
	let response
	try {
		response = yield call(fetchAPI, `http://localhost:3001/login`, makeUserOptions({ email, password }))
		yield put(userSet(response))
		yield put({ type: LOGIN_SUCCESS })
		localStorage.setItem('token', response.token)
		history.push('/home')
	} catch (error) {
		yield put({ type: LOGIN_ERROR, error })
	} finally {
		if (yield cancelled()) {
			history.push('/login')
		}
	}
}

function* loginWatcher(){

	while(true) {
		const { email, password } = yield take(LOGIN_REQUESTING);
		const task = yield fork(loginFlow, email, password);
		const action = yield take([USER_UNSET, LOGIN_ERROR]);
		if(action.type === USER_UNSET) yield cancel(task)
		yield call(logout)
	}
}

export default loginWatcher
