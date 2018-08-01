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
						<input onChange={this.onUpdate} disabled={this.state.disableTitle} name='title' value={this.props.card.title}/>
					</div>
		</CardHeader>
		<CardBody>
			<div className="d-flex justify-content-between">
						<p className="my-auto"><span>List</span>:{this.props.card.title}</p>
					</div>
					<hr/>
					<div onDoubleClick={this.onDisableDescr}>
						<input onChange={this.onUpdate} disabled={this.state.disableDescr} name='description' value={this.props.card.description}/>
					</div>
		</CardBody>
		<CardFooter>
					<button onClick={this.onUpdateSubmit}>Submit</button>
					<button onClick={this.onDelete}>Delete</button>
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
	cardUpdateSubmit, 
	cardDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomCard)