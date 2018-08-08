import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listCreate } from './actions'
import CustomForm from '../elements/form'
import { Modal } from 'mdbreact'

class ListForm extends Component {
  
    	constructor() {
		super()
		this.state = {
			modalOpen: false,
		}
  }

	onToggle = (e) => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

  onSubmit = (values) => {
  	this.props.listCreate(this.props.user, { boardId: this.props.board._id, ...values })
  	this.setState({
  		modalOpen: false
  	})
  }
  render() {
    return (
    		<React.Fragment>
    			<button className='btn-primary' onClick={this.onToggle}>New List</button>
    			<Modal isOpen={this.state.modalOpen} toggle={this.onToggle} size="lg">
    				<CustomForm onSubmit={this.onSubmit} form='list'/>
    			</Modal>
    		</React.Fragment>
    	)
  }
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	board: state.boards.byId[state.boards.current],
})

export default connect(mapStateToProps, { listCreate })(ListForm)