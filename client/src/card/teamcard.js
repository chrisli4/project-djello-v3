import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { cardUpdate, cardUpdateSubmit } from './actions';
import { CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row, Modal } from 'mdbreact'

class TeamCard extends Component {

	constructor() {
		super()
		this.state = {
			disableTitle: true,
			disableDescr: true,
			modalOpen: false,
		}
	}

	onUpdate = (e) => {
		e.preventDefault()
		this.props.cardUpdate(this.props.card, e.target.name, e.target.value)
	}

	onUpdateSubmit = (e) => {
		e.preventDefault()
		this.props.cardUpdateSubmit(this.props.user, this.props.card)
		this.setState({
			modalOpen: false
		})
	}

	onToggle = (e) => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	onDisableTitle = (e) => {
		this.setState({
			disableTitle: !this.state.disableTitle
			})
		}

	onDisableDescr = (e) => {
		this.setState({
			disableDescr: !this.state.disableDescr
			})
		}

	onComplete = (e) => {
		e.preventDefault()
		this.props.cardUpdate(this.props.card, 'completed', !this.props.card.completed)
	}

		render() {

		let comp = classNames('btn btn-sm', {
			'btn-success': this.props.card.completed,
			'btn-danger': !this.props.card.completed
		})
		return (
		<React.Fragment>
		<ListGroupItem hover className="text-center" onClick={this.onToggle}>
			<span className="small">
					{this.props.card.title}
			</span>
		</ListGroupItem>
		<Modal isOpen={this.state.modalOpen} toggle={this.onToggle} size="lg">
	<CardHeader className="p-3" color="primary-color">
					<div onDoubleClick={this.onDisableTitle}>
						<input onChange={this.onUpdate} disabled={this.state.disableTitle} name='title' value={this.props.card.title} className='form-control-plaintext h2-responsive text-center white-text'/>
					</div>
		</CardHeader>
		<CardBody>

			<div className="d-flex justify-content-end">
						<button className={comp} onClick={this.onComplete} name='completed' value={this.props.card.completed}>{this.props.card.completed ? 'completed' : 'incomplete' }</button>
					</div>
					<hr/>
					<label>Description</label>
					<div onDoubleClick={this.onDisableDescr}>
						<input onChange={this.onUpdate} disabled={this.state.disableDescr} name='description' value={this.props.card.description} rows="3" spellCheck="false" className="form-control-plaintext py-3 px-2 mb-3"/>
					</div>
					<hr/>
					<label>Members</label>
						<ListGroup>
						{ this.props.card.members.map(member => 
							<ListGroupItem key={member}>{member}
							</ListGroupItem>
							)}
						</ListGroup>
					<hr/>
					<div>

					</div>
		</CardBody>
		<CardFooter>
		<Row className='justify-content-center'>
					<button className='btn btn-primary' onClick={this.onUpdateSubmit}>Save Changes</button>

					</Row>
		</CardFooter>
		</Modal>
		</React.Fragment>
			)
	}
}

const mapStateToProps = (state, ownProps) => ({
	card: state.cards.byId[ownProps._id],
	user: state.user
})


const mapDispatchToProps = { 
	cardUpdate, 
	cardUpdateSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamCard)