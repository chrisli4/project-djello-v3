/**
  * @desc deletes object from state.
  * @param state - state object to remove from, obj - object with id that is removed.
  * @return Object - new state with object removed.
*/
export const deleteByObj = function(state, obj) {
	const key = obj._id
	const { [key]: del, ...restOfItems } = state

	return restOfItems
}

/**
  * @desc deletes id from array of ids.
  * @param Array arr - array of id values. String id - string value of ID.
  * @return Array - filtered array of ids.
*/
export const deleteById = function(arr, id) {
	return arr.filter(i => {
		return i !== id
	});
}

/**
  * @desc removes object from state if object.propKey === propValue.
  * @param Object state, String propKey, String propValue.
  * @return Object - new state with objects having propKey === propValue removed.
*/
export const deleteByProp = function(state, propKey, propValue) {
	return Object.keys(state).reduce((acc, id) => {
		if(state[id][propKey] !== propValue)
			acc[id] = state[id]
		return acc
	}, {});
}


/**
  * @desc removes objects from state if property value is in the compared array.
  * @param Object state, String propKey, Array arr
  * @return Object - new state
*/
export const deleteByArr = function(state, propKey, arr) {
	return Object.keys(state).reduce((acc, id) => {
		if(arr.indexOf(state[id][propKey]) === -1)
			acc[id] = state[id]
		return acc
	}, {});
}