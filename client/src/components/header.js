import React from 'react'
import { Row } from 'mdbreact'

const Header = ({ title, description }) => (
	<div className='col text-left my-1'>
		<Row className='mb-2'>
			<h1 name='title' className='h1-responsive'>{title}</h1>
		</Row>
		<Row className='mb-2'>
			<div name='description' className='lead grey-text'>{description}</div>
		</Row>
	</div>
	)

export default Header;
