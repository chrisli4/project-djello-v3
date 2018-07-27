import React from 'react'
import classNames from 'classnames';
import withDelete from '../hoc/withDelete'
import Button from '../elements/button'

const ButtonDelete = ({ disable, cx, onClick, text, value }) => (
	<Button onClick={onClick}>{text}</Button>
	)

export default withDelete(ButtonDelete); 