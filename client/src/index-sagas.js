import SignupSaga from './signup/sagas';
import LoginSaga from './login/sagas';
import DashboardSaga from './dashboard/sagas'
import BoardSaga from './board/sagas'
import ListSaga from './list/sagas'
import CardSaga from './card/sagas'

export default function* IndexSaga() {
	yield [
		SignupSaga(),
		LoginSaga(),
		DashboardSaga(),
		BoardSaga(),
		ListSaga(),
		CardSaga()
	]
}