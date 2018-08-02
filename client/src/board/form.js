import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardCreate } from './actions'
import CustomForm from '../elements/form'
import { Button, Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row, Modal } from 'mdbreact'

class BoardForm extends Component {
  
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
  		this.props.boardCreate(this.props.user, { userId: this.props.user.username, ...values })
      this.setState({
        modalOpen: false,
      })
  	}

  render() {
    return (
    		<React.Fragment>
    			<Button onClick={this.onToggle}>New Board</Button>
    			<Modal isOpen={this.state.modalOpen} toggle={this.onToggle} size="lg">
    				<CustomForm onSubmit={this.onSubmit} form='board'/>
    			</Modal>
    		</React.Fragment>
    	)
  }
}

const mapStateToProps = (state) => ({
	user: state.user,
	board: state.boards.byId[state.boards.current]
})

export default connect(mapStateToProps, { boardCreate })(BoardForm)