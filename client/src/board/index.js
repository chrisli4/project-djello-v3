import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'mdbreact'

import { boardUpdate, boardUpdateSubmit, boardDelete } from './actions';

import BoardDropdown from './dropdown'
import BoardForm from './form'
import List from '../list'
import ListForm from '../list/form'
import Input from '../components/input'

class Board extends Component {

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
		this.props.boardUpdate(this.props.board, e.target.name, e.target.value)

	}

	onUpdateSubmit = (e) => {
		e.preventDefault()
		this.props.boardUpdateSubmit(this.props.user, this.props.board)
	}

	onDelete = (e) => {
			this.props.boardDelete(this.props.user, this.props.board)
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
			<Container>
				<Row className='justify-content-end'>
					<BoardDropdown />
					<BoardForm />
				</Row>
				<Input 
					name='title'
					value={this.props.board.title}
					disabled={this.state.disableTitle}
					onDoubleClick={this.onDisableTitle} 
					onChange={this.onUpdate}  
					outerClass='col text-left my-1' 
					innerClass='form-control-plaintext h1-responsive'
				/>
				<Input
					name='description' 
					value={this.props.board.description}
					disabled={this.state.disableDescr}  
					onDoubleClick={this.onDisableDescr} 
					onChange={this.onUpdate} 
					outerClass='col text-left my-1' 
					innerClass='form-control-plaintext lead'
				/>
				<hr />
				<Row>
					{ this.props.board.lists.map(listId =>
						<div key={listId} className="col-3 my-3">
							<List _id={listId} />
						</div>
						)}
				</Row>
				<Row className='my-3 pt-3 justify-content-end'>
					<ListForm />
					<button className='btn btn-primary' onClick={this.onUpdateSubmit}>Save</button>
					<button className='btn btn-danger' onClick={this.onDelete}>Delete Board</button>
				</Row>
			</Container>
			)
	}
}

const mapStateToProps = (state) => ({
	board: state.boards.byId[state.boards.current],
	user: state.user
})


const mapDispatchToProps = { 
	boardUpdate, 
	boardUpdateSubmit, 
	boardDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)