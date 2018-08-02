import { SIGNUP_REQUESTING } from './constants';

const signupRequest = function signupRequest({ email, username, password, firstName, lastName }) {
	return {
		type: SIGNUP_REQUESTING,
		email,
		username,
		password,
		firstName,
		lastName
	}
}

export default signupRequest