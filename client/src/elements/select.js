import React from 'react'

const Select = ({ items, value, onChange, onClick, className }) => {

	let cx = classNames('form-control', className)

	return (
		<select onChange={onChange} value={value} className={cx}>
			{items.map(item => 
				<option key={item} value={item}>{item}</option>
			)}
		</select>
		)
}

export default Select