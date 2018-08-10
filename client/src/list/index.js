import React, { Component } from 'react';
import { connect } from 'react-redux';

import { listUpdate, listUpdateSubmit, listDelete } from './actions';
import { cardCreate } from '../card/actions';

import { Card, CardHeader, CardBody, CardFooter, ListGroup, Row } from 'mdbreact'

import CustomCard from '../card'
import CardForm from '../card/form'
import Input from '../components/input'
import Textarea from '../components/textarea'
import Span from '../components/span'

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
					<Input 
						name='title'
						value={this.props.list.title}
						disabled={this.state.disableTitle}
						onDoubleClick={this.onDisableTitle} 
						onChange={this.onUpdate}  
						outerClass='mx-auto' 
						innerClass='form-control-plaintext text-center white-text'
					/>
				</CardHeader>
				<CardBody>
					<Textarea
						name='description' 
						value={this.props.list.description}
						disabled={this.state.disableDescr}  
						onDoubleClick={this.onDisableDescr} 
						onChange={this.onUpdate} 
						innerClass='form-control-plaintext small py-3 px-2 mb-3'
					/>
					<ListGroup>
						{ this.props.list.cards.map(cardId => 
							<CustomCard key={cardId} _id={cardId} listTitle={this.props.list.title}/>
							)}
					</ListGroup>
				</CardBody>
				<CardFooter>
					<Row className='justify-content-center'>
						<CardForm _id={this.props.list._id} />
						<Span onClick={this.onUpdateSubmit} text='Save List' className='p-2 small border border-light'/>
						<Span onClick={this.onDelete} text='Delete List' className='p-2 small border border-light rounded-right'/>
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