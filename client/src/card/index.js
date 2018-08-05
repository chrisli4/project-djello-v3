import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'

import { cardUpdate, cardUpdateSubmit, cardDelete } from './actions';

import { Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row, Modal } from 'mdbreact'

import List from '../list'
import ListForm from '../list/form'

class CustomCard extends Component {

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

	onDelete = (e) => {
			this.props.cardDelete(this.props.user, this.props.card)
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



	render() {
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

			<div className="d-flex justify-content-between">
						<label>In List: {this.props.card.title}</label>
					</div>
					<hr/>
					<label>Description</label>
					<div onDoubleClick={this.onDisableDescr}>
						<input onChange={this.onUpdate} disabled={this.state.disableDescr} name='description' value={this.props.card.description} rows="3" spellCheck="false" className="form-control-plaintext py-3 px-2 mb-3"/>
					</div>
					<hr/>
					<label>Tasks</label>
					<hr/>
					<div>
					<label>Members</label>
						<select>
							{ this.props.team.team.map(member => (
								<option>{ member }</option>
							))}
						</select>
					</div>
		</CardBody>
		<CardFooter>
		<Row className='justify-content-center'>
					<button className='btn btn-primary' onClick={this.onUpdateSubmit}>Save Card</button>
					<button className='btn btn-danger' onClick={this.onDelete}>Delete Card</button>
					</Row>
		</CardFooter>
		</Modal>
		</React.Fragment>
			)
	}
}

const mapStateToProps = (state, ownProps) => ({
	card: state.cards.byId[ownProps._id],
	user: state.user,
	team: state.team
})


const mapDispatchToProps = { 
	cardUpdate, 
	cardUpdateSubmit, 
	cardDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomCard)