import React from 'react'

const Texarea = ({ name, value, disabled, onChange, onDoubleClick, outerClass, innerClass }) => (
	<div onDoubleClick={onDoubleClick} className={outerClass}>
		<textarea onChange={onChange} disabled={disabled} name={name} value={value} className={innerClass} rows="3" spellCheck="false" />
	</div>
	)

export default Texarea