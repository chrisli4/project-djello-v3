import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames'

import { cardUpdate, cardUpdateSubmit, cardDelete, cardAddMember, cardDeleteMember } from './actions';

import { CardHeader, CardBody, CardFooter, ListGroupItem, Row, Modal, FormInline } from 'mdbreact'

import Input from '../components/input'
import Textarea from '../components/textarea'
import CustomListGroup from '../components/group'


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

	onComplete = (e) => {
		e.preventDefault()
		this.props.cardUpdate(this.props.card, 'completed', !this.props.card.completed)
	}

	render() {

		let comp = classNames('btn btn-sm', {
			'btn-success': this.props.card.completed,
			'btn-danger': !this.props.card.completed
		})

		let cardMembers = this.props.card.members
		let teamMembers = this.props.team.team

		let toAdd = filterTeam(cardMembers, teamMembers)


		return (
		<React.Fragment>
			<ListGroupItem hover className="text-center" onClick={this.onToggle}>
				<span className="small">
						{this.props.card.title}
				</span>
			</ListGroupItem>
			<Modal isOpen={this.state.modalOpen} toggle={this.onToggle} size="lg">
				<CardHeader className="p-3" color="primary-color">
					<Input 
						name='title'
						value={this.props.card.title}
						disabled={this.state.disableTitle}
						onDoubleClick={this.onDisableTitle} 
						onChange={this.onUpdate}  
						innerClass='form-control-plaintext h2-responsive text-center white-text'
					/>
				</CardHeader>
				<CardBody>
						<div className="d-flex justify-content-between">
							<label>In List: {this.props.listTitle}</label>
							<button className={comp} onClick={this.onComplete} name='completed' value={this.props.card.completed}>{this.props.card.completed ? 'completed' : 'incomplete' }</button>
						</div>
						<hr/>
						<label>Description</label>
						<Textarea 
							name='description' 
							value={this.props.card.description}
							disabled={this.state.disableDescr}
							onDoubleClick={this.onDisableDescr}
							onChange={this.onUpdate}
							innerClass="form-control-plaintext py-3 px-2 mb-3"
						/>
						<hr/>
						<label>Members</label>
							<CustomListGroup
								array={this.props.card.members}
								onClick={this.onDeleteMember}
							/>
						<hr/>
						<div>
							<FormInline>
								<select className="form-control mr-2" onChange={this.onChangeMember} value={this.state.member} >
									<option value=''>Select User</option>
										{ toAdd.map(member => (
											<option key={member} value={member}>{member}</option>
											))}
								</select>
								<button className='btn btn-primary btn-sm' size="sm" onClick={this.onAddMember}>Add User</button>
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
	team: state.team
})


const mapDispatchToProps = { 
	cardUpdate, 
	cardUpdateSubmit, 
	cardDelete,
	cardAddMember,
	cardDeleteMember,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomCard)