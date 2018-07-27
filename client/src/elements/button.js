import React from 'react'
import classNames from 'classnames'

const Button = ({ disable, className, onClick, text, value }) => {
	
	let cx = classNames('btn', className)
	return (
		<button className={cx} disabled={!disable} value={value} onClick={onClick}>{text}</button>
		)
}

export default Button