import { all } from 'redux-saga/effects'

import SignupSaga from './signup/sagas';
import LoginSaga from './login/sagas';
import UserSaga from './user/sagas'
import DashboardSaga from './dashboard/sagas'
import BoardSaga from './board/sagas'
import ListSaga from './list/sagas'
import CardSaga from './card/sagas'
import TeamSaga from './team/sagas'

export default function* IndexSaga() {
	yield all([
		SignupSaga(),
		LoginSaga(),
		UserSaga(),
		DashboardSaga(),
		BoardSaga(),
		ListSaga(),
		CardSaga(),
		TeamSaga(),
	])
}