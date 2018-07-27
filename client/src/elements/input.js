import React from 'react'
import classNames from 'classnames';

const Input = ({ disable, className, onChange, name, value }) => {
	
	let cx = classNames('form-control-plaintext', className)
	return (
		<input className={cx} disabled={!disable} name={name} value={value} onChange={onChange} />
		)
}

export default Input