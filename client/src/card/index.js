import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import io from "socket.io-client";

import { cardUpdate, cardUpdateSubmit, cardDelete, cardAddMember, cardDeleteMember, cardReceiveUpdate } from './actions';

import { Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row, Modal, FormInline } from 'mdbreact'

import List from '../list'
import ListForm from '../list/form'

class CustomCard extends Component {

	constructor() {
		super()
		this.state = {
			disableTitle: true,
			disableDescr: true,
			modalOpen: false,
			member: '', 
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

	onSelectMember = (e) => {
		this.setState({
			member: e.target.value
		})
	}

	onChangeMember = (e) => {
		console.log(e.target.value)
		this.setState({
			member: e.target.value
		})
	}

	onAddMember = (e) => {
		e.preventDefault()
		this.props.cardAddMember(this.props.card, this.state.member)
		this.setState({
			member: ''
		})
	}

	onDeleteMember = (member) => {
		this.props.cardDeleteMember(this.props.card, member)
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
					<label>Members</label>
						<ListGroup>
						{ this.props.card.members.map(member => 
							<ListGroupItem key={member}>{member}
								<button type="button" className="close" aria-label="Close" onClick={() => this.onDeleteMember(member)}>
									<span aria-hidden="true">&times;</span>
								</button>
							</ListGroupItem>
							)}
						</ListGroup>
					<hr/>
					<div>
		<FormInline>
			<select className="form-control" onChange={this.onChangeMember} value={this.state.member} >
				<option value=''>Select User</option>
				{ this.props.toAddMembers.map(member => (
					<option key={member} value={member}>{member}</option>
				))}
			</select>
			<button className='btn btn-default' size="sm" onClick={this.onAddMember}>Add User</button>
		</FormInline>
					</div>
		</CardBody>
		<CardFooter>
		<Row className='justify-content-center'>
					<button className='btn btn-primary' onClick={this.onUpdateSubmit}>Save Changes</button>
					<button className='btn btn-danger' onClick={this.onDelete}>Delete Card</button>
					</Row>
		</CardFooter>
		</Modal>
		</React.Fragment>
			)
	}
}

function filterTeam(cardMembers, teamMembers) {
	return teamMembers.filter(teamMember =>
		cardMembers.indexOf(teamMember) === -1
		)
}

const mapStateToProps = (state, ownProps) => ({
	card: state.cards.byId[ownProps._id],
	user: state.user,
	team: state.team,
	toAddMembers: filterTeam(state.cards.byId[ownProps._id].members, state.team.team)
})


const mapDispatchToProps = { 
	cardUpdate, 
	cardUpdateSubmit, 
	cardDelete,
	cardAddMember,
	cardDeleteMember,
	cardReceiveUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomCard)