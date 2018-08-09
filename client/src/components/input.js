import React from 'react'

const Input = ({ name, value, disabled, onChange, onDoubleClick, outerClass, innerClass }) => (
	<div onDoubleClick={onDoubleClick} className={outerClass}>
		<input onChange={onChange} disabled={disabled} name={name} value={value} className={innerClass} />
	</div>
	)

export default Input