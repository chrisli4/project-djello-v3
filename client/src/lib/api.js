import { handleApiErrors } from './api-errors'

export const fetchAPI = function(URL, options) {
	return fetch(URL, options)
		.then(handleApiErrors)
		.then(response => response.json())
		.then(json => json)
		.catch(error => { throw error });
}

export const makeOptions = function(method, user, item) {
	return {
		method: method,
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': user.token
		},
		body: JSON.stringify({
			user,
			item
		})
	}
}