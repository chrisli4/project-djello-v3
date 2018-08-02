import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row } from 'mdbreact'

import { dataRequest } from './actions'
import { userSet } from '../user/actions'

import Board from '../board'
import BoardForm from '../board/form'
import BoardDropdown from '../board/dropdown'

class Dashboard extends Component {

	componentDidMount() {
		this.props.dataRequest({ username: 'test1', token: 'test' })
		this.props.userSet({ user: { username: 'test1'}, token: 'test' })
	}

	render() {
		return (
			<Container>
				<Row className='justify-content-end'>
					<BoardDropdown />
					<BoardForm />
				</Row>
				<Board/>
			</Container>
		)
	}

}

const mapDispatchToProps = { 
	dataRequest,
	userSet
}

export default connect(null, mapDispatchToProps)(Dashboard)