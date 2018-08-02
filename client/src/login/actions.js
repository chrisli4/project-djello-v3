import { LOGIN_REQUESTING } from './constants';

const loginRequest = function loginRequest({ email, password }) {

	return {
		type: LOGIN_REQUESTING,
		email,
		password
	}
}

export default loginRequest;