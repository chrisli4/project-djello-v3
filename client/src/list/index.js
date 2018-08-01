import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { listUpdate, listUpdateSubmit, listDelete } from './actions';
import { cardCreate } from '../card/actions';

import { Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row } from 'mdbreact'

import CustomCard from '../card'

class List extends Component {
	
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
		this.props.listUpdate(this.props.list, e.target.name, e.target.value)

	}

	onUpdateSubmit = (e) => {
		e.preventDefault()
		this.props.listUpdateSubmit(this.props.user, this.props.list)
	}

	onDelete = (e) => {
		e.preventDefault()
			this.props.listDelete(this.props.user, this.props.list)
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
			<Card>
				<CardHeader border="primary" color="primary-color">
									<Row>
					<div onDoubleClick={this.onDisableTitle}>
						<input onChange={this.onUpdate} disabled={this.state.disableTitle} name='title' value={this.props.list.title}/>
					</div>
				</Row>
				<Row>
					<div onDoubleClick={this.onDisableDescr}>
						<input onChange={this.onUpdate} disabled={this.state.disableDescr} name='description' value={this.props.list.description}/>
					</div>
				</Row>
				</CardHeader>
				<CardBody>
				<ListGroup>
					{ this.props.list.cards.map(cardId =>
						<CustomCard key={cardId} _id={cardId} />
						)}
				</ListGroup>
				</CardBody>
				<CardFooter>
					<Row>
					<button onClick={this.onUpdateSubmit}>Submit</button>
					<button onClick={this.onDelete}>Delete</button>
					</Row>
				</CardFooter>
			</Card>

			)
	}
}

const mapStateToProps = (state, ownProps) => ({
	list: state.lists.byId[ownProps._id],
	user: state.user
})


const mapDispatchToProps = { 
	cardCreate,
	listUpdate, 
	listUpdateSubmit, 
	listDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(List) 