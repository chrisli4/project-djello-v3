import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardCreate } from './actions'
import CustomForm from '../elements/form'

class BoardForm extends React.Component {
  submit = values => {
  	this.props.boardCreate(this.props.user, { userId: this.props.user.username, ...values })
  }
  render() {
    return <CustomForm onSubmit={this.submit} form='board'/>
  }
}

const mapStateToProps = (state) => ({
	user: state.user,
	board: state.boards.byId[state.boards.current]
})

export default connect(mapStateToProps, { boardCreate })(BoardForm)