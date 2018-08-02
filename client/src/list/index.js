import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { listUpdate, listUpdateSubmit, listDelete } from './actions';
import { cardCreate } from '../card/actions';

import { Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row } from 'mdbreact'

import CustomCard from '../card'
import CardForm from '../card/form'

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
					<div onDoubleClick={this.onDisableTitle} className='mx-auto'>
						<input onChange={this.onUpdate} disabled={this.state.disableTitle} name='title' value={this.props.list.title} className='form-control-plaintext text-center white-text'/>
					</div>
				</Row>
				</CardHeader>
				<CardBody>
								
					<div onDoubleClick={this.onDisableDescr} className='mx-auto'>
						<textarea onChange={this.onUpdate} disabled={this.state.disableDescr} name='description' value={this.props.list.description} rows="3" spellCheck="false" className="form-control-plaintext small py-3 px-2 mb-3"/>
					</div>
				
				<ListGroup>
					{ this.props.list.cards.map(cardId =>
						<CustomCard key={cardId} _id={cardId} />
						)}
				</ListGroup>
				</CardBody>
				<CardFooter>
					<Row className='justify-content-center'>
						<CardForm _id={this.props.list._id} />
						<span onClick={this.onUpdateSubmit} className='p-2 small border border-light grey lighten-5'>Save List</span>
						<span onClick={this.onDelete} className='p-2 small border border-light grey lighten-5 rounded-right'>Delete List</span>
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