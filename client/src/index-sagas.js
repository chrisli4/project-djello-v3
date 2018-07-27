import BoardSaga from './board/sagas';
import ListSaga from './list/sagas';
import CardSaga from './card/sagas';

export default function* IndexSaga() {
	yield [
		BoardSaga(),
		ListSaga(),
		CardSaga()
	]
}