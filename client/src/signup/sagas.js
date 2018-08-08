import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';
import { fetchAPI, makeUserOptions } from '../lib/api'
import { history } from '../'


function* signupFlow (action) {
	try {
		const { email, username, password, firstName, lastName } = action;
		console.log(email, username);
		const response = yield call(fetchAPI, `http://localhost:3001/register`, makeUserOptions({ email, username, password, firstName, lastName }))
		yield put({ type: SIGNUP_SUCCESS, response });
		history.push('/login')
	} catch(error) {
		yield put({ type: SIGNUP_ERROR, error })
	}
}

function* signupWatcher(){
	yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher