import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames'
import { cardCreate } from './actions'
import CustomForm from '../elements/form'
import { Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row, Modal } from 'mdbreact'

class CardForm extends React.Component {
    	constructor() {
		super()
		this.state = {
			modalOpen: false,
      hover: false,
		}
  }

	onToggle = (e) => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

  onHover = (e) => {
    this.setState({
      hover: true
    })
  }

  onLeave = (e) => {
    this.setState({
      hover: false
    })
  }

  onSubmit = (values) => {
  	this.props.cardCreate(this.props.user, { listId: this.props._id, ...values })
  	this.setState({
  		modalOpen: false
  	})
  }
  render() {

    let names = classNames('p-2 small border border-light grey lighten-5 rounded-left', {
      'grey lighten-4': this.state.hover,
      'grey lighten-5': !this.state.hover,
    })

    return (
    		<React.Fragment>
    			<span onClick={this.onToggle} onMouseEnter={this.onHover} onMouseLeave={this.onLeave} className={names}>Add Card</span>
    			<Modal isOpen={this.state.modalOpen} toggle={this.onToggle} size="lg">
    				<CustomForm onSubmit={this.onSubmit} form='card'/>
    			</Modal>
    		</React.Fragment>
    	)
  }
}

const mapStateToProps = (state) => ({
	user: state.user
})

export default connect(mapStateToProps, { cardCreate })(CardForm)