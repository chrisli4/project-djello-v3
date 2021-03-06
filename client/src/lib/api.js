import { handleApiErrors } from './api-errors'

export const fetchAPI = function(URL, options) {
	return fetch(URL, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch(error => { throw error });
}

const removeJWT = (token) => {
	return token.slice(4)
}

export const makeOptions = function(method, user, item) {	
	
	let options = {
		method: method,
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${removeJWT(user.token)}`
		}
	}

	if(item)
		options.body = JSON.stringify({
			user,
			...item
		})

	return options
}

export const makeUserOptions = function(user) {	
	return {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...user })
	}
}