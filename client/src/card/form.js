import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cardCreate } from './actions'
import CustomForm from '../elements/form'
import { Modal } from 'mdbreact'
import Span from '../components/span'

class CardForm extends Component {
	constructor() {
		super()
		this.state = {
			modalOpen: false
		}
	}

	onToggle = (e) => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	onSubmit = (values) => {
		this.props.cardCreate(this.props.user, { userId: this.props.user.username, listId: this.props._id, ...values })
		this.setState({
			modalOpen: false
		})
	}
	render() {

		return (
			<React.Fragment>
				<Span onClick={this.onToggle} text='Add Card' className='p-2 small border border-light rounded-left'/>
				<Modal isOpen={this.state.modalOpen} toggle={this.onToggle} size="lg">
					<CustomForm onSubmit={this.onSubmit} form='card'/>
				</Modal>
			</React.Fragment>
			)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

export default connect(mapStateToProps, { cardCreate })(CardForm)